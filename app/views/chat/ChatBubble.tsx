import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Bubble, BubbleProps, IMessage, TimeProps } from 'react-native-gifted-chat'
import Markdown, { MarkdownProps } from 'react-native-markdown-display'

type Props = BubbleProps<IMessage>

export function ChatTime(props: TimeProps<IMessage>) {
  const isUser = props.position === 'right'

  if (!props.currentMessage?.createdAt) return null

  return (
    <View
      style={{
        marginTop: 4,
        marginBottom: 0,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          color: '#9CA3AF',
        }}
      >
        {new Date(props.currentMessage.createdAt).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })}
      </Text>
    </View>
  )
}

const markdownStyles: MarkdownProps['style'] = {
  body: {},
  heading1: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 6,
    lineHeight: 24,
    color: '#111827',
  },
  heading2: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 22,
    color: '#111827',
  },
  heading3: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 8,
    marginBottom: 4,
    lineHeight: 20,
    color: '#111827',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
    marginBottom: 6,
    color: '#374151',
  },
  bullet_list: {
    marginVertical: 4,
    paddingLeft: 0,
    marginLeft: 0,
    color: '#374151',
  },
  list_item: {
    marginBottom: 4,
    lineHeight: 20,
  },
  strong: {
    fontWeight: '700',
  },
}
export function ChatBubble(props: Props) {
  const isUser = props.position === 'right'

  return (
    <View style={{ marginVertical: 4, alignSelf: 'stretch' }}>
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 15,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            width: '100%',
            maxWidth: 300,
            marginBottom: 4, // Add some space before the time
          },
          right: {
            backgroundColor: '#2563EB',
            borderRadius: 16,
            padding: 12,
            marginBottom: 4, // Add some space before the time
          },
        }}
        textStyle={{
          left: {
            color: '#111827',
            fontSize: 15,
            lineHeight: 22,
          },
          right: {
            color: '#FFFFFF',
            fontSize: 15,
            lineHeight: 22,
          },
        }}
        renderMessageText={(messageProps) => {
          const content = messageProps.currentMessage?.text ?? ''

          if (isUser) {
            return (
              <Text style={{ color: '#FFFFFF' }} className="leading-7">
                {content}
              </Text>
            )
          }

          return <Markdown style={markdownStyles}>{content}</Markdown>
        }}
        renderTime={(timeProps) => (
          <View
            style={{
              alignSelf: 'flex-start',
              marginLeft: isUser ? 0 : 10,
              marginRight: isUser ? 10 : 0,
            }}
          >
            <ChatTime {...timeProps} position={isUser ? 'right' : 'left'} />
          </View>
        )}
      />
    </View>
  )
}
