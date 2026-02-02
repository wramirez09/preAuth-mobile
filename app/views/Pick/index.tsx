import CardCore from '@/components/cardCore'
import SafeContainer from '@/components/SafeContainer'
import { ThemedText } from '@/components/themed-text'
import { Center, Heading, Text } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Compass, FileText, MessageSquare } from 'lucide-react-native'

const Pick: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  return (
    <SafeContainer>
      <Center className="h-full">
        <Heading className="text-3xl mb-2">Choose Your Path</Heading>
        <ThemedText className="text-sm mb-9">
          Select the option that best fits your needs. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </ThemedText>

        <CardCore
          title="Guide Me"
          subTitle="Will guide you one step at a time through the process with personalized assistance."
          pathName="Guide"
          iconBgColor="bg-blue-100"
        >
          <Compass color="#2563eb" />
        </CardCore>

        <CardCore
          title="Full Form"
          subTitle="Create a pre-authorization query with all details in a comprehensive form."
          pathName="PreAuthForm"
          iconBgColor="bg-emerald-100"
        >
          <FileText color="#059669" />
        </CardCore>

        <CardCore
          title="Go to Chat"
          subTitle="Chat with our LM assistant, toggled from here as well for instant support."
          pathName="Chat"
          iconBgColor="bg-violet-100"
        >
          <MessageSquare color="#7c3aed" />
        </CardCore>

        <Text className="text-xs text-center my-5">
          Need help? Contact our support team anytime
        </Text>
      </Center>
    </SafeContainer>
  )
}

export default Pick
