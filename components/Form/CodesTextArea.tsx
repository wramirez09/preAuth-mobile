import { useFormData } from '@/app/views/context/FormData/context'
import { FormControl, Textarea, TextareaInput } from '@gluestack-ui/themed'
import React from 'react'
import { View } from 'react-native'
import { useScrollIntoView } from 'react-native-scroll-into-view'

interface CodesTextAreaProps {
  onFocus?: () => void
}

const CodesTextArea: React.FC<CodesTextAreaProps> = ({ onFocus }) => {
  const { formData, setFormData } = useFormData()
  const containerRef = React.useRef<View>(null)
  const scrollIntoView = useScrollIntoView()

  const handleChange = React.useCallback(
    (text: string) => {
      setFormData({
        ...formData,
        codes: text,
      })
    },
    [formData, setFormData]
  )

  const handleFocus = React.useCallback(() => {
    scrollIntoView(containerRef.current, {
      animated: true,
      align: 'top',
      insets: { top: 16, bottom: 320 },
    })
    onFocus?.()
  }, [scrollIntoView, onFocus])

  return (
    <View ref={containerRef}>
      <FormControl size="md" className="mb-2">
        <Textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg"
          aria-label="CPT or HCPCS codes text input"
          accessibilityLabel="Enter CPT or HCPCS codes"
        >
          <TextareaInput
            placeholder="Enter CPT or HCPCS codes..."
            value={formData.codes || ''}
            onChangeText={handleChange}
            onFocus={handleFocus}
            multiline={true}
            numberOfLines={4}
            maxLength={1000}
            returnKeyType="done"
            blurOnSubmit={true}
          />
        </Textarea>
      </FormControl>
    </View>
  )
}

export default CodesTextArea
