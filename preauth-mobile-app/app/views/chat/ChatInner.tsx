
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Actions, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, AddIcon } from '@/components/ui/icon';
import QueryActionSheet from './QueryActionSheet';
import { Box } from '@/components/ui/box';
import { useApi } from '../context/Api/context'
import { Input } from '@/components/ui/input';
import { useRoute, RouteProp } from '@react-navigation/native'

type RootStackParamList = {
  Chat: { initialMessage?: string }
  // Add other screen params as needed
}

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>

type Props = {
  accessToken: string;
};

export default function ChatInner({ accessToken }: Props) {
  const route = useRoute<ChatScreenRouteProp>()
  const insets = useSafeAreaInsets();
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const { onSend, messages, isLoading } = useApi()
  const [hasSentInitialMessage, setHasSentInitialMessage] = React.useState(false)

  // Check for initial message from route params and send it if it exists
  React.useEffect(() => {
    const initialMessage = route.params?.initialMessage
    if (initialMessage && !hasSentInitialMessage && messages.length === 0) {
      const initialMessageObj = {
        _id: Math.random().toString(36).substring(7),
        text: initialMessage,
        createdAt: new Date(),
        user: {
          _id: 1, // User's ID
          name: 'User',
        },
      }
      handleSendMessage([initialMessageObj])
      setHasSentInitialMessage(true)
    }
  }, [route.params?.initialMessage, messages.length, hasSentInitialMessage])

  const keyboardVerticalOffset =
    insets.bottom +
    (Platform.OS === 'ios' ? 90 : 0);

  const handleSendMessage = async (messages: IMessage[]) => {
    if (accessToken)
      await onSend(messages, accessToken);
  }

  const CustomActions = (props: any) => (
    <Actions
      className="flex align-center justify-center"
      {...props}

      icon={() => (
        <Box className='items-center justify-center'>
          <Icon as={AddIcon} size="md" />
        </Box>
      )}
      onPressActionButton={() => {
        setShowActionsheet(true)

      }}
    />
  );

  return (
    <>
      <View style={{ flex: 1, marginBottom: 30, margin: 20 }}>
        <GiftedChat
          messages={messages}
          onSend={handleSendMessage}
          user={{ _id: 1 }}
          isTyping={isLoading}
          keyboardAvoidingViewProps={{
            keyboardVerticalOffset,
          }}
          isSendButtonAlwaysVisible
          isScrollToBottomEnabled
          isInverted={false}
          isAvatarOnTop
          renderAvatar={null}
          isUserAvatarVisible={false}
          renderActions={(props) => <CustomActions {...props} />}


        />
        <QueryActionSheet showActionsheet={showActionsheet} handleClose={() => setShowActionsheet(false)} />
      </View >
    </>
  );
}
