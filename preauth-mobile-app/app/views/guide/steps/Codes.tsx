import { Text, TextareaInput, Textarea, FormControl } from '@gluestack-ui/themed'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'
import { Activity } from 'lucide-react-native'

const Diagnosis: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper title="CPT or HCPCS" Icon={Activity}>
        <FormControl size="md" className="mb-2 border-gray-400">
          <Textarea className="w-full bg-gray-100">
            <TextareaInput placeholder="CPT or HCPCS codes..." />
          </Textarea>
        </FormControl>
      </CardWrapper>
      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're not sure which CPT or
          HCPCS code(s) to add, you can chat with our support team or consult your healthcare
          provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default Diagnosis
