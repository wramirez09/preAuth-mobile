import { createApiUrl } from '@/app/utils'
import { fetchThreadMessages } from '@/services/chatMessages'
import { randomUUID } from 'expo-crypto'
import React from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { ApiContext } from './context'

const REQUEST_TIMEOUT_MS = 90_000

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
  const [hasShownWelcome, setHasShownWelcome] = React.useState(false)
  const [threadId, setThreadId] = React.useState<string>(() => randomUUID())
  const abortControllerRef = React.useRef<AbortController | null>(null)
  const pendingResumeRef = React.useRef<{
    threadId: string
    abortedAt: number
  } | null>(null)

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
    const timer = setTimeout(() => {
      if (!hasShownWelcome && messages.length === 0) {
        addWelcomeMessage()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [messages.length, hasShownWelcome, addWelcomeMessage])

  // Cleanup effect to abort requests on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const refetchThread = React.useCallback(async (tid: string) => {
    try {
      const fetched = await fetchThreadMessages(tid)
      if (fetched.length === 0) {
        // Server didn't persist anything (request died before write).
        // Leave optimistic state as-is; just drop the typing indicator.
        return
      }
      setMessages(fetched)
    } catch (e) {
      console.error('refetchThread failed:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // AppState lifecycle: abort on background, refetch on foreground.
  React.useEffect(() => {
    const handleChange = (state: AppStateStatus) => {
      if (state === 'background' || state === 'inactive') {
        if (abortControllerRef.current) {
          pendingResumeRef.current = {
            threadId,
            abortedAt: Date.now(),
          }
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }
      } else if (state === 'active') {
        const pending = pendingResumeRef.current
        if (pending) {
          pendingResumeRef.current = null
          // Keep typing indicator on while we refetch.
          setIsLoading(true)
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

      const userMessage = newMessages[0]

      const controller = new AbortController()
      abortControllerRef.current = controller

      const timeoutId = setTimeout(() => {
        controller.abort()
      }, REQUEST_TIMEOUT_MS)

      // Optimistically add user message
      setMessages(prev => GiftedChat.append(prev, newMessages))
      setIsLoading(true)

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
      } catch (e) {
        if (e instanceof Error) {
          if (e.name === 'AbortError') {
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
    setIsLoading(false)
    setMessages([])
    setHasShownWelcome(false)
    setThreadId(randomUUID())
  }, [])

  return (
    <ApiContext.Provider
      value={{ onSend, clearMessages, messages, isLoading, threadId }}
    >
      {children}
    </ApiContext.Provider>
  )
}
