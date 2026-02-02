import { Box } from '@/components/ui/box'
import { View } from '@gluestack-ui/themed'
import { CirclePlus, SendIcon } from 'lucide-react-native'
import * as React from 'react'
import { Platform } from 'react-native'
import {
  Actions,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useApi } from '../context/Api/context'
import { ChatBubble, ChatTime } from './ChatBubble'
import QueryActionSheet from './QueryActionSheet'

type Props = {
  accessToken?: string
  initialMessage?: {
    message: string
  }
}

const RenderInputToolbar = (props: InputToolbarProps<IMessage>) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 20,
        borderWidth: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      primaryStyle={{
        alignItems: 'center',
        backgroundColor: '#2B5DE4',
        height: 45,
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
      }}
    />
  )
}

const RenderComposer = (props: ComposerProps) => {
  return (
    <Composer
      {...props}
      textInputProps={{
        ...props.textInputProps, // Preserve any existing textInputProps
        style: {
          color: '#FFF',
          borderWidth: 0,
          marginLeft: 0,
        },
        placeholderTextColor: 'white',
      }}
    />
  )
}

const CustomSend = (props: any) => {
  const canSend = Boolean(props.text?.trim())

  return (
    <Send
      {...props}
      tes
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2147B0',
        }}
      >
        <SendIcon size={16} color="white" />
      </View>
    </Send>
  )
}
export default function ChatInner({ accessToken, initialMessage }: Props) {
  const insets = useSafeAreaInsets()
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const { onSend, messages, isLoading } = useApi()

  React.useEffect(() => {
    if (initialMessage) {
      onSend(
        [
          {
            _id: Math.random().toString(),
            text: initialMessage.message,
            createdAt: new Date(),
            user: { _id: 1 },
          },
        ],
        accessToken
      )
    }
  }, [initialMessage])

  const keyboardVerticalOffset =
    insets.bottom + (Platform.OS === 'ios' ? 90 : 0)

  const handleSendMessage = async (messages: IMessage[] = []) => {
    if (!messages.length || !messages[0]?.text?.trim()) {
      console.log('No message to send')
      return
    }
    if (!accessToken) {
      console.error('No access token available')
      return
    }

    try {
      await onSend(messages, accessToken)
      console.log('Message sent successfully')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const CustomActions = (props: any) => (
    <Actions
      className="flex align-center justify-center"
      {...props}
      icon={() => (
        <Box className="items-center justify-center">
          <CirclePlus size={15} color="white" />
        </Box>
      )}
      onPressActionButton={() => {
        setShowActionsheet(true)
      }}
    />
  )

  return (
    <View style={{ flex: 1, marginBottom: 30, margin: 20 }}>
      <GiftedChat
        messages={messages}
        renderSend={CustomSend}
        renderComposer={RenderComposer}
        renderInputToolbar={RenderInputToolbar}
        renderTime={props => <ChatTime {...props} />}
        renderBubble={props => <ChatBubble {...props} />}
        onSend={handleSendMessage}
        user={{ _id: 1 }}
        isTyping={isLoading}
        keyboardAvoidingViewProps={{
          keyboardVerticalOffset,
          enabled: true,
        }}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
          enablesReturnKeyAutomatically: true,
          returnKeyType: 'send',
          onSubmitEditing: ({
            nativeEvent: { text },
          }: {
            nativeEvent: { text: string }
          }) => {
            if (text.trim().length > 0) {
              handleSendMessage([
                {
                  _id: Math.random().toString(),
                  text: text.trim(),
                  createdAt: new Date(),
                  user: { _id: 1 },
                },
              ])
            }
          },
        }}
        isSendButtonAlwaysVisible
        isScrollToBottomEnabled
        isInverted={true}
        isAvatarOnTop
        renderAvatar={null}
        isUserAvatarVisible={true}
        renderActions={props => <CustomActions {...props} />}
        minInputToolbarHeight={50}
      />
      <QueryActionSheet
        showActionsheet={showActionsheet}
        handleClose={() => setShowActionsheet(false)}
      />
    </View>
  )
}
