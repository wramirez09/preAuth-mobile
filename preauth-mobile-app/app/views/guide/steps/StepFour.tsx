import SafeContainer from "@/components/SafeContainer"
import { Button, ButtonText } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



const StepFour: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return <SafeContainer>
        <Heading>StepFour</Heading>
        <Button><ButtonText>Submit</ButtonText></Button>
    </SafeContainer>
}

export default StepFour