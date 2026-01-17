import { Heading, Text, Button, ButtonText, View } from '@gluestack-ui/themed'
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useGuide } from '../../context/Guide/context'
import { GUIDE_STEPS } from '../../context/Guide/guideProvider'

import * as React from 'react'
import { useFormData } from '../../context/FormData/context'
import { formatFormDataForChat } from '@/app/utils/formatFormDataForChat'
import { states } from '@/app/data/selectOptions'

const GuideFooter = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { currentStepIndex, setCurrentStepIndex } = useGuide()
  const { formData, resetFormData } = useFormData()
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
    
    if (currentStepIndex === 0) {
      navigation.navigate('GuideWelcome')
    } else navigation.navigate(GUIDE_STEPS[currentStepIndex - 1].id)
  }, [currentStepIndex])

  const handleStartOver = React.useCallback(() => {
    navigation.navigate('GuideWelcome')
  }, [currentStepIndex])

  const handleFormDataReset = React.useCallback(() => {
    resetFormData()
  }, [formData])

  const handleSubmitToChat = () => {
    const message = formatFormDataForChat({ ...formData, states })
    // Navigate to chat screen with the message
    navigation.navigate('Chat', { initialMessage: message })
  }

  return (
    <View>
      {isLastStep ? (
        <Button className="bg-blue-600 rounded-lg mb-4" onPress={() => handleSubmitToChat()}>
          <ButtonText className="text-white font-semibold text-sm">Submit</ButtonText>

          <ArrowRight color="white" size={18} style={{ marginLeft: 8 }} />
        </Button>
      ) : (
        <Button className="bg-blue-600 rounded-lg mb-4" onPress={() => next()}>
          <ButtonText className="text-white font-semibold text-sm">Next Step</ButtonText>

          <ArrowRight color="white" size={18} style={{ marginLeft: 8 }} />
        </Button>
      )}
      {currentStepIndex >= 0 ? (
        <View className="flex flex-row gap-2 justify-center">
          <Button
            className="bg-white rounded-lg mb-4 border-gray-300 flex-1 justify-between"
            onPress={() => back()}
            variant="outline"
          >
            <ArrowLeft color="black" size={18} style={{ marginLeft: 8 }} />
            <ButtonText className="text-black font-semibold text-sm">Previous Step</ButtonText>
          </Button>
          <Button
            className="bg-white rounded-lg mb-4 border-gray-300 flex-1 justify-between"
            onPress={() => handleFormDataReset()}
            variant="outline"
          >
            <RotateCcw size={18} color="#111827" />
            <ButtonText className="text-black font-semibold text-sm">Reset Form data</ButtonText>
          </Button>
        </View>
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
