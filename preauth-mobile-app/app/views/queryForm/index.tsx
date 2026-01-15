import AccordionCore from '@/components/accordionCore'
import { GuidelinesSelect } from '@/components/Form/GuidelinesSelect'
import { StateSelect } from '@/components/Form/StateSelect'
import { TreatmentSelect } from '@/components/Form/TreatmentSelect'
import LinearGradientCore from '@/components/LinearGradientCore'
import SafeContainer from '@/components/SafeContainer'

import {
  FormControl,
  Textarea,
  Heading,
  TextareaInput,
  ButtonText,
  Button,
  Text,
  View,
} from '@gluestack-ui/themed'
import { Activity, ClipboardList, FileBarChart } from 'lucide-react-native'
import * as React from 'react'
import { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import { useFormData } from '../context/FormData/context'
import DiagnosisTextArea from '@/components/Form/DiagnosisTextArea'
import HistoryTextArea from '@/components/Form/HistoryTextArea'
import CodesTextArea from '@/components/Form/CodesTextArea'

export type AccordionItemData = {
  label: string
  icon: ReactNode
  component: () => React.JSX.Element
}

export const accordionFormData: AccordionItemData[] = [
  {
    label: 'Diagnosis',
    icon: <Activity size={18} color="#2563eb" />,
    component: () => {
      return <DiagnosisTextArea />
    },
  },
  {
    label: 'Medical History',
    icon: <ClipboardList size={18} color="#2563eb" />,
    component: () => {
      return <HistoryTextArea />
    },
  },
  {
    label: 'CPT or HCPCS',
    icon: <FileBarChart size={18} color="#2563eb" />,
    component: () => {
      return <CodesTextArea />
    },
  },
]

export const FormCore: React.FC<{ data: AccordionItemData[] }> = ({ data }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-white p-3 rounded-2xl"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Card */}
      <View className="p-0 m-">
        {/* Guidelines */}
        <GuidelinesSelect />

        {/* State */}
        <StateSelect />

        {/* Treatment */}
        <TreatmentSelect />

        {/* Accordion */}
        <AccordionCore type="multiple" data={data} />
      </View>

      {/* Submit */}
      <Button className="mt-6 bg-blue-600 shadow-md active:bg-blue-700">
        <ButtonText className="text-white font-semibold">Submit Request</ButtonText>
      </Button>

      {/* Footer */}
      <Text className="text-center text-xs text-slate-500 mt-4">
        All fields are required to process your request
      </Text>
    </ScrollView>
  )
}

const QueryForm: React.FC = () => {
  const data = React.useMemo(() => accordionFormData, [])

  return (
    <LinearGradientCore
      className="h-full w-full rounded-none"
      colors={['#eff6ff', '#FFF', '#eef2ff']}
    >
      <SafeContainer className="h-full">
        <Heading className="text-2xl font-bold text-slate-900 mb-3">
          Pre-Authorization Request
        </Heading>
        <Text className="text-slate-600 mb-6 text-sm pr-10">
          Please complete the following information to submit your pre-authorization request.
        </Text>
        <FormCore data={data} />
      </SafeContainer>
    </LinearGradientCore>
  )
}

export default QueryForm
