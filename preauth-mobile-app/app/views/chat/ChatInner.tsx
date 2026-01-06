import SafeContainer from '@/components/SafeContainer';
import { useChat } from 'ai/react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import * as React from 'react';

import { ThemedText } from '@/components/themed-text';
import { createApiUrl } from '@/app/utils';

type Props = {
  accessToken: string;
};

export default function ChatInner({ accessToken }: Props) {
  const [input, setInput] = React.useState('');
  const [authError, setAuthError] = React.useState<string | null>(null);

  const apiUrl = React.useMemo(
    () => createApiUrl('api/chat/agents'),
    []
  );

  const { messages, error, append } = useChat({
    api: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    onError: (err) => {
      console.error('Chat error:', err);

      if (
        err?.message?.includes('401') ||
        err?.message?.includes('Unauthorized') ||
        err?.message?.includes('Invalid token')
      ) {
        setAuthError('Your session has expired. Please log in again.');
      }
    },
  });

  console.log('messages', messages);

  if (authError) {
    return (
      <SafeContainer>
        <Text>{authError}</Text>
      </SafeContainer>
    );
  }

  if (error) {
    return (
      <SafeContainer>
        <Text>{error.message}</Text>
      </SafeContainer>
    );
  }

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
          {messages.map((m) => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <ThemedText style={{ fontWeight: '700' }}>
                {m.role}
              </ThemedText>

              <ThemedText>
                {m.content}
              </ThemedText>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ backgroundColor: 'white', padding: 8 }}
            placeholder="Say something..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => {
              if (!input.trim()) return;

              append({ role: 'user', content: input });
              setInput('');
            }}
            autoFocus
          />
        </View>
      </View>
    </SafeContainer>
  );
}
