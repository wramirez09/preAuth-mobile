import { Heading } from '@/components/ui/heading'
import GuideContainer from '../GuideContainer'
import { View } from 'react-native'

const Guidelines: React.FC = () => {
  return (
    <GuideContainer>
      <View className="h-full">{/* <Heading>Guidelines content</Heading> */}</View>
    </GuideContainer>
  )
}

export default Guidelines
