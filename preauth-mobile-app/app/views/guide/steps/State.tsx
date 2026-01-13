import { Heading } from '@/components/ui/heading'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import GuideContainer from '../GuideContainer'

const State: React.FC = () => {
  return (
    <GuideContainer>
      <Heading>State</Heading>
    </GuideContainer>
  )
}

export default State
