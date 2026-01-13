import { Heading, Text, Button, ButtonText, View } from '@gluestack-ui/themed'
import { ArrowRight, ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useGuide } from '../../context/Guide/context'
import { GUIDE_STEPS } from '../../context/Guide/guideProvider'

import * as React from 'react'

const GuideFooter = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { currentStepIndex, setCurrentStepIndex } = useGuide()
  const isLastStep = currentStepIndex === GUIDE_STEPS.length - 1
  const next = React.useCallback(() => {
    if (isLastStep) {
      setCurrentStepIndex(0)
    } else {
      const nextStep = currentStepIndex + 1
      setCurrentStepIndex(nextStep)
      navigation.navigate(GUIDE_STEPS[nextStep].id)
    }
  }, [currentStepIndex, isLastStep, navigation, setCurrentStepIndex])

  const back = React.useCallback(() => {
    setCurrentStepIndex(currentStepIndex - 1)
    if (currentStepIndex == 0) return navigation.navigate('GuideWelcome')
    navigation.navigate(GUIDE_STEPS[currentStepIndex - 1].id)
  }, [currentStepIndex])

  return (
    <View>
      <Button className="bg-blue-600 rounded-lg mb-4" onPress={() => next()}>
        <ButtonText className="text-white font-semibold">{`${isLastStep ? 'submit' : 'Next Step'}`}</ButtonText>

        <ArrowRight color="white" size={18} style={{ marginLeft: 8 }} />
      </Button>
      <Button className="bg-blue-600 rounded-lg mb-4" onPress={() => back()}>
        <ButtonText className="text-white font-semibold">Previous Step</ButtonText>
        <ArrowLeft color="white" size={18} style={{ marginLeft: 8 }} />
      </Button>
    </View>
  )
}

export default GuideFooter
