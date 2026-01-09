import React from 'react';
import { Center } from '@/components/ui/center';
import { Text, Heading, Button, ButtonText } from '@gluestack-ui/themed';
import { StatusBar, View } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { useNavigation } from '@react-navigation/native';
import SafeContainer from '@/components/SafeContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeContainer>
      <View className="flex-col items-center h-full justify-center">
        <StatusBar animated={true} backgroundColor="#FFF" hidden={false} />
        <Center>
          <Heading size="xl" className="mb-5">
            Welcome to NoteDoctor.ai
          </Heading>

          <HStack space="md" reversed={false} className="mb-5">
            <Button
              variant="solid"
              size="md"
              action="primary"
              onPress={() => navigation.navigate('SignUp')}
            >
              <ButtonText>Sign Up</ButtonText>
            </Button>
            <Button
              variant="solid"
              size="md"
              action="secondary"
              onPress={() => navigation.navigate('Login')}
            >
              <ButtonText>Sign In</ButtonText>
            </Button>
          </HStack>
          <Text size="xs" className='text-center'>HIPAA Compliant • Secure • Trusted by Healthcare Professionals</Text>
        </Center>
      </View>
    </SafeContainer>
  );
}
