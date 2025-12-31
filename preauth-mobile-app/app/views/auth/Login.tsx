
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
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import * as React from "react";

import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { ThemedText } from "@/components/themed-text";
import { Button, ButtonText } from "@/components/ui/button";

import { useAuth } from "./context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, user } = useAuth();

  const userSignIn = React.useCallback(() => {
    signIn(email, password);
    if(user) {
     console.log(user);
     navigation.navigate('Chat'); 
    }
  }, [email, password, user]);

  return (
    <SafeContainer>
      <VStack >
        <Heading size="xl">
          Welcome back
        </Heading>
        <ThemedText >
          Sign in to your account to continue
        </ThemedText>
        <FormControl >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input variant="outline" size="lg" >
            <InputField
              placeholder="Enter email"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onChangeText={(value) => setEmail(value)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              <Text >
                Enter your email address
              </Text>
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon />
            <FormControlErrorText >
              Email is required
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl >
          <FormControlLabel>
            <FormControlLabelText >
              Password
            </FormControlLabelText>
          </FormControlLabel>
          <Input variant="outline" size="lg" >
            <InputField
              placeholder="secret password"
              type="password"
              autoComplete="password"
              keyboardType="default"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onChangeText={(value) => setPassword(value)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText >
              Enter your password
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError >
            <FormControlErrorIcon />
            <FormControlErrorText >
              Password is required
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl >
          <Button
            variant="solid"
            size="md"
            action="secondary"
            onPress={() => userSignIn()}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </FormControl>
      </VStack>
    </SafeContainer>
  );
};

export default Login;
