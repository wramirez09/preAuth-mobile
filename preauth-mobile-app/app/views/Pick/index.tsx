import SafeContainer from "@/components/SafeContainer"
import { Button, ButtonText, Center, FormControl, FormControlHelper, FormControlHelperText, FormControlLabelText, Heading, Text } from '@gluestack-ui/themed'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const Pick: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return <SafeContainer>
        <Center className="h-full">
            <Heading className="text-start">Pick</Heading>
            <Text className="mb-10 w-full">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. </Text>
            <FormControl className="w-full mb-5">
                <Button ><ButtonText>Guide Me</ButtonText></Button>
                <FormControlHelper>
                    <FormControlHelperText>Will guide you one step at a time </FormControlHelperText>
                </FormControlHelper>
            </FormControl>

            <FormControl className="w-full mb-5">
                <Button><ButtonText onPress={() => navigation.navigate('PreAuthForm')}>Full Form</ButtonText></Button>
                <FormControlHelper>
                    <FormControlHelperText>Fill out a form and create a pre authorization query</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className="w-full mb-5">
                <Button onPress={() => navigation.navigate('Chat')}><ButtonText>Go to Chat</ButtonText></Button>
                <FormControlHelper>
                    <FormControlHelperText>Chat with our LM, the pre-auth form can be toggled from here as well</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
        </Center>
    </SafeContainer >
}

export default Pick