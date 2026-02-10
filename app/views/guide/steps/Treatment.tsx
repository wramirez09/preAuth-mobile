import CodesTextArea from '@/components/Form/CodesTextArea'
import { TreatmentSelect } from '@/components/Form/TreatmentSelect'
import { Text } from '@gluestack-ui/themed'
import { Activity, Stethoscope } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const Treatment: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper
        title="Treatment"
        Icon={Stethoscope}
        iconColor="#7C3AED"
        iconBgColor="bg-violet-50"
      >
        <TreatmentSelect showIcon={false} showLabel={false} />
      </CardWrapper>
      <CardWrapper
        title="CPT or HCPCS"
        Icon={Activity}
        iconColor="#4F46E5"
        iconBgColor="bg-indigo-50"
      >
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
  )
}

export default Treatment
