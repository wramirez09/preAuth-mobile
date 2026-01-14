import GuideContainer from '../GuideContainer'
import { FileText } from 'lucide-react-native'
import { Text } from '@gluestack-ui/themed'
import { GuidelinesSelect } from '@/components/Form/GuidelinesSelect'
import { CardWrapper, SubCard } from '../components/CarWrapper'

const Guidelines: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper title="Guidelines" Icon={FileText}>
        <GuidelinesSelect showIcon={false} showLable={false} />
      </CardWrapper>
      <SubCard>
        <Text className="text-xs">
          <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're not sure which
          treatment to select, you can chat with our support team or consult your healthcare
          provider.
        </Text>
      </SubCard>
    </GuideContainer>
  )
}

export default Guidelines
