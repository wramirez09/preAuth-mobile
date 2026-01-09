import * as React from "react";
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
    Input, InputField,
    Text,
    Heading,
    Button, ButtonText
} from '@gluestack-ui/themed';
import { useAuth } from "./context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from 'react-native';



const SignUp = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { signIn, user, loading } = useAuth();

    const userSignIn = React.useCallback(async () => {
        try {
            const { session } = await signIn(email, password);

            if (!session?.access_token) {
                throw new Error('No session after login');
            }

            navigation.navigate('Chat');
        } catch (err) {
            console.error('Login failed:', err);
        }
    }, [email, password]);

    if (loading) {
        return (
            <SafeContainer>
                <Text className="text-center">Authenticating...</Text>
            </SafeContainer>
        );
    }

    return (
        <SafeContainer>
            <VStack>
                <View className="mb-5">
                    <Heading size="xl" className="text-center">
                        Sign up
                    </Heading>
                    <Text size="sm" className="text-center">
                        Create a new account
                    </Text>
                </View>

                <FormControl className="mb-5">
                    <FormControlLabel>
                        <FormControlLabelText>Display Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="shadow-md">
                        <InputField
                            placeholder="Bill"
                            type="text"
                            autoCapitalize="none"
                            keyboardType="default"
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            onChangeText={(value) => setEmail(value)}
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>Enter your display name</FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon />
                        <FormControlErrorText>Display name is required</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl className="mb-10">
                    <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="shadow-md">
                        <InputField
                            placeholder="m@example.com"
                            type="text"
                            autoComplete="email"
                            keyboardType="email-address"
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            onChangeText={(value) => setPassword(value)}
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>Enter your email address</FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon />
                        <FormControlErrorText>Email address is required</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl>
                    <Button size="md" onPress={() => userSignIn()}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </FormControl>
            </VStack>
        </SafeContainer>
    );
};

export default SignUp;
