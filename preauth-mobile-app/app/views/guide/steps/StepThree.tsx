import SafeContainer from "@/components/SafeContainer"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



const StepThree: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return <SafeContainer>
        <Heading>StepThree</Heading>
        <Button onPress={() => navigation.navigate("StepFour")}><ButtonText>Next</ButtonText></Button>
    </SafeContainer>
}

export default StepThree