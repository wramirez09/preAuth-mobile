import '../global.css';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/home';

import SignUp from './views/auth/SignUp';
import Login from './views/auth/Login';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from './views/auth/authProvider';
import Chat from './views/chat';
import React from 'react';
import { config } from '@gluestack-ui/config';
import { StyledProvider } from '@gluestack-style/react';
import Pick from './views/Pick';
import QueryForm from './views/queryForm';
import { GuideStack } from './views/guide';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    SignUp: SignUp,
    Login: Login,
    Chat: Chat,
    Pick: Pick,
    PreAuthForm: QueryForm,
    Guide: {
      screen: GuideStack,
      options: {
        headerShown: false
      }
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <StyledProvider config={config}>
      <GluestackUIProvider mode="light">
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </GluestackUIProvider>
    </StyledProvider>

  );
}
