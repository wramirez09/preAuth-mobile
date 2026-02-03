import { Text } from '@gluestack-ui/themed'
import { Activity } from 'lucide-react-native'
import GuideContainer from '../GuideContainer'
import { CardWrapper, SubCard } from '../components/CarWrapper'

import HistoryTextArea from '@/components/Form/HistoryTextArea'

const History: React.FC = () => {
  return (
    <GuideContainer>
      <CardWrapper
        title="History"
        Icon={Activity}
        iconColor="#F43F5E"
        iconBgColor="bg-rose-50"
      >
        <HistoryTextArea />
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

export default History
