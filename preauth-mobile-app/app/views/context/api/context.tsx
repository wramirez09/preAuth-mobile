import * as React from "react";
import { createContext } from "react";
import { IMessage } from "react-native-gifted-chat";

export type ApiContextType = {
    onSend: (newMessages: IMessage[] | undefined, accessToken: string) => Promise<void>
    messages: IMessage[],
    isLoading: boolean
};

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
    const context = React.useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
