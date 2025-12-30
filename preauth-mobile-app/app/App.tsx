import '@/global.css'; 
import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/home';

import SignUp from './views/auth/SignUp';
import Login from './views/auth/Login';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: Home,
        SignUp: SignUp,
        Login: Login,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <>
        <GluestackUIProvider>
            <Navigation />
        </GluestackUIProvider></>;
}

