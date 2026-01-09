
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Actions, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createApiUrl } from '@/app/utils';
import {
  Button, ButtonText, Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  Text,
} from '@gluestack-ui/themed';
import { Icon, EditIcon } from '@/components/ui/icon';
import QueryActionSheet from './QueryActionSheet';
type Props = {
  accessToken: string;
};

function normalizeServerMessagesToGifted(
  raw: any[]
): IMessage[] {
  return raw.map((m, index) => ({
    _id: m.id ?? `${index}-${m}`,
    text: String(m.content),
    createdAt: new Date(),
    user: {
      _id: index % 2 === 0 ? 1 : 2, // 1=user, 2=assistant
      name: index % 2 === 0 ? 'You' : 'Assistant',
    },
  }));
}

export default function ChatInner({ accessToken }: Props) {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const insets = useSafeAreaInsets();
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const apiUrl = React.useMemo(
    () => createApiUrl('api/chat/agents'),
    []
  );

  const keyboardVerticalOffset =
    insets.bottom +
    (Platform.OS === 'ios' ? 90 : 0);

  const onSend = React.useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!newMessages.length || isLoading) return;

      const userMessage = newMessages[0];

      // ✅ Optimistic append
      setMessages((prev) =>
        GiftedChat.append(prev, newMessages)
      );
      setIsLoading(true);

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
              ...messages.map((m) => ({
                role: m.user._id === 1 ? 'user' : 'assistant',
                content: m.text,
              })),
              {
                role: 'user',
                content: userMessage.text,
              },
            ],
          }),
        });

        const data = await res.json();

        console.log({ data: data.messages });
        const normalized =
          normalizeServerMessagesToGifted(
            data.messages
          );

        // 🔥 Replace entire conversation
        setMessages(normalized);
      } catch (e) {
        console.error('Chat error', e);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, accessToken, messages, isLoading]
  );


  const CustomActions = (props: any) => (
    <Actions
      {...props}
      icon={() => (
        <Icon as={EditIcon} size="md" />
      )}
      onPressActionButton={() => {
        setShowActionsheet(true)
        console.log('should show action sheet!', showActionsheet);

      }}
    />
  );

  return (
    <>
      <View style={{ flex: 1, marginBottom: 30, margin: 20 }}>

        <GiftedChat
          messages={messages}
          onSend={onSend}

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
