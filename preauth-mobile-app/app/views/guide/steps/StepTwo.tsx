import SafeContainer from "@/components/SafeContainer"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



const StepTwo: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return <SafeContainer>
        <Heading>StepTwo</Heading>
        <Button onPress={() => navigation.navigate("StepThree")}><ButtonText>Next</ButtonText></Button>
    </SafeContainer>
}

export default StepTwo