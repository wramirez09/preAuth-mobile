import SafeContainer from "@/app/components/SafeContainer";
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
import { Input, InputField } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { Center } from '@/components/ui/center';
import { TextInput } from 'react-native';
import { Button } from "@react-navigation/elements";

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
            <FormControl className="mx-5 mb-5">
                <FormControlLabel>
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
                <FormControlHelper>
                    <FormControlHelperText className="text-xs">Enter your email address</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon />
                    <FormControlErrorText className="text-sm">Email is required</FormControlErrorText>
                </FormControlError>
            </FormControl>

            <FormControl className="mx-5 mb-5">
                <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>

                </FormControlLabel>
                <Input variant="outline" size="lg">
                    <InputField

                        placeholder="secret password"
                        type="password"
                        autoComplete="password"
                        keyboardType="default"
                        returnKeyType="next"
                        enablesReturnKeyAutomatically

                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText className="text-xs">Enter your password</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon />
                    <FormControlErrorText className="text-sm">Password is required</FormControlErrorText>
                </FormControlError>
            </FormControl>

            <Button
                className="mx-5"
                onPress={() => console.log('Login pressed')}
            >
                Login
            </Button>
        </VStack>

    </SafeContainer>;
};

export default Login;