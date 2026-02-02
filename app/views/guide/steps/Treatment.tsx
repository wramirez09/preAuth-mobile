import CodesTextArea from '@/components/Form/CodesTextArea'
import { TreatmentSelect } from '@/components/Form/TreatmentSelect'
import { ScrollView, Text } from '@gluestack-ui/themed'
import { Activity, Stethoscope } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const Treatment: React.FC = () => {
  return (
    <ScrollView>
      <GuideContainer>
        <CardWrapper title="Treatment" Icon={Stethoscope}>
          <TreatmentSelect showIcon={false} showLabel={false} />
        </CardWrapper>
        <CardWrapper title="CPT or HCPCS" Icon={Activity}>
          <CodesTextArea />
        </CardWrapper>
        <SubCard>
          <Text className="text-xs">
            <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're
            not sure which Guidelines to select, you can chat with our support
            team or consult your healthcare provider.
          </Text>
        </SubCard>
      </GuideContainer>
    </ScrollView>
  )
}

export default Treatment
