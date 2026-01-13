import { createNavigationContainerRef } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const navigationRef = createNavigationContainerRef<NativeStackNavigationProp<any>>()

export function refNavigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
