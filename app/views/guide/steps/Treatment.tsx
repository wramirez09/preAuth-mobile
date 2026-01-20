import { Text } from '@gluestack-ui/themed'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'
import { Stethoscope } from 'lucide-react-native'
import { TreatmentSelect } from '@/components/Form/TreatmentSelect'

const Treatment: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper title="Treatment" Icon={Stethoscope}>
        <TreatmentSelect showIcon={false} showLabel={false} />
      </CardWrapper>
      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're not sure which
          Guidelines to select, you can chat with our support team or consult your healthcare
          provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default Treatment
