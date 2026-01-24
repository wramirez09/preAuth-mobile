import SafeContainer from "@/components/SafeContainer";

import {
    Button, ButtonText,
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
    Input, InputField,
    Text,
    View
} from '@gluestack-ui/themed';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import logoImage from '../../assets/images/ndLogo.png';
import { useAuth } from "./context";



const SignUp: React.FC = () => {
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
            <Center className="w-full h-full px-2">
                 <View style={{ width: 80, height: 80, marginBottom: 24 }}>
                              <Image
                                source={logoImage}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                alt="noteDoctor ai"
                              />
                            </View>
            <View className="w-full">
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
                    <Input variant="outline" size="lg" className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center">
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
                    <Input variant="outline" size="lg" className="h-14 rounded-2xl border-2 border-gray-200 bg-white items-center justify-center">
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
                    <Button size="md" onPress={() => userSignIn()} className="h-14 rounded-2xl bg-blue-600 items-center justify-center shadow-sm  mb-6">
                        <ButtonText>Create Account</ButtonText>
                    </Button>
                </FormControl>
            </View>
            </Center>
        </SafeContainer>
    );
};

export default SignUp;
