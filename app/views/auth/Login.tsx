import LinearGradientCore from '@/components/LinearGradientCore'
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
  const [forgotPasswordLoading, setForgotPasswordLoading] =
    React.useState(false)
  const [forgotPasswordError, setForgotPasswordError] = React.useState<
    string | null
  >(null)
  const [forgotPasswordSuccess, setForgotPasswordSuccess] =
    React.useState(false)
  const { signIn, user, loading, resetPassword } = useAuth()

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

  const handleForgotPassword = React.useCallback(async () => {
    navigation.navigate('ResetPassword')
  }, [email, resetPassword])

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
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <SafeContainer>
        <Center className="w-full h-full px-2">
          <View className="w-full">
            <View
              style={{
                marginBottom: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 60, height: 60, marginBottom: 24 }}>
                <Image
                  source={logoImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                  alt="noteDoctor ai"
                />
              </View>
              <Heading size="2xl" className="text-center">
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
                  placeholder="email@domain.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={value => setEmail(value.toLowerCase())}
                />
              </Input>

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
                  onChangeText={value => setPassword(value)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  <View className="flex flex-col gap-2">
                    <Text
                      className="text-blue-600 text-sm font-bold"
                      onPress={handleForgotPassword}
                    >
                      {forgotPasswordLoading
                        ? 'Sending reset link...'
                        : 'Forgot password?'}
                    </Text>
                    {forgotPasswordSuccess && (
                      <Text className="text-green-600 text-xs">
                        Password reset link sent! Check your email.
                      </Text>
                    )}
                    {forgotPasswordError && (
                      <Text className="text-red-600 text-xs">
                        {forgotPasswordError}
                      </Text>
                    )}
                  </View>
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon />
                <FormControlErrorText>
                  Password is required
                </FormControlErrorText>
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
            <View className="flex flex-row items-center justify-center">
              <Text className="text-center test-blue-600">
                Don't have an account?{' '}
              </Text>
              <Button
                onPress={() => navigation.navigate('SignUp')}
                variant="link"
              >
                <ButtonText>sign up</ButtonText>
              </Button>
            </View>
            <Text className="text-center text-gray-500 text-sm my-6">
              Secure • Encrypted • Trusted by Thousands
            </Text>
          </View>
        </Center>
      </SafeContainer>
    </LinearGradientCore>
  )
}

export default Login
