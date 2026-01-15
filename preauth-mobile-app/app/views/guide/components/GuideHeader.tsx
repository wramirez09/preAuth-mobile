import React from 'react'
import { Text } from '@/components/ui/text'
import { Progress, ProgressFilledTrack } from '@/components/ui/progress'
import { View } from 'react-native'

import { Heading } from '@/components/ui/heading'

type GuideHeaderProps = {
  title: string
  subTitle: string
  progress: number
  stepIndex: number
  totalSteps: number
  onBack: () => void
}
const GuideHeader: React.FC<Partial<GuideHeaderProps>> = ({
  title,
  subTitle,
  stepIndex,
  totalSteps,
}) => {
  const calculateProgress = () => {
    const index = stepIndex! + 1
    if (!stepIndex || !totalSteps) return 0
    return (index / totalSteps) * 100
  }

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between">
        <Text className="tex-gray-600 text-sm">
          Step {stepIndex!} of {totalSteps}
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
