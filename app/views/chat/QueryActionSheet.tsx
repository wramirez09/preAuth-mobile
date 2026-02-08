import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet'
import { useSheetHeight } from '@/hooks/useFormSheet'
import { Heading, KeyboardAvoidingView, Text, View } from '@gluestack-ui/themed'
import React from 'react'
import { Platform } from 'react-native'
import FormDataProvider from '../context/FormData/formDataProvider'
import { accordionFormData, FormCore } from '../queryForm'

interface QueryActionSheetProps {
  showActionsheet: boolean
  handleClose?: () => void
}

const QueryActionSheet: React.FC<QueryActionSheetProps> = ({
  showActionsheet,
  handleClose,
}) => {
  const { maxHeight, keyboardHeight, keyboardOpen } = useSheetHeight()

  return (
    <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
      <ActionsheetBackdrop />

      <ActionsheetContent
        style={{
          maxHeight,
          flex: 1,
          paddingBottom:
            Platform.OS === 'android' && keyboardOpen ? keyboardHeight : 0,
        }}
      >
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <KeyboardAvoidingView>
          {/* Header */}
          <View className="px-4 pb-2">
            <Heading className="text-2xl font-bold text-slate-900 mb-2">
              Pre-Authorization Request
            </Heading>
            <Text className="text-slate-600 text-sm">
              Please complete the following information to submit your request.
            </Text>
          </View>

          {/* ScrollView owns height */}
          <FormDataProvider>
            <FormCore
              data={accordionFormData}
              handleCloseDrawer={handleClose}
            />
          </FormDataProvider>
        </KeyboardAvoidingView>
      </ActionsheetContent>
    </Actionsheet>
  )
}

export default QueryActionSheet
