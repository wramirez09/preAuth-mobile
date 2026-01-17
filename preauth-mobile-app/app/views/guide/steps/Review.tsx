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
import { formatFormDataForChat } from '@/app/utils/formatFormDataForChat'
import { Button } from '@/components/ui/button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

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

  const cards = React.useMemo(() => {
    return [
      { label: 'Guidelines', value: formData.formData?.guidelines, step: 0, path: 'Guidelines' },

      { label: 'State', value: formData.formData?.state, step: 1, path: 'Treatment' },

      { label: 'Treatment', value: formData.formData?.treatment, step: 2, path: 'Treatment' },

      { label: 'Diagnosis', value: formData.formData?.diagnosis, step: 3, path: 'Diagnosis' },

      {
        label: 'Medical History',
        value: formData.formData?.medicalHistory,
        step: 4,
        path: 'History',
      },

      { label: 'CPT/HCPCS Code', value: formData.formData?.codes, step: 5, path: 'Codes' },

      { label: 'Review', value: formData.formData?.codes, step: 6, path: 'Review' },
    ]
  }, [formData])

  const handleNavigate = (path: string, step: number) => {
    refNavigate(path as any)
    setCurrentStepIndex(step - 1)
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
        {cards.map((card, index) => {
          if (card.step === 7) return null
          return (
            <Card className="p-5 bg-white shadow-sm mb-3" key={index}>
              <View className="flex-row items-start">
                {/* Left status icon */}
                <CheckCircle2 size={20} color="#16a34a" />

                {/* Middle content */}
                <View className="flex-1 ml-4">
                  <Text className="font-medium text-gray-900 mb-1">{card.label}</Text>
                  <Text className="text-sm text-gray-600">
                    {card.label === 'State' && typeof card.value === 'number'
                      ? getState(card.value)
                      : card.value}
                  </Text>
                </View>

                {/* Right edit icon */}
                <Pressable
                  onPress={() => handleNavigate(card.path, card.step)}
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
