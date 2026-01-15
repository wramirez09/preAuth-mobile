import { useFormData } from '@/app/views/context/FormData/context'
import { FormControl, Textarea, TextareaInput } from '@gluestack-ui/themed'
import React from 'react'

const HistoryTextArea: React.FC = () => {
  const { formData, setFormData } = useFormData()

  const handleChange = (text: string) => {
    setFormData({
      ...formData,
      medicalHistory: text,
    })
  }

  return (
    <FormControl size="md" className="mb-2">
      <Textarea className="w-full bg-gray-100">
        <TextareaInput
          placeholder="medical history..."
          value={formData.medicalHistory || ''}
          onChangeText={handleChange}
        />
      </Textarea>
    </FormControl>
  )
}

export default HistoryTextArea
