import { Heading } from '@/components/ui/heading'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import GuideContainer from '../GuideContainer'

const Review: React.FC = () => {
  return (
    <GuideContainer>
      <Heading>Review</Heading>
    </GuideContainer>
  )
}

export default Review
