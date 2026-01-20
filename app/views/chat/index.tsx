import SafeContainer from '@/components/SafeContainer';
import { Text } from 'react-native';
import { useAuth } from '@/app/views/auth/context';
import ChatInner from './ChatInner';
import { ApiProvider } from '../context/Api/apiProvider'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/app/utils/navigationRef'

export const Chat: React.FC = () => {
  const { session } = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>()
  const { initialMessage } = route.params || {}

  if (!session?.access_token) {
    return (
      <SafeContainer>
        <Text>Session expired. Please log in again.</Text>
      </SafeContainer>
    );
  }

  return (
    <ApiProvider>
      <ChatInner accessToken={session.access_token} initialMessage={initialMessage} />
    </ApiProvider>
  )
}

export default Chat