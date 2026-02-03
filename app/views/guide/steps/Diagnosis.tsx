import DiagnosisTextArea from '@/components/Form/DiagnosisTextArea'
import { Text } from '@gluestack-ui/themed'
import { Activity } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const Diagnosis: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper
        title="Diagnosis"
        Icon={Activity}
        iconColor="#F97316"
        iconBgColor="bg-orange-50"
      >
        <DiagnosisTextArea />
      </CardWrapper>

      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're
          not sure which treatment to select, you can chat with our support team
          or consult your healthcare provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default Diagnosis
