import { useFormData } from '@/app/views/context/FormData/context'
import { FormControl, Textarea, TextareaInput } from '@gluestack-ui/themed'

const HistoryTextArea = () => {
  const { setFormData } = useFormData()
  return (
    <FormControl size="md" className="mb-2">
      <Textarea className="w-full bg-gray-100">
        <TextareaInput
          placeholder="Your text goes here..."
          onChangeText={(text: string) => setFormData({ diagnosis: text })}
        />
      </Textarea>
    </FormControl>
  )
}

export default HistoryTextArea
