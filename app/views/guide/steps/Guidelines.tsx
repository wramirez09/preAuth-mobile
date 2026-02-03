import { GuidelinesSelect } from '@/components/Form/GuidelinesSelect'
import LinearGradientCore from '@/components/LinearGradientCore'
import { Text } from '@gluestack-ui/themed'
import { FileText } from 'lucide-react-native'
import { CardWrapper, SubCard } from '../components/CarWrapper'
import GuideContainer from '../GuideContainer'

const Guidelines: React.FC = () => {
  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <GuideContainer>
        <CardWrapper
          title="Guidelines"
          Icon={FileText}
          iconBgColor="bg-blue-50"
        >
          <GuidelinesSelect showIcon={false} showLable={false} />
        </CardWrapper>
        <SubCard>
          <Text className="text-xs">
            <Text className="text-xs font-bold">Need Help?&nbsp;</Text>If you're
            not sure which treatment to select, you can chat with our support
            team or consult your healthcare provider.
          </Text>
        </SubCard>
      </GuideContainer>
    </LinearGradientCore>
  )
}

export default Guidelines
