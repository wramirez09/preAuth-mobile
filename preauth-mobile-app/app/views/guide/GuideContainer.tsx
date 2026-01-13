import React from 'react'
import { GUIDE_STEPS } from '../context/Guide/guideProvider'
import GuideHeader from './components/GuideHeader'
import GuideFooter from './components/GuideFooter'
import { View } from 'react-native'
import { useGuide } from '../context/Guide/context'
import SafeContainer from '@/components/SafeContainer'

const GuideContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentStepIndex } = useGuide()
  const step = GUIDE_STEPS[currentStepIndex]
  const progress = (currentStepIndex + 1) / GUIDE_STEPS.length

  return (
    <SafeContainer className="h-full">
      <GuideHeader
        title={step.title}
        subTitle={step.subTitle}
        progress={progress}
        stepIndex={currentStepIndex + 1}
        totalSteps={GUIDE_STEPS.length}
      />
      <View className="flex-1">{children}</View>
      <GuideFooter />
    </SafeContainer>
  )
}

export default GuideContainer
