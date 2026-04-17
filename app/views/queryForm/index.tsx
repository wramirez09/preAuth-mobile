import AccordionCore from '@/components/accordionCore'
import { GuidelinesSelect } from '@/components/Form/GuidelinesSelect'
import { StateSelect } from '@/components/Form/StateSelect'
import { TreatmentSelect } from '@/components/Form/TreatmentSelect'
import LinearGradientCore from '@/components/LinearGradientCore'
import SafeContainer from '@/components/SafeContainer'
import { Button, ButtonText, View } from '@gluestack-ui/themed'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import {
  useScrollIntoView,
  wrapScrollView,
} from 'react-native-scroll-into-view'

const CustomScrollView = wrapScrollView(ScrollView)

import { formatFormDataForChat } from '@/app/utils/formatFormDataForChat'
import { refNavigate } from '@/app/utils/navigationRef'
import CodesTextArea from '@/components/Form/CodesTextArea'
import DiagnosisTextArea from '@/components/Form/DiagnosisTextArea'
import HistoryTextArea from '@/components/Form/HistoryTextArea'
import { Heading, Text } from '@gluestack-ui/themed'
import { Activity, ClipboardList, FileBarChart } from 'lucide-react-native'
import * as React from 'react'
import { ReactNode } from 'react'
import { useFormData } from '../context/FormData/context'

export type AccordionItemData = {
  label: string
  icon: ReactNode
  component: (onFocus?: () => void) => React.JSX.Element
}

export const accordionFormData: AccordionItemData[] = [
  {
    label: 'Diagnosis',
    icon: <Activity size={16} color="#F97316" />,
    component: onFocus => {
      const containerRef = React.useRef<any>(null)

      const handleTextareaFocus = React.useCallback(() => {
        if (containerRef.current) {
          // Use parent scroll functionality if available
          onFocus?.()
        }
      }, [onFocus])

      return (
        <View ref={containerRef}>
          <DiagnosisTextArea onFocus={handleTextareaFocus} />
        </View>
      )
    },
  },
  {
    label: 'Medical History',
    icon: <ClipboardList size={16} color="#F43F5E" />,
    component: onFocus => {
      const containerRef = React.useRef<any>(null)

      const handleTextareaFocus = React.useCallback(() => {
        if (containerRef.current) {
          // Use parent scroll functionality if available
          onFocus?.()
        }
      }, [onFocus])

      return (
        <View ref={containerRef}>
          <HistoryTextArea onFocus={handleTextareaFocus} />
        </View>
      )
    },
  },
  {
    label: 'CPT or HCPCS',
    icon: <FileBarChart size={16} color="#4F46E5" />,
    component: onFocus => {
      const containerRef = React.useRef<any>(null)

      const handleTextareaFocus = React.useCallback(() => {
        if (containerRef.current) {
          // Use parent scroll functionality if available
          onFocus?.()
        }
      }, [onFocus])

      return (
        <View ref={containerRef}>
          <CodesTextArea onFocus={handleTextareaFocus} />
        </View>
      )
    },
  },
]

const FormContent: React.FC<{
  data: AccordionItemData[]
  handleCloseDrawer?: () => void
}> = ({ data, handleCloseDrawer }) => {
  const navigation = refNavigate
  const { formData, resetFormData, resetKey } = useFormData()
  const scrollIntoView = useScrollIntoView()

  const handleAccordionFocus = React.useCallback(() => {
    return scrollIntoView(null, {
      animated: true,
      align: 'center',
      insets: { top: 100, bottom: 100 },
    })
  }, [scrollIntoView])

  const handleSubmit = () => {
    const formattedFormData = formatFormDataForChat(formData)

    console.log({ formattedFormData })
    navigation('Chat', {
      initialMessage: {
        message: formattedFormData,
      },
    })

    handleCloseDrawer?.()
  }

  return (
    <>
      <View key={`form-card-${resetKey}`} className="p-0 m-">
        <View key={`guidelines-${resetKey}`} className="mb-3">
          <GuidelinesSelect />
        </View>
        <View key={`state-${resetKey}`} className="mb-3">
          <StateSelect />
        </View>
        <View key={`treatment-${resetKey}`} className="mb-3">
          <TreatmentSelect />
        </View>
        <View key={`accordion-${resetKey}`} className="mb-3">
          <AccordionCore
            type="multiple"
            data={data.map(item => ({
              ...item,
              component: () => item.component(handleAccordionFocus),
            }))}
          />
        </View>
      </View>
      <View className="flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4 mt-6">
        <Button
          className="flex-1 bg-blue-600  active:bg-blue-700 mb-3"
          onPress={handleSubmit}
        >
          <ButtonText className="text-white font-semibold">
            Submit Request
          </ButtonText>
        </Button>
        <Button
          className="flex-1 bg-gray-200 border-gray-200"
          onPress={resetFormData}
          variant="outline"
        >
          <ButtonText className="text-gray-800 font-semibold">
            Reset Form
          </ButtonText>
        </Button>
      </View>
      <Text className="text-center text-xs text-slate-500 mt-4">
        All fields are required to process your request
      </Text>
    </>
  )
}

export const FormCore: React.FC<{
  data: AccordionItemData[]
  handleCloseDrawer?: () => void
}> = ({ data, handleCloseDrawer }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <CustomScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-white p-3 rounded-2xl"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <FormContent data={data} handleCloseDrawer={handleCloseDrawer} />
      </CustomScrollView>
    </KeyboardAvoidingView>
  )
}

const QueryForm: React.FC = () => {
  const data = React.useMemo(() => accordionFormData, [accordionFormData])

  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <SafeContainer className="h-full">
        <Heading className="text-xl font-bold text-slate-900 mt-3 mb-1">
          Pre-Authorization Request
        </Heading>
        <Text className="text-slate-600 text-sm pr-10 mb-6">
          Please complete the following information to submit your
          pre-authorization request.
        </Text>
        <FormCore data={data} />
      </SafeContainer>
    </LinearGradientCore>
  )
}

export default QueryForm
