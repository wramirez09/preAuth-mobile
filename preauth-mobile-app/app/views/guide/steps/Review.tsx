import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import GuideContainer from '../GuideContainer'
import { Pressable, ScrollView, View } from 'react-native'
import { CheckCircle2, Edit2, FileCheck } from 'lucide-react-native'


import * as React from 'react'
import { useFormData } from '../../context/FormData/context'
import { Card } from '@/components/ui/card'

const Review: React.FC = () => {
  const formData = useFormData()
  console.log({ formData: formData.formData })
  const cards = React.useMemo(() => {
    return [
      { label: 'Guidelines', value: formData.formData?.guidelines, step: 1 },
      { label: 'Treatment', value: formData.formData?.treatment, step: 2 },
      { label: 'State', value: formData.formData?.state, step: 3 },
      { label: 'Diagnosis', value: formData.formData?.diagnosis, step: 4 },
      { label: 'Medical History', value: formData.formData?.medicalHistory, step: 5 },
      { label: 'CPT/HCPCS Code', value: formData.formData?.codes, step: 6 },
    ]
  }, [formData])
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
          return (
            <Card className="p-5 bg-white shadow-sm mb-3" key={index}>
              <View className="flex-row items-start">
                {/* Left status icon */}
                <CheckCircle2 size={20} color="#16a34a" />

                {/* Middle content */}
                <View className="flex-1 ml-4">
                  <Text className="font-medium text-gray-900 mb-1">{card.label}</Text>
                  <Text className="text-sm text-gray-600">{card.value}</Text>
                </View>

                {/* Right edit icon */}
                <Pressable
                  onPress={() => {
                    // jump to step
                    // goToStep(card.step)
                  }}
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
