import { View, KeyboardAvoidingView, Platform } from 'react-native';
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { Heading, Text } from '@gluestack-ui/themed';
import { accordionFormData, FormCore } from '../queryForm'
import { useSheetHeight } from '@/hooks/useFormSheet';
import FormDataProvider from '../context/FormData/formDataProvider'


const QueryActionSheet: React.FC<{
    showActionsheet: boolean;
    handleClose?: () => void;
}> = ({ showActionsheet, handleClose }) => {
    const { maxHeight, keyboardHeight, keyboardOpen } = useSheetHeight();

    return (
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />

        <ActionsheetContent
          style={{
            maxHeight,
            flex: 1,
            paddingBottom: Platform.OS === 'android' && keyboardOpen ? keyboardHeight : 0,
          }}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
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
              <FormCore data={accordionFormData} />
            </FormDataProvider>
          </KeyboardAvoidingView>
        </ActionsheetContent>
      </Actionsheet>
    )
};

export default QueryActionSheet;
