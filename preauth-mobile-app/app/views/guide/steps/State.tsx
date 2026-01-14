import { Text } from '@gluestack-ui/themed'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'
import { MapPin } from 'lucide-react-native'
import { StateSelect } from '@/components/Form/StateSelect'

const State: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper title="State" Icon={MapPin}>
        <StateSelect showIcon={false} showLabel={false} />
      </CardWrapper>
      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're not sure which State
          to select, you can chat with our support team or consult your healthcare provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default State
