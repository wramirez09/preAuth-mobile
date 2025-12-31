import React from 'react';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { StatusBar, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { useNavigation } from '@react-navigation/native';
import SafeContainer from '@/components/SafeContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ButtonText } from '@/components/ui/button';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeContainer>
      <StatusBar animated={true} backgroundColor="#FFF" hidden={false} />
      <Center>
        <Heading>Welcome to NoteDoctor.ai</Heading>

        <HStack space="md" reversed={false}>
          <Button
            variant="link"
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
        <Text>HIPAA Compliant • Secure • Trusted by Healthcare Professionals</Text>
      </Center>
    </SafeContainer>
  );
}
