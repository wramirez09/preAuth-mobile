import "@/global.css";
import React from 'react';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { StatusBar } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';


import { useNavigation } from '@react-navigation/native';

import SafeContainer from "@/components/SafeContainer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavProps = NativeStackNavigationProp<{ name: any }>

export default function Home() {
    const navigation = useNavigation<HomeScreenNavProps>();
    return (

        <SafeContainer>
            <StatusBar
                animated={true}
                backgroundColor="#FFF"
                hidden={false}
            />
            <Center className="w-full h-full">
                <Heading className="text-typography-1 font-bold mb-5" size='xl'>Welcome to NoteDoctor.ai</Heading>

                <HStack space="md" reversed={false} className='mb-5'>
                    <Button variant="link" size="md" action="primary" onPress={() => navigation.navigate({ name: 'SignUp' })}>
                        <ButtonText>Sign Up</ButtonText>
                    </Button>
                    <Button variant="solid" size="md" action="secondary" onPress={() => navigation.navigate({ name: 'Login' })}>
                        <ButtonText>Sign In</ButtonText>
                    </Button>
                </HStack>
                <Text className='text-typography-1 text-center'>HIPAA Compliant • Secure • Trusted by Healthcare Professionals</Text>
            </Center>
        </SafeContainer>

    );
}
