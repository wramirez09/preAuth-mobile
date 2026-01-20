
import { useFormData } from '@/app/views/context/FormData/context'
import { FormControl, Textarea, TextareaInput } from '@gluestack-ui/themed'
import React from 'react'

const CodesTextArea: React.FC = () => {
  const { formData, setFormData } = useFormData()



  const handleChange = (text: string) => {
    setFormData({
      ...formData,
      codes: text,
    })
  }

  return (
    <FormControl size="md" className="mb-2">
      <Textarea className="w-full bg-gray-100">
        <TextareaInput
          placeholder="Your text goes here..."
          value={formData.codes || ''}
          onChangeText={handleChange}
        />
      </Textarea>
    </FormControl>
  )
}

export default CodesTextArea