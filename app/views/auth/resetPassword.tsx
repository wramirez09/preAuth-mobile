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

const ResetPassword: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [email, setEmail] = React.useState('')
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState('')
  const { resetPassword, loading } = useAuth()

  const handleResetPassword = React.useCallback(async () => {
    try {
      setError('')
      await resetPassword(email)
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email')
      console.error('Reset password failed:', err)
    }
  }, [email, resetPassword])

  if (loading) {
    return (
      <SafeContainer>
        <Center className="h-full">
          <Text className="text-center">Sending reset email...</Text>
        </Center>
      </SafeContainer>
    )
  }

  if (isSuccess) {
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
                  Check your email
                </Heading>
                <Text size="md" className="text-center">
                  We've sent a password reset link to your email address.
                </Text>
              </View>

              <Button
                size="md"
                onPress={() => navigation.navigate('Login')}
                className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm mb-6"
              >
                <ButtonText>Back to Login</ButtonText>
              </Button>
            </View>
          </Center>
        </SafeContainer>
      </LinearGradientCore>
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
                Reset Your Password
              </Heading>
              <Text size="md" className="text-center">
                Type in your email and we'll send you a link to reset your
                password
              </Text>
            </View>

            <FormControl className="mb-5" isInvalid={!!error}>
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
                  placeholder="m@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  returnKeyType="send"
                  enablesReturnKeyAutomatically
                  onChangeText={value => setEmail(value.toLowerCase())}
                  onSubmitEditing={handleResetPassword}
                />
              </Input>

              {error && (
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>{error}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl>
              <Button
                size="md"
                onPress={handleResetPassword}
                className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm mb-6"
                isDisabled={!email || loading}
              >
                <ButtonText>Send reset email</ButtonText>
              </Button>
            </FormControl>

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600 text-sm">
                Already have an account?{' '}
              </Text>
              <Text
                className="text-blue-600 text-sm font-semibold"
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </View>
          </View>
        </Center>
      </SafeContainer>
    </LinearGradientCore>
  )
}

export default ResetPassword
