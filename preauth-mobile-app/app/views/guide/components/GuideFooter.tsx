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

    if (currentStepIndex <= 0) {
      navigation.navigate('Pick')
    } else navigation.navigate(GUIDE_STEPS[currentStepIndex - 1].id)
  }, [currentStepIndex])

  const handleStartOver = React.useCallback(() => {
    navigation.navigate('GuideWelcome')
  }, [currentStepIndex])

  return (
    <View>
      <Button className="bg-blue-600 rounded-lg mb-4" onPress={() => next()}>
        <ButtonText className="text-white font-semibold text-sm">{`${isLastStep ? 'submit' : 'Next Step'}`}</ButtonText>

        <ArrowRight color="white" size={18} style={{ marginLeft: 8 }} />
      </Button>
      {currentStepIndex > 0 ? (
        <Button
          className="bg-white rounded-lg mb-4 border-gray-300"
          onPress={() => back()}
          variant="outline"
        >
          <ArrowLeft color="black" size={18} style={{ marginLeft: 8 }} />
          <ButtonText className="text-black font-semibold text-sm">Previous Step</ButtonText>
        </Button>
      ) : (
        <Button
          className="bg-white rounded-lg mb-4 border-gray-300"
          onPress={() => handleStartOver()}
          variant="outline"
        >
          <ArrowLeft color="black" size={18} style={{ marginLeft: 8 }} />
          <ButtonText className="text-black font-semibold text-sm">Back to Menu</ButtonText>
        </Button>
      )}
    </View>
  )
}

export default GuideFooter
