import { useFormData } from '@/app/views/context/FormData/context'
import { FormControl, Textarea, TextareaInput } from '@gluestack-ui/themed'
import React from 'react'

const DiagnosisTextArea: React.FC = () => {
  const { formData, setFormData } = useFormData()

  const handleChange = (text: string) => {
    setFormData({
      ...formData,
      diagnosis: text,
    })
  }

  return (
    <FormControl size="md" className="mb-2">
      <Textarea className="w-full bg-gray-100">
        <TextareaInput
          placeholder="medical diagnosis..."
          value={formData.diagnosis || ''}
          onChangeText={handleChange}
        />
      </Textarea>
    </FormControl>
  )
}

export default DiagnosisTextArea
