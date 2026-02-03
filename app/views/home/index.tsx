import LinearGradientCore from '@/components/LinearGradientCore'
import SafeContainer from '@/components/SafeContainer'
import { Center } from '@/components/ui/center'
import {
  Button,
  ButtonText,
  Heading,
  Image,
  Text,
  View,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import logoImage from '../../assets/images/ndLogo.png'

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <SafeContainer className="flex-1 items-center">
        <Center className="h-full">
          <View className="py-12 justify-between">
            <View className="items-center space-y-8">
              <View className="w-20 h-20 mb-6">
                <Image
                  source={logoImage}
                  className="w-full h-full object-contain"
                  alt="NoteDoctor Logo"
                />
              </View>

              <View className="items-center space-y-3 mb-9">
                <Heading className="text-3xl tracking-tight text-gray-900 text-center">
                  Welcome to NoteDoctor.Ai
                </Heading>
                <Text className="text-base text-gray-500 text-center max-w-xs leading-relaxed">
                  Sign in to continue your secure experience
                </Text>
              </View>

              <View className="w-full max-w-sm space-y-1 pt-4">
                <Button
                  className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm active:opacity-90 mb-6"
                  onPress={() => navigation.navigate('Login')}
                >
                  <ButtonText className="text-white text-base font-medium">
                    Sign In
                  </ButtonText>
                </Button>

                <Button
                  className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center mb-6"
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <ButtonText className="text-gray-900 text-base font-medium">
                    Create Account
                  </ButtonText>
                </Button>
              </View>
            </View>

            <View className="items-center pt-8 pb-4">
              <Text className="text-xs text-gray-400 text-center leading-relaxed">
                Secure • Encrypted • Trusted by Thousands
              </Text>
            </View>
          </View>
        </Center>
      </SafeContainer>
    </LinearGradientCore>
  )
}
