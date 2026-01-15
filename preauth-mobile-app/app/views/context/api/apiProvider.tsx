import React from "react";
import { IMessage, GiftedChat } from "react-native-gifted-chat";

import { createApiUrl } from "@/app/utils";
import { ApiContext } from './context'


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


export const ApiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const apiUrl = React.useMemo(
        () => createApiUrl('api/chat/agents'),
        []
    );
    const onSend = React.useCallback(
        async (newMessages: IMessage[] = [], accessToken?: string) => {

            if (!newMessages.length || isLoading) return;

            const userMessage = newMessages[0];

            // ✅ Optimistic append
            setMessages((prev) =>
                GiftedChat.append(prev, newMessages)
            );
            setIsLoading(true);
            if (accessToken)
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
        [apiUrl, messages, isLoading]
    );

    return <ApiContext.Provider value={{ onSend, messages, isLoading }}>{children}</ApiContext.Provider>
}