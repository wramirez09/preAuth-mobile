import { createApiUrl } from '@/app/utils'
import supabase from '@/app/lib/supabase'
import { fetchThreadMessages } from '@/services/chatMessages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { randomUUID } from 'expo-crypto'
import React from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { ApiContext } from './context'

const REQUEST_TIMEOUT_MS = 90_000
const PENDING_RESUME_KEY = '@chat/pendingResume'
const PENDING_RESUME_TTL_MS = 10 * 60 * 1000

type PendingResume = {
  threadId: string
  abortedAt: number
  userMessageText?: string
}

async function writePendingResume(value: PendingResume) {
  try {
    await AsyncStorage.setItem(PENDING_RESUME_KEY, JSON.stringify(value))
  } catch (e) {
    console.warn('[chat-debug] writePendingResume failed', e)
  }
}

async function readPendingResume(): Promise<PendingResume | null> {
  try {
    const raw = await AsyncStorage.getItem(PENDING_RESUME_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PendingResume
    if (Date.now() - parsed.abortedAt > PENDING_RESUME_TTL_MS) {
      await AsyncStorage.removeItem(PENDING_RESUME_KEY)
      return null
    }
    return parsed
  } catch (e) {
    console.warn('[chat-debug] readPendingResume failed', e)
    return null
  }
}

async function clearPendingResume() {
  try {
    await AsyncStorage.removeItem(PENDING_RESUME_KEY)
  } catch (e) {
    console.warn('[chat-debug] clearPendingResume failed', e)
  }
}

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function normalizeAssistantMessages(raw: any[]): IMessage[] {
  if (!Array.isArray(raw)) {
    console.warn('normalizeAssistantMessages: raw is not an array', raw)
    return []
  }

  return raw
    .filter(m => m && typeof m === 'object' && m.role === 'assistant')
    .map(m => ({
      _id: m.id ?? generateUniqueId(),
      text: String(m.content || ''),
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    }))
}

export const ApiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [messages, setMessages] = React.useState<IMessage[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isResuming, setIsResuming] = React.useState(false)
  const [hasShownWelcome, setHasShownWelcome] = React.useState(false)
  const [hasHydrated, setHasHydrated] = React.useState(false)
  const [threadId, setThreadId] = React.useState<string>(() => randomUUID())
  const abortControllerRef = React.useRef<AbortController | null>(null)
  const pendingResumeRef = React.useRef<PendingResume | null>(null)
  const lastSentTextRef = React.useRef<string | null>(null)
  const resumePollRef = React.useRef<{
    cancelled: boolean
  } | null>(null)
  const refetchThreadRef = React.useRef<(tid: string) => Promise<void>>(
    async () => {}
  )

  const apiUrl = React.useMemo(() => createApiUrl('/api/chat/agents'), [])

  const addWelcomeMessage = React.useCallback(() => {
    const welcomeMessage: IMessage = {
      _id: 'welcome-message',
      text: "Hello! I'm here to help you with your pre-authorization request. I can assist you with checking coverage, submitting requests, and answering questions about the pre-authorization process. How can I help you today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    }
    setMessages([welcomeMessage])
    setHasShownWelcome(true)
  }, [])

  React.useEffect(() => {
    if (!hasHydrated) return
    const timer = setTimeout(() => {
      if (!hasShownWelcome && messages.length === 0) {
        addWelcomeMessage()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [messages.length, hasShownWelcome, addWelcomeMessage, hasHydrated])

  // Cleanup effect to abort requests on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (resumePollRef.current) {
        resumePollRef.current.cancelled = true
      }
    }
  }, [])

  // Log threadId on mount and whenever it changes — to detect remount-driven regen.
  React.useEffect(() => {
    console.log('[chat-debug] ApiProvider threadId set', { threadId })
  }, [threadId])

  // On mount, hydrate any pending resume from a prior JS lifetime.
  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      const pending = await readPendingResume()
      console.log('[chat-debug] hydrate pendingResume', { pending })
      if (cancelled) return
      if (pending) {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (cancelled) return
        if (!session) {
          console.log(
            '[chat-debug] hydrate: no auth session, dropping pendingResume'
          )
          await clearPendingResume()
          setHasHydrated(true)
          return
        }
        pendingResumeRef.current = pending
        setThreadId(pending.threadId)
        if (pending.userMessageText) {
          const userMsg: IMessage = {
            _id: `resume-user-${pending.abortedAt}`,
            text: pending.userMessageText,
            createdAt: new Date(pending.abortedAt),
            user: { _id: 1 },
          }
          setMessages([userMsg])
          setHasShownWelcome(true)
        }
        setIsLoading(true)
        setIsResuming(true)
        void refetchThreadRef.current?.(pending.threadId)
      }
      setHasHydrated(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const refetchThread = React.useCallback(async (tid: string) => {
    console.log('[chat-debug] refetchThread starting', { tid })
    if (resumePollRef.current) {
      resumePollRef.current.cancelled = true
    }
    const pollState = { cancelled: false }
    resumePollRef.current = pollState

    // BE can take ~60s+ to persist the assistant reply. Poll until we see an
    // assistant message land, or give up after the timeout.
    const POLL_INTERVAL_MS = 3_000
    const POLL_TIMEOUT_MS = 120_000
    const startedAt = Date.now()

    try {
      while (!pollState.cancelled) {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session) {
          console.log('[chat-debug] refetchThread aborted: no auth session')
          await clearPendingResume()
          return
        }

        const fetched = await fetchThreadMessages(tid)
        console.log('[chat-debug] refetchThread poll', {
          tid,
          count: fetched.length,
          elapsedMs: Date.now() - startedAt,
        })

        const hasAssistant = fetched.some(
          m => typeof m.user?._id !== 'undefined' && m.user._id === 2
        )

        if (hasAssistant) {
          setMessages(fetched)
          await clearPendingResume()
          return
        }

        if (Date.now() - startedAt >= POLL_TIMEOUT_MS) {
          console.log('[chat-debug] refetchThread poll timeout', { tid })
          await clearPendingResume()
          return
        }

        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS))
      }
    } catch (e) {
      console.error('[chat-debug] refetchThread failed', e)
    } finally {
      if (resumePollRef.current === pollState) {
        resumePollRef.current = null
        setIsLoading(false)
        setIsResuming(false)
      }
    }
  }, [])

  React.useEffect(() => {
    refetchThreadRef.current = refetchThread
  }, [refetchThread])

  // AppState lifecycle: abort on background, refetch on foreground.
  React.useEffect(() => {
    const handleChange = (state: AppStateStatus) => {
      console.log('[chat-debug] AppState change', {
        next: state,
        hasInflight: !!abortControllerRef.current,
        pendingResume: pendingResumeRef.current,
        threadId,
      })
      if (state === 'background' || state === 'inactive') {
        if (abortControllerRef.current) {
          console.log('[chat-debug] AppState background: aborting in-flight', {
            threadId,
          })
          const pending: PendingResume = {
            threadId,
            abortedAt: Date.now(),
            userMessageText: lastSentTextRef.current ?? undefined,
          }
          pendingResumeRef.current = pending
          void writePendingResume(pending)
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }
      } else if (state === 'active') {
        const pending = pendingResumeRef.current
        if (pending) {
          console.log('[chat-debug] AppState active: triggering refetch', {
            pendingThreadId: pending.threadId,
            currentThreadId: threadId,
          })
          pendingResumeRef.current = null
          // Keep typing indicator on while we refetch and surface a banner.
          setIsLoading(true)
          setIsResuming(true)
          void refetchThread(pending.threadId)
        }
      }
    }

    const sub = AppState.addEventListener('change', handleChange)
    return () => sub.remove()
  }, [threadId, refetchThread])

  const onSend = React.useCallback(
    async (newMessages: IMessage[] = [], accessToken?: string) => {
      if (
        !newMessages.length ||
        !accessToken ||
        abortControllerRef.current !== null
      )
        return

      console.log('[chat-debug] onSend entry', {
        threadId,
        messageCount: newMessages.length,
      })

      const userMessage = newMessages[0]

      const controller = new AbortController()
      abortControllerRef.current = controller

      const timeoutId = setTimeout(() => {
        controller.abort()
      }, REQUEST_TIMEOUT_MS)

      // Optimistically add user message
      setMessages(prev => GiftedChat.append(prev, newMessages))
      lastSentTextRef.current = userMessage.text
      setIsLoading(true)

      // Persist a resume marker eagerly. If iOS suspends/kills JS while
      // backgrounded, the AppState handler may not get a chance to flush
      // AsyncStorage. Writing now ensures recovery on next launch.
      void writePendingResume({
        threadId,
        abortedAt: Date.now(),
        userMessageText: userMessage.text,
      })

      try {
        if (!accessToken || typeof accessToken !== 'string') {
          throw new Error('Invalid access token')
        }

        if (
          !userMessage.text ||
          typeof userMessage.text !== 'string' ||
          !userMessage.text.trim()
        ) {
          throw new Error('Invalid message content')
        }

        const fullUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`

        console.log('[chat-debug] onSend fetch starting', { threadId, fullUrl })

        const res = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'x-client': 'mobile',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage.text.trim() }],
            threadId,
          }),
          signal: controller.signal,
        })

        if (!res.ok) {
          const errorMessage =
            res.status === 500
              ? 'Server error occurred'
              : res.status === 401
                ? 'Authentication failed'
                : res.status === 429
                  ? 'Too many requests'
                  : `API request failed with status ${res.status}`
          throw new Error(errorMessage)
        }

        const data = await res.json()
        const assistantMessages = normalizeAssistantMessages(data.messages)
        setMessages(prev => GiftedChat.append(prev, assistantMessages))
        await clearPendingResume()
      } catch (e) {
        if (e instanceof Error) {
          if (e.name === 'AbortError') {
            console.log('[chat-debug] onSend AbortError', {
              threadId,
              pendingResume: pendingResumeRef.current,
            })
            // Either AppState background, hard timeout, or unmount.
            // AppState path will handle refetch via pendingResumeRef.
            return
          }

          if (e.message.includes('Network request failed')) {
            console.error(
              'Network error: Please check your internet connection'
            )
          } else if (e.message.includes('timeout')) {
            console.error(
              'Request timeout: The server took too long to respond'
            )
          } else {
            console.error('Chat error:', e.message)
          }
        } else {
          console.error('Unknown chat error:', e)
        }
      } finally {
        clearTimeout(timeoutId)
        console.log('[chat-debug] onSend finally', {
          threadId,
          stillActive: abortControllerRef.current === controller,
          pendingResume: pendingResumeRef.current,
        })
        // Only release loading + controller if this request is still the
        // active one. Otherwise a later send already replaced us.
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null
          // If we were aborted by AppState, the foreground handler will
          // turn isLoading off after refetch — don't clear here.
          if (!pendingResumeRef.current) {
            setIsLoading(false)
          }
        }
      }
    },
    [apiUrl, threadId]
  )

  const clearMessages = React.useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    pendingResumeRef.current = null
    lastSentTextRef.current = null
    void clearPendingResume()
    if (resumePollRef.current) {
      resumePollRef.current.cancelled = true
      resumePollRef.current = null
    }
    setIsLoading(false)
    setIsResuming(false)
    setMessages([])
    setHasShownWelcome(false)
    setThreadId(randomUUID())
  }, [])

  return (
    <ApiContext.Provider
      value={{ onSend, clearMessages, messages, isLoading, isResuming, threadId }}
    >
      {children}
    </ApiContext.Provider>
  )
}
