import SafeContainer from '@/components/SafeContainer';
import { Text } from 'react-native';
import { useAuth } from '@/app/views/auth/context';
import ChatInner from './ChatInner';


export default function Chat() {
  const { session } = useAuth();

  if (!session?.access_token) {
    return (
      <SafeContainer>
        <Text>Session expired. Please log in again.</Text>
      </SafeContainer>
    );
  }

  // ✅ ChatInner is ONLY mounted when authenticated
  return <ChatInner accessToken={session.access_token} />;
}
