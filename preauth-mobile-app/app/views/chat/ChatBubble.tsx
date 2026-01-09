import { ThemedText } from '@/components/themed-text';
import { Box, Text } from '@gluestack-ui/themed';

type Props = {
    role: 'user' | 'assistant';
    content: string;
};

export function ChatBubble({ role, content }: Props) {
    const isUser = role === 'user';

    return (
        <Box
            alignSelf={isUser ? 'flex-end' : 'flex-start'}
            width={300}
            maxWidth="100%"
            my="$1"
            px="$1"
            py="$2"
            borderRadius="$lg"
            backgroundColor={
                isUser ? '$primary600' : '$backgroundLight500'
            }
        >
            {isUser ? (
                <Text color="$white">{content}</Text>
            ) : (
                <ThemedText>
                    {content}
                </ThemedText>
            )}
        </Box>
    );
}
