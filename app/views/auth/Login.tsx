import * as React from 'react'
import SafeContainer from '@/components/SafeContainer'
import { VStack } from '@/components/ui/vstack'
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  Heading,
  Button,
  ButtonText,
  Center,
  Image,
} from '@gluestack-ui/themed'
import { useAuth } from './context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View } from 'react-native'
import logoImage from '../../assets/images/ndLogo.png'

const Login: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { signIn, user, loading } = useAuth()

  const userSignIn = React.useCallback(async () => {
    try {
      const { session } = await signIn(email, password)

      if (!session?.access_token) {
        throw new Error('No session after login')
      }

      navigation.navigate('Pick')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }, [email, password])

  if (loading) {
    return (
      <SafeContainer>
        <Center className="h-full">
          <Text className="text-center">Authenticating...</Text>
        </Center>
      </SafeContainer>
    )
  }

  return (
    <SafeContainer>
      <Center className="w-full h-full px-2">
        <VStack className="w-full">
          <View className="mb-6 justify-center items-center">
            <View className="w-20 h-20 mb-6">
              <Image
                source={logoImage}
                className="w-full h-full object-contain"
                alt="noteDoctor ai"
              />
            </View>
            <Heading size="3xl" className="text-center">
              Welcome back
            </Heading>
            <Text size="sm" className="text-center">
              Sign in to your account to continue
            </Text>
          </View>

          <FormControl className="mb-5">
            <FormControlLabel>
              <FormControlLabelText className="block text-sm mb-1">Email</FormControlLabelText>
            </FormControlLabel>
            <Input
              variant="outline"
              size="lg"
              className="shadow-md w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <InputField
                placeholder="Enter email"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                returnKeyType="next"
                enablesReturnKeyAutomatically
                onChangeText={(value) => setEmail(value)}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText className="text-xs text-gray-400 mt-1.5">
                Enter your email address
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>Email is required</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl className="mb-10">
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="lg" className="shadow-md">
              <InputField
                placeholder="secret password"
                type="password"
                autoComplete="password"
                keyboardType="default"
                returnKeyType="next"
                enablesReturnKeyAutomatically
                onChangeText={(value) => setPassword(value)}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>Enter your password</FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>Password is required</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl>
            <Button
              size="md"
              onPress={() => userSignIn()}
              className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm  mb-6"
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </FormControl>
          <Text className="text-center text-gray-500 text-sm my-6">
            Secure • Encrypted • Trusted by Thousands
          </Text>
        </VStack>
      </Center>
    </SafeContainer>
  )
}

export default Login
