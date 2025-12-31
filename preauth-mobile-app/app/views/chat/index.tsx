import SafeContainer from '@/components/SafeContainer';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { View, TextInput, ScrollView, Text } from 'react-native';
import * as React from 'react';

import { ThemedText } from '@/components/themed-text';
import { createApiUrl } from '@/app/utils';
import { useAuth } from '@/app/views/auth/context';
function Chat() {
  const { session } = useAuth();
  const [input, setInput] = React.useState('');
  console.log('api', createApiUrl('api/chat/agents'));
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: createApiUrl('api/chat/agents'),
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    }),
    onError: (error) => console.error(error, 'ERROR'),
    onFinish: (message) => console.log('Chat finished:', message),
  });

  if (error) return <Text>{error.message}</Text>;
  return (
    <SafeContainer>
      <View
        style={{
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map(
            (m) => (
              console.log('message', m),
              (
                <View key={m.id} style={{ marginVertical: 8 }}>
                  <View>
                    <ThemedText className="font-bold" style={{ fontWeight: 700 }}>
                      {m.role}
                    </ThemedText>
                    {m.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return <ThemedText key={`${m.id}-${i}`}>{part.text}</ThemedText>;
                      }
                    })}
                  </View>
                </View>
              )
            )
          )}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ backgroundColor: 'white', padding: 8 }}
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.nativeEvent.text)}
            onSubmitEditing={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput('');
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeContainer>
  );
}

export default Chat;
