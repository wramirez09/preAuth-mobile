import { formLabels } from '@/app/data/labels'
import { ncdOptions } from '@/app/data/ncdOptions'
import { SelectOption } from '@/app/data/selectOptions'
import { useFormData } from '@/app/views/context/FormData/context'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
} from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stethoscope } from 'lucide-react-native'
import * as React from 'react'
import SelectCore from '../SelectCore'

const CUSTOM_TREATMENTS_KEY = '@customTreatments'

export const TreatmentSelect: React.FC<{
  showIcon?: boolean
  showLabel?: boolean
}> = ({ showIcon = true, showLabel = true }) => {
  const { formData, setFormData } = useFormData()
  const [customOptions, setCustomOptions] = React.useState<SelectOption[]>([])

  React.useEffect(() => {
    AsyncStorage.getItem(CUSTOM_TREATMENTS_KEY).then(saved => {
      if (saved) setCustomOptions(JSON.parse(saved))
    })
  }, [])

  const options = React.useMemo(
    () => [...ncdOptions, ...customOptions],
    [customOptions]
  )

  const handleOnSelect = React.useCallback(
    (value: SelectOption) => {
      if (value) {
        setFormData({ ...formData, treatment: value.value as string })
      }
    },
    [formData, setFormData]
  )

  const handleCreateOption = React.useCallback(
    (inputValue: string) => {
      const newOption: SelectOption = { label: inputValue, value: inputValue }
      const updated = [...customOptions, newOption]
      setCustomOptions(updated)
      AsyncStorage.setItem(CUSTOM_TREATMENTS_KEY, JSON.stringify(updated))
      setFormData({ ...formData, treatment: inputValue })
    },
    [customOptions, formData, setFormData]
  )

  return (
    <FormControl size="md" className="mb-6">
      <FormControlLabel className="mb-2">
        <HStack alignItems="center" space="xs">
          {showIcon && <Stethoscope size={16} color="#7C3AED" />}
          {showLabel && (
            <FormControlLabelText className="text-sm font-semibold text-slate-900">
              {formLabels.treatmentSelect.label}
            </FormControlLabelText>
          )}
        </HStack>
      </FormControlLabel>

      <SelectCore
        options={options}
        placeholder={formLabels.treatmentSelect.helperText}
        onChange={handleOnSelect}
        value={
          formData.treatment
            ? { label: formData.treatment, value: formData.treatment }
            : undefined
        }
        creatable
        onCreateOption={handleCreateOption}
      />
    </FormControl>
  )
}
