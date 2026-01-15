import SafeContainer from '@/components/SafeContainer';
import { Text } from 'react-native';
import { useAuth } from '@/app/views/auth/context';
import ChatInner from './ChatInner';
import { ApiProvider } from '../context/Api/apiProvider'


export const Chat: React.FC = () => {
  const { session } = useAuth();

  if (!session?.access_token) {
    return (
      <SafeContainer>
        <Text>Session expired. Please log in again.</Text>
      </SafeContainer>
    );
  }

  // ✅ ChatInner is ONLY mounted when authenticated
  return <ApiProvider><ChatInner accessToken={session.access_token} /></ApiProvider>;
}


export default Chat