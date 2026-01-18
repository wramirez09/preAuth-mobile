import * as React from 'react'
import { Platform, View, Text } from 'react-native'
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
import QueryActionSheet from './QueryActionSheet'
import { Box } from '@/components/ui/box'
import { useApi } from '../context/Api/context'
import { CirclePlus, SendIcon } from 'lucide-react-native'

type Props = {
  accessToken: string
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
  const [hasProcessedInitialMessage, setHasProcessedInitialMessage] = React.useState(false)

  // Handle initial message when component mounts
  React.useEffect(() => {
    if (initialMessage && !hasProcessedInitialMessage && messages.length === 0) {
      onSend(
        [
          {
            _id: Math.random().toString(),
            text: initialMessage.message,
            createdAt: new Date(),
            user: { _id: 1 }, // Set as user message (assuming 1 is the user ID)
          },
        ],
        accessToken
      )
      setHasProcessedInitialMessage(true)
    }
  }, [initialMessage, hasProcessedInitialMessage, messages.length, onSend, accessToken])

  const keyboardVerticalOffset = insets.bottom + (Platform.OS === 'ios' ? 90 : 0)

  const handleSendMessage = async (messages: IMessage[]) => {
    if (accessToken) await onSend(messages, accessToken)
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
    <>
      <View style={{ flex: 1, marginBottom: 30, margin: 20 }}>
        <GiftedChat
          messages={messages}
          renderSend={CustomSend}
          renderComposer={RenderComposer}
          renderInputToolbar={RenderInputToolbar}
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
        <QueryActionSheet
          showActionsheet={showActionsheet}
          handleClose={() => setShowActionsheet(false)}
        />
      </View>
    </>
  )
}
