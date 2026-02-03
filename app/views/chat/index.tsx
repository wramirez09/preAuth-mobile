import { RootStackParamList } from '@/app/utils/navigationRef'
import { useAuth } from '@/app/views/auth/context'
import LinearGradientCore from '@/components/LinearGradientCore'
import SafeContainer from '@/components/SafeContainer'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Text } from 'react-native'
import ChatInner from './ChatInner'

export const Chat: React.FC = () => {
  const { session } = useAuth()
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>()
  const { initialMessage } = route.params || {}

  if (!session?.access_token) {
    return (
      <SafeContainer>
        <Text>Session expired. Please log in again.</Text>
      </SafeContainer>
    )
  }

  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <ChatInner
        accessToken={session.access_token}
        initialMessage={initialMessage}
      />
    </LinearGradientCore>
  )
}

export default Chat
