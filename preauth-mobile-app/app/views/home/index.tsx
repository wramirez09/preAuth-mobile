import "@/global.css";
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function Home() {
    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider value={DefaultTheme}>
                <SafeAreaProvider>
                    <SafeAreaView>
                        <StatusBar
                            animated={true}
                            backgroundColor="#FFF"
                            hidden={false}
                        />
                        <Center className="w-full h-full">
                            <Heading className="text-typography-1 font-bold mb-5" size='xl'>Welcome to NoteDoctor.ai</Heading>

                            <HStack space="md" reversed={false} className='mb-5'>
                                <Button variant="link" size="md" action="primary" >
                                    <ButtonText>Sign Up</ButtonText>
                                </Button>
                                <Button variant="solid" size="md" action="secondary">
                                    <ButtonText>Sign In</ButtonText>
                                </Button>
                            </HStack>
                            <Text className='text-typography-1 text-center'>HIPAA Compliant • Secure • Trusted by Healthcare Professionals</Text>
                        </Center>
                    </SafeAreaView>
                </SafeAreaProvider >
            </ThemeProvider >
        </GluestackUIProvider >
    );
}
