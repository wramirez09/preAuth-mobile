import { Center } from '@/components/ui/center'
import { Text, Heading, Button, ButtonText, View, Image } from '@gluestack-ui/themed'

import { HStack } from '@/components/ui/hstack'
import { useNavigation } from '@react-navigation/native'
import SafeContainer from '@/components/SafeContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import logoImage from '../../assets/images/ndLogo.png'

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  return (
    <SafeContainer className="flex-1 items-center">
      <Center className="h-full">
        {/* Content */}
        <View className="py-12 justify-between">
          <View className="items-center space-y-8">
            {/* Logo */}
            <View className="w-20 h-20 mb-6">
              <Image
                source={logoImage}
                className="w-full h-full object-contain"
                alt="NoteDoctor Logo"
              />
            </View>

            {/* Welcome Text */}
            <View className="items-center space-y-3 mb-9">
              <Heading className="text-3xl tracking-tight text-gray-900 text-center">
                Welcome to NoteDoctor.Ai
              </Heading>
              <Text className="text-base text-gray-500 text-center max-w-xs leading-relaxed">
                Sign in to continue your secure experience
              </Text>
            </View>

            {/* Primary Actions */}
            <View className="w-full max-w-sm space-y-1 pt-4">
              <Button
                className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm active:opacity-90 mb-6"
                onPress={() => navigation.navigate('Login')}
              >
                <ButtonText className="text-white text-base font-medium">Sign In</ButtonText>
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

            {/* Divider */}
            {/* <View className="w-full max-w-sm flex-row items-center space-x-4 py-2 mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-sm text-gray-400">or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View> */}

            {/* Social Buttons */}
            {/* <View className="w-full flex-row gap-3">
            <Button className="flex-1 h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center shadow-sm">
              <ButtonText className="text-gray-900 text-base font-medium">Google</ButtonText>
            </Button>
            <Button className="flex-1 h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center shadow-sm" />
            <Button className="flex-1 h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center shadow-sm" />
          </View> */}
          </View>

          {/* Trust Footer */}
          <View className="items-center pt-8 pb-4">
            <Text className="text-xs text-gray-400 text-center leading-relaxed">
              Secure • Encrypted • Trusted by Thousands
            </Text>
          </View>
        </View>
      </Center>
    </SafeContainer>
  )
}
