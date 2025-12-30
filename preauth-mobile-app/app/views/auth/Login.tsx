
import SafeContainer from "@/components/SafeContainer";
import { VStack } from "@/components/ui/vstack";
import {
    FormControl,
    FormControlLabel,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";

import { TextInput, Text } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";

const Login = () => {
    const emailRef = useRef<TextInput>(null);

    useEffect(() => {
        // Small delay to ensure the component is fully mounted
        const timer = setTimeout(() => {
            if (emailRef.current) {
                emailRef.current.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);
    return <SafeContainer>

        <VStack className="gap-4">
            <Heading size="xl" className="text-center">Welcome back</Heading>
            <ThemedText className="text-center mb-5">Sign in to your account to continue</ThemedText>
            <FormControl className="mx-5 mb-5 ">
                <FormControlLabel >
                    <FormControlLabelText>Email</FormControlLabelText>

                </FormControlLabel>
                <Input variant="outline" size="lg">
                    <InputField

                        placeholder="Enter email"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        enablesReturnKeyAutomatically

                    />
                </Input>
                <FormControlHelper >
                    <FormControlHelperText>
                        <Text className="decoration-purple-800">Enter your email address</Text>
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon />
                    <FormControlErrorText className="text-sm">Email is required</FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl className="mx-5 mb-5">
                <FormControlLabel>
                    <FormControlLabelText className="px-3">Password</FormControlLabelText>

                </FormControlLabel>
                <Input variant="outline" size="lg">
                    <InputField
                        className="decoration-purple-800"
                        placeholder="secret password"
                        type="password"
                        autoComplete="password"
                        keyboardType="default"
                        returnKeyType="next"
                        enablesReturnKeyAutomatically


                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText className="text-purple-800 text-xs">Enter your password</FormControlHelperText>
                </FormControlHelper>
                <FormControlError className="mb-5">
                    <FormControlErrorIcon />
                    <FormControlErrorText className="text-sm">Password is required</FormControlErrorText>
                </FormControlError>

            </FormControl>
            <FormControl className="mx-5">
                <Button
                    variant="solid"
                    size="md"
                    action="secondary"
                    onPress={() => console.log('Login pressed')}
                >
                    <Text>Login</Text>
                </Button>
            </FormControl>

        </VStack>

    </SafeContainer>;
};

export default Login;