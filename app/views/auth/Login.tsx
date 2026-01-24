import SafeContainer from '@/components/SafeContainer'
import {
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  View,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import logoImage from '../../assets/images/ndLogo.png'
import { useAuth } from './context'

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
        <View className="w-full">
          <View style={{ marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 80, height: 80, marginBottom: 24 }}>
              <Image
                source={logoImage}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
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
              <FormControlLabelText marginLeft={6} size="sm">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center"
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
              <FormControlHelperText className="text-xs text-gray-400">
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
              <FormControlLabelText marginLeft={4} size="sm">
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center"
            >
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
              <FormControlHelperText className="text-xs text-gray-400">
                Enter your password
              </FormControlHelperText>
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
        </View>
      </Center>
    </SafeContainer>
  )
}

export default Login
