import { StateSelect } from '@/components/Form/StateSelect'
import { Text } from '@gluestack-ui/themed'
import { MapPin } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const State: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper
        title="State"
        Icon={MapPin}
        iconBgColor="bg-emerald-50"
        iconColor="#059669"
      >
        <StateSelect showIcon={false} showLabel={false} />
      </CardWrapper>
      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're
          not sure which State to select, you can chat with our support team or
          consult your healthcare provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default State
