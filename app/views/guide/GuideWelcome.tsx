import {
  Button,
  ButtonText,
  Card,
  Center,
  Divider,
  Heading,
  Text,
  View,
} from '@gluestack-ui/themed'

import LinearGradientCore from '@/components/LinearGradientCore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  ArrowRight,
  CheckCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { useGuide } from '../context/Guide/context'
import { useFormData } from '../context/FormData/context'

const FeatureItem = ({ text }: { text: string }) => (
  <View className="flex-row items-center my-3">
    <CheckCircle color="#22C55E" size={20} />
    <Text className="ml-3 text-gray-700 flex-1">{text}</Text>
  </View>
)

const GuideWelcome: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { setCurrentStepIndex } = useGuide()
  const { resetFormData } = useFormData()

  const handleStart = () => {
    setCurrentStepIndex(1)
    navigation.navigate('Guidelines')
  }

  const handleStartOver = useCallback(() => {
    setCurrentStepIndex(1)
    resetFormData()
    navigation.navigate('Pick')
  }, [])
  return (
    <Center className="w-full h-full px-0 mt-0">
      <Card className="border-0 p-0 overflow-hidden rounded-2xl shadow-xl w-[95%]">
        <LinearGradientCore className="justify-center items-center rounded-b-none">
          {/* Icon bubble */}
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-5">
            <Sparkles color="white" size={28} />
          </View>

          {/* Title */}
          <Heading className="text-white text-2xl font-bold mb-2 text-center">
            Welcome to the Guide
          </Heading>

          {/* Subtitle */}
          <Text className="text-blue-100 text-sm text-center">
            Let&apos;s get started on your journey
          </Text>
        </LinearGradientCore>
        {/* ===== Content Section ===== */}
        <View className="px-6 py-6 bg-white">
          {/* Checklist */}
          <View className="space-y-4 mb-6">
            <FeatureItem text="Step-by-step guidance through the process" />
            <FeatureItem text="Quick and easy to complete" />
            <FeatureItem text="Get personalized recommendations" />
          </View>

          {/* Primary Button */}
          <Button
            className="bg-blue-600 rounded-lg mb-4"
            onPress={() => handleStart()}
          >
            <ButtonText className="text-white font-semibold">Begin</ButtonText>
            <ArrowRight color="white" size={18} style={{ marginLeft: 8 }} />
          </Button>

          {/* Secondary Button */}
          <Pressable
            onPress={() => handleStartOver()}
            className="border border-gray-300 rounded-lg py-3 flex-row items-center justify-center"
          >
            <RotateCcw size={18} color="#111827" />
            <Text className="ml-2 font-medium text-gray-900">Start Over</Text>
          </Pressable>

          <Divider className="my-6" />

          {/* Footer */}
          <Text className="text-center text-gray-500 text-sm">
            Need assistance?{' '}
            <Text className="text-blue-600 font-medium text-sm">
              Contact Support
            </Text>
          </Text>
        </View>
      </Card>
    </Center>
  )
}

export default GuideWelcome
