import React from 'react'
import { GUIDE_STEPS } from '../context/Guide/guideProvider'
import GuideHeader from './components/GuideHeader'
import GuideFooter from './components/GuideFooter'
import { View } from 'react-native'
import { useGuide } from '../context/Guide/context'
import SafeContainer from '@/components/SafeContainer'

const GuideContainer: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode; showHeader?: boolean }>
> = ({ children, showHeader = true }) => {
  const { currentStepIndex } = useGuide()
  // For the welcome screen (step 0), we don't show the header
  const isWelcomeScreen = currentStepIndex === -1
  const step = isWelcomeScreen ? null : GUIDE_STEPS.find((step) => step.step === currentStepIndex)

  return (
    <SafeContainer className="h-full">
      {showHeader && step && <GuideHeader title={step.title} subTitle={step.subTitle} />}
      <View className={`flex-1`}>{children}</View>
      <GuideFooter />
    </SafeContainer>
  )
}

export default GuideContainer
