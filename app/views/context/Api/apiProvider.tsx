import React from 'react'
import { IMessage, GiftedChat } from 'react-native-gifted-chat'
import { createApiUrl } from '@/app/utils'
import { ApiContext } from './context'

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function normalizeAssistantMessages(raw: any[]): IMessage[] {
  return raw
    .filter((m) => m.role === 'assistant')
    .map((m) => ({
      _id: m.id ?? generateUniqueId(),
      text: String(m.content),
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
      user: {
        _id: 2,
        name: 'Assistant',
      },
    }))
}

export const ApiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = React.useState<IMessage[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const apiUrl = React.useMemo(
    () => createApiUrl('api/chat/agents'),
    []
  )

  const onSend = React.useCallback(
    async (newMessages: IMessage[] = [], accessToken?: string) => {
      if (!newMessages.length || isLoading || !accessToken) return

      const userMessage = newMessages[0]

      // 1️⃣ Optimistically add user message
      setMessages((prev) => GiftedChat.append(prev, newMessages))
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
            messages: [
              { role: 'user', content: userMessage.text },
            ],
          }),
        })

        const data = await res.json()

        // 3️⃣ Append ONLY assistant messages
        const messages = normalizeAssistantMessages(data.messages)
        setMessages((prev) => GiftedChat.append(prev, messages))
      } catch (e) {
        console.error('Chat error', e)
      } finally {
        setIsLoading(false)
      }
    },
    [apiUrl, messages, isLoading]
  )

  return (
    <ApiContext.Provider value={{ onSend, messages, isLoading }}>
      {children}
    </ApiContext.Provider>
  )
}
