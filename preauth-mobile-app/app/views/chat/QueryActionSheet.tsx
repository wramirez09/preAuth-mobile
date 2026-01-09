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
import React from 'react';
import { View } from "react-native"
import {
    ActionSheetProvider,
    ActionSheetProviderRef,
} from '@expo/react-native-action-sheet'

const QueryActionSheet: React.FC = () => {

    return <ActionSheetProvider>
        <View>
            <FormControl className="mb-5">
                <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input variant="outline" size="lg" className="shadow-md">
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
                    <FormControlHelperText>Enter your email address</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon />
                    <FormControlErrorText>Email is required</FormControlErrorText>
                </FormControlError>
            </FormControl>
        </View>
    </ActionSheetProvider>
}

export default QueryActionSheet