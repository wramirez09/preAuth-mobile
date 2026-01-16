// Update your navigationRef.ts file
import { createNavigationContainerRef } from '@react-navigation/native'
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  SignUp: undefined
  Chat: undefined
  Pick: undefined
  PreAuthForm: undefined
  Guide: undefined
  // Add other screens here as needed
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function refNavigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params)
  } else {
    console.warn('Navigation container is not ready')
  }
}
