import { Button, ButtonText, View } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react-native'
import { useGuide } from '../../context/Guide/context'
import { GUIDE_STEPS } from '../../context/Guide/guideProvider'

import { formatFormDataForChat } from '@/app/utils/formatFormDataForChat'
import * as React from 'react'
import { useFormData } from '../../context/FormData/context'

const GuideFooter = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { currentStepIndex, setCurrentStepIndex, setIsTransitioning } =
    useGuide()
  const { formData, resetFormData, isSubmitDisabled } = useFormData()
  const isLastStep = currentStepIndex === GUIDE_STEPS.length

  const next = React.useCallback(() => {
    const nextStep = currentStepIndex + 1
    setCurrentStepIndex(nextStep)
    const step = GUIDE_STEPS.find(step => step.step === nextStep)
    requestAnimationFrame(() => {
      navigation.navigate(step?.id || '')
    })
  }, [currentStepIndex, isLastStep, navigation, setCurrentStepIndex])

  const back = React.useCallback(() => {
    if (currentStepIndex <= 1) {
      setCurrentStepIndex(1)
      requestAnimationFrame(() => {
        navigation.navigate('GuideWelcome')
      })
    } else {
      const prevStep = currentStepIndex - 1
      setCurrentStepIndex(prevStep)

      const step = GUIDE_STEPS.find(step => step.step === prevStep)

      requestAnimationFrame(() => {
        navigation.navigate(step?.id || '')
      })
    }
  }, [currentStepIndex, navigation, setCurrentStepIndex])

  const handleStartOver = React.useCallback(() => {
    setCurrentStepIndex(1)
    navigation.navigate('GuideWelcome')
  }, [currentStepIndex])

  const handleSubmitToChat = () => {
    setCurrentStepIndex(1)
    // Format the form data for the chat
    const formattedMessage = formatFormDataForChat(formData)
    // Navigate to chat with the formatted message
    navigation.navigate('Chat', {
      initialMessage: {
        message: formattedMessage,
      },
    })
  }

  console.log(isSubmitDisabled)

  return (
    <View>
      {isLastStep && (
        <Button
          className={`rounded-lg mb-4 ${isSubmitDisabled ? 'bg-gray-400' : 'bg-green-600'}`}
          onPress={() => handleSubmitToChat()}
          disabled={isSubmitDisabled}
        >
          <ButtonText className="text-white font-semibold text-sm">
            Submit
          </ButtonText>
        </Button>
      )}
      {currentStepIndex >= 0 && !isLastStep ? (
        <View className="gap-2">
          <Button className="bg-blue-600 rounded-lg" onPress={() => next()}>
            <ButtonText className="text-white font-semibold text-sm">
              Next Step
            </ButtonText>

            <ArrowRight color="white" size={18} />
          </Button>
          <Button
            className="bg-white rounded-lg border-gray-300"
            onPress={() => back()}
            variant="outline"
          >
            <ArrowLeft color="black" size={18} />
            <ButtonText className="text-black font-semibold text-sm">
              Previous Step
            </ButtonText>
          </Button>
        </View>
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          <Button
            className="bg-white rounded-lg border-gray-300 gap-2 flex-1"
            onPress={() => handleStartOver()}
            variant="outline"
          >
            <RotateCcw size={18} color="#111827" />
            <ButtonText className="text-black font-semibold text-sm">
              Start Over
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            className="bg-white rounded-lg border-gray-300 gap-2 flex-1"
            onPress={() => resetFormData()}
          >
            <RotateCcw size={18} color="#111827" />
            <ButtonText className="text-black font-semibold text-sm">
              Reset Query
            </ButtonText>
          </Button>
        </View>
      )}
    </View>
  )
}

export default GuideFooter
