import * as React from 'react'
import { Platform, View, TouchableOpacity, Keyboard } from 'react-native'
import { GiftedChat, IMessage, InputToolbar, Composer, Send } from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute, RouteProp } from '@react-navigation/native'
import { Plus, Send as SendIcon } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'

import QueryActionSheet from './QueryActionSheet'
import { useApi } from '../context/Api/context'

type RootStackParamList = {
  Chat: { initialMessage?: string }
}

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>

type Props = {
  accessToken: string
}

const PRIMARY_BLUE = '#3B82F6' // calm blue
const DISABLED_BLUE = '#BFDBFE' // disabled send
const INPUT_BG = '#EFF6FF' // light blue background
const ICON_GRAY = '#60A5FA' // subtle icon

export default function ChatInner({ accessToken }: Props) {
  const route = useRoute<ChatScreenRouteProp>()
  const insets = useSafeAreaInsets()
  const { onSend, messages, isLoading } = useApi()

  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const [composerText, setComposerText] = React.useState('')

  const keyboardVerticalOffset = insets.bottom + (Platform.OS === 'ios' ? 80 : 0)

  const canSend = composerText.trim().length > 0

  const handleSendMessage = async (msgs: IMessage[]) => {
    if (!accessToken || !canSend) return

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    Keyboard.dismiss()
    setComposerText('')
    await onSend(msgs, accessToken)
  }

  /* ───────── ChatGPT-Style Input ───────── */

  const CustomInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        paddingHorizontal: 16,
        paddingBottom: 10,
      }}
    />
  )

  const CustomComposer = (props: any) => (
    <Composer
      {...props}
      text={composerText}
      onTextChanged={setComposerText}
      textInputStyle={{
        flex: 1,
        backgroundColor: INPUT_BG,
        borderRadius: 22,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        color: '#111827',
      }}
      placeholder="Your message"
      placeholderTextColor={PRIMARY_BLUE}
    />
  )

  const CustomActions = () => (
    <TouchableOpacity
      onPress={() => setShowActionsheet(true)}
      activeOpacity={0.7}
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 6,
      }}
    >
      <Plus size={16} color={PRIMARY_BLUE} />
    </TouchableOpacity>
  )

  const CustomSend = (props: any) => (
    <Send {...props} disabled={!canSend}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginLeft: 6,
        }}
      >
        <SendIcon size={16} color={canSend ? PRIMARY_BLUE : DISABLED_BLUE} />
      </View>
    </Send>
  )

  return (
    <>
      <View style={{ flex: 1, margin: 16 }}>
        <GiftedChat
          messages={messages}
          onSend={handleSendMessage}
          user={{ _id: 1 }}
          isTyping={isLoading}
          keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
          isInverted={false}
          renderAvatar={null}
          isUserAvatarVisible={false}
          renderInputToolbar={CustomInputToolbar}
          renderComposer={CustomComposer}
          renderActions={CustomActions}
          renderSend={CustomSend}
        />

        <QueryActionSheet
          showActionsheet={showActionsheet}
          handleClose={() => setShowActionsheet(false)}
        />
      </View>
    </>
  )
}
