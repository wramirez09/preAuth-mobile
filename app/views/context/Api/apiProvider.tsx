import { createApiUrl } from '@/app/utils'
import React from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { ApiContext } from './context'

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
  const abortControllerRef = React.useRef<AbortController | null>(null)

  const apiUrl = React.useMemo(() => createApiUrl('api/chat/agents'), [])

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
    // Only show welcome message if there are truly no messages
    // This check runs after any initial messages would be added
    const timer = setTimeout(() => {
      if (!hasShownWelcome && messages.length === 0) {
        addWelcomeMessage()
      }
    }, 100) // Small delay to allow initial messages to be processed

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

  const onSend = React.useCallback(
    async (newMessages: IMessage[] = [], accessToken?: string) => {
      if (!newMessages.length || isLoading || !accessToken) return

      const userMessage = newMessages[0]

      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController()

      // 1️⃣ Optimistically add user message
      setMessages(prev => GiftedChat.append(prev, newMessages))
      setIsLoading(true)

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'x-client': 'mobile',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage.text }],
          }),
          signal: abortControllerRef.current.signal,
        })

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`)
        }

        const data = await res.json()
        console.log({ res })
        // 3️⃣ Append ONLY assistant messages
        const messages = normalizeAssistantMessages(data.messages)
        setMessages(prev => GiftedChat.append(prev, messages))
      } catch (e) {
        // Don't log error for aborted requests
        if (e instanceof Error && e.name !== 'AbortError') {
          console.error('Chat error', e)
        }
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [apiUrl, messages, isLoading]
  )

  const clearMessages = React.useCallback(() => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    // Reset loading state
    setIsLoading(false)

    // Clear messages
    setMessages([])
    setHasShownWelcome(false)
  }, [])

  return (
    <ApiContext.Provider value={{ onSend, clearMessages, messages, isLoading }}>
      {children}
    </ApiContext.Provider>
  )
}
