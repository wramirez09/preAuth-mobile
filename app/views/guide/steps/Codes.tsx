import CodesTextArea from '@/components/Form/CodesTextArea'
import { Text } from '@gluestack-ui/themed'
import { Activity } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const Codes: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper title="CPT or HCPCS" Icon={Activity}>
        <CodesTextArea />
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

export default Codes
