import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import GuideContainer from '../GuideContainer'
import { Pressable, ScrollView, View } from 'react-native'
import { CheckCircle2, Edit2, FileCheck } from 'lucide-react-native'


import * as React from 'react'
import { useFormData } from '../../context/FormData/context'
import { Card } from '@/components/ui/card'
import { useGuide } from '../../context/Guide/context'
import { refNavigate } from '@/app/utils/navigationRef'
import { states } from '@/app/data/selectOptions'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { GUIDE_STEPS } from '../../context/Guide/guideProvider'

type RootStackParamList = {
  Chat: { initialMessage: string }
  // Add other screens as needed
}

const getState = (stateId: number): string => {
  return states.find((state) => state.state_id === stateId)?.description || ''
}

const Review: React.FC = () => {
  const formData = useFormData()
  const { setCurrentStepIndex } = useGuide()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleNavigate = (path: string, step: number) => {
    setCurrentStepIndex(step)
    requestAnimationFrame(() => {
      refNavigate(path as any)
    })
  }

  return (
    <ScrollView className="h-full">
      <GuideContainer showHeader={false}>
        <View className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck size={16} color="#00a63e" />
        </View>
        <Heading className="text-2xl mb-2 text-center">Review Your Information</Heading>
        <Text className="text-gray-600 text-center text-sm mb-6">
          Please review all the information below before submitting your pre-authorization request.
        </Text>
        {GUIDE_STEPS.map((card, index) => {
          if (card.step === 7) return null
          return (
            <Card className="p-5 bg-white shadow-sm mb-3" key={index}>
              <View className="flex-row items-start">
                {/* Left status icon */}
                <CheckCircle2 size={20} color="#16a34a" />

                {/* Middle content */}
                <View className="flex-1 ml-4">
                  <Text className="font-medium text-gray-900 mb-1">{card.title}</Text>
                </View>

                {/* Right edit icon */}
                <Pressable
                  onPress={() => handleNavigate(card.id, card.step)}
                  hitSlop={10}
                  className="ml-3"
                >
                  <Edit2 size={20} color="#2563eb" />
                </Pressable>
              </View>
            </Card>
          )
        })}
      </GuideContainer>
    </ScrollView>
  )
}

export default Review
