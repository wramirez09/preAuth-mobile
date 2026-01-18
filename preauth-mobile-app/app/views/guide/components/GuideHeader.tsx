import React from 'react'
import { Text } from '@/components/ui/text'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import { View } from 'react-native'

import { Heading } from '@/components/ui/heading'
import { useGuide } from '../../context/Guide/context'
import { GUIDE_STEPS } from '../../context/Guide/guideProvider'

type GuideHeaderProps = {
  title: string
  subTitle: string
  progress: number

  onBack: () => void
}
const GuideHeader: React.FC<Partial<GuideHeaderProps>> = ({ title, subTitle }) => {
  const { currentStepIndex } = useGuide()
  console.log('currentStepIndex', currentStepIndex)
  const totalSteps = GUIDE_STEPS.length

  const calculateProgress = React.useCallback(() => {
    const stepIndex = currentStepIndex!
    if (!stepIndex || !totalSteps) return 0
    return (stepIndex / totalSteps) * 100
  }, [currentStepIndex])

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between">
        <Text className="tex-gray-600 text-sm">
          Step {currentStepIndex!} of {totalSteps - 1}
        </Text>
        <Text className="tex-gray-600 text-sm">
          {calculateProgress().toString().split('.')[0]}%
        </Text>
      </View>
      <Progress
        value={calculateProgress()}
        className="w-full mb-8"
        size="sm"
        orientation="horizontal"
      >
        <ProgressFilledTrack className="bg-blue-600" />
      </Progress>
      <Heading className="text-3xl mb-2">{title}</Heading>
      <Text className="text-lg">{subTitle}</Text>
    </View>
  )
}

export default GuideHeader
