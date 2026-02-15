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
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import logoImage from '../../assets/images/ndLogo.png'

const UpdatePasswordForm: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()
  const email = (route.params as any)?.email

  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is missing from link — please retry the signup process.')
      return
    }

    if (!password) {
      setError('Password is required.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/stripe/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok)
        throw new Error(data.error || 'Failed to set up password.')

      // API already signed user in; just follow redirect
      navigation.navigate(data.redirect || 'Pick')
    } catch (err: any) {
      console.error('Setup password error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <SafeContainer>
        <Center className="h-full">
          <Text className="text-center">Setting up your password...</Text>
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
                Set Your Password
              </Heading>
              <Text size="sm" className="text-center">
                Complete your account setup to access your dashboard.
              </Text>
            </View>

            {error && (
              <View className="mb-4">
                <Text className="text-sm text-center text-red-600">
                  {error}
                </Text>
              </View>
            )}

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
                isDisabled={true}
              >
                <InputField value={email || ''} type="text" editable={false} />
              </Input>
            </FormControl>

            <FormControl className="mb-10" isInvalid={!!error && !email}>
              <FormControlLabel>
                <FormControlLabelText marginLeft={4} size="sm">
                  New Password
                </FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center"
              >
                <InputField
                  placeholder="Create a secure password"
                  type="password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  onChangeText={value => setPassword(value)}
                  onSubmitEditing={handleSubmit}
                />
              </Input>
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
                onPress={handleSubmit}
                className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm mb-6"
                isDisabled={loading || !password}
              >
                <ButtonText className="text-white font-semibold">
                  {loading ? 'Saving...' : 'Finish Setup'}
                </ButtonText>
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
            <Text className="text-center text-gray-500 text-sm my-6">
              Secure • Encrypted • Trusted by Thousands
            </Text>
          </View>
        </Center>
      </SafeContainer>
    </LinearGradientCore>
  )
}

export default UpdatePasswordForm
