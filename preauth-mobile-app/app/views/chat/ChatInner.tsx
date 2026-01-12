
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Actions, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, AddIcon } from '@/components/ui/icon';
import QueryActionSheet from './QueryActionSheet';
import { Box } from '@/components/ui/box';
import { useApi } from '../context/api/context';
import { Input } from '@/components/ui/input';

type Props = {
  accessToken: string;
};

export default function ChatInner({ accessToken }: Props) {

  const insets = useSafeAreaInsets();
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const { onSend, messages, isLoading } = useApi()

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
