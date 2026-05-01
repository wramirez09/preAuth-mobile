import { IMessage } from 'react-native-gifted-chat'
import supabase from '@/app/lib/supabase'

type ChatMessageRow = {
  id: string
  thread_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export function rowToIMessage(row: ChatMessageRow): IMessage {
  return {
    _id: row.id,
    text: row.content,
    createdAt: new Date(row.created_at),
    user:
      row.role === 'assistant'
        ? { _id: 2, name: 'Assistant' }
        : { _id: 1 },
  }
}

// GiftedChat with isInverted={true} expects newest-first.
// Query oldest-first for clarity, then reverse before returning.
export async function fetchThreadMessages(
  threadId: string
): Promise<IMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('id, thread_id, role, content, created_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`fetchThreadMessages failed: ${error.message}`)
  }

  const rows = (data ?? []) as ChatMessageRow[]
  return rows.map(rowToIMessage).reverse()
}
