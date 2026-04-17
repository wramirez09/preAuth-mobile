import LinearGradientCore from '@/components/LinearGradientCore'
import SafeContainer from '@/components/SafeContainer'
import { View } from '@gluestack-ui/themed'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View as RNView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { wrapScrollView } from 'react-native-scroll-into-view'
import { useGuide } from '../context/Guide/context'
import { GUIDE_STEPS } from '../context/Guide/guideProvider'
import GuideFooter from './components/GuideFooter'
import GuideHeader from './components/GuideHeader'

const CustomScrollView = wrapScrollView(ScrollView)

interface GuideContainerProps {
  children: (ref: React.RefObject<RNView | null>) => React.ReactNode
  showHeader?: boolean
}

const GuideContainer: React.FC<GuideContainerProps> = ({
  children,
  showHeader = true,
}) => {
  const { currentStepIndex } = useGuide()
  const isWelcomeScreen = currentStepIndex === -1
  const step = isWelcomeScreen
    ? null
    : GUIDE_STEPS.find(step => step.step === currentStepIndex)

  const viewRef = React.useRef<RNView>(null)

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <CustomScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <TouchableWithoutFeedback
            onPress={dismissKeyboard}
            accessible={false}
          >
            <SafeContainer className="h-full">
              {showHeader && step && (
                <GuideHeader title={step.title} subTitle={step.subTitle} />
              )}
              <View className={`flex-1`}>{children(viewRef)}</View>
              <GuideFooter />
            </SafeContainer>
          </TouchableWithoutFeedback>
        </CustomScrollView>
      </KeyboardAvoidingView>
    </LinearGradientCore>
  )
}

export default GuideContainer
