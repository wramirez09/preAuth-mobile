import '../global.css'
import {
  createStaticNavigation,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import Home from './views/home'
import SignUp from './views/auth/SignUp'
import Login from './views/auth/Login'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useAuth } from './views/auth/context'
import Chat from './views/chat'
import React from 'react'
import { config } from '@gluestack-ui/config'
import { StyledProvider } from '@gluestack-style/react'
import Pick from './views/Pick'
import QueryForm from './views/queryForm'
import { GuideStack } from './views/guide'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Menu } from 'lucide-react-native'
import { Button, ButtonText } from '@gluestack-ui/themed'
import { AuthProvider } from './views/auth/authProvider'
import { useDrawer } from './views/context/Drawer/context'
import DrawerProvider from './views/context/Drawer/drawerProvider'
import DrawerCore from '@/components/Drawer'
import { GuideProvider } from './views/context/Guide/guideProvider'
import FormDataProvider from './views/context/FormData/formDataProvider'
import { navigationRef } from './utils/navigationRef'

// Custom header component with hamburger button
function HeaderRight() {
  const { user } = useAuth()
  const { isDrawerOpen, setIsDrawerOpen } = useDrawer()
  // if (!user) return null
  return (
    <Button variant="link" onPress={() => setIsDrawerOpen(!isDrawerOpen)} ml="$2">
      <Menu />
    </Button>
  )
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',

  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Welcome',
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerRight: () => <HeaderRight />,
      },
    },
    SignUp: {
      screen: SignUp,
      options: {
        title: 'Sign up',
      },
    },
    Login: {
      screen: Login,
      options: {
        title: 'Login',
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerLeft: () => (
          <Button size="xs" variant="link" onPress={() => navigationRef.current?.navigate('Home')}>
            <ButtonText>Back</ButtonText>
          </Button>
        ),
      },
    },
    Chat: {
      screen: Chat,
      options: {
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerRight: () => <HeaderRight />,
      },
    },
    Pick: {
      screen: Pick,
      options: {
        Title: 'Guide',
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerRight: () => <HeaderRight />,
      },
    },
    PreAuthForm: {
      screen: QueryForm,
      options: {
        headerRight: () => <HeaderRight />,
      },
    },
    Guide: {
      screen: GuideStack,
      options: {
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerRight: () => <HeaderRight />,
      },
    },
  },
})

const DrawerComponent = () => {
  const { isDrawerOpen } = useDrawer()
  return <DrawerCore isOpen={isDrawerOpen} />
}

const Navigation = createStaticNavigation(RootStack)
export default function App() {
  return (
    <SafeAreaProvider>
      <StyledProvider config={config}>
        <GluestackUIProvider mode="light">
          <AuthProvider>
            <DrawerProvider>
              <GuideProvider>
                <FormDataProvider>
                  <Navigation
                    ref={navigationRef as React.Ref<NavigationContainerRef<ParamListBase>>}
                  />
                </FormDataProvider>
                <DrawerComponent />
              </GuideProvider>
            </DrawerProvider>
          </AuthProvider>
        </GluestackUIProvider>
      </StyledProvider>
    </SafeAreaProvider>
  )
}
