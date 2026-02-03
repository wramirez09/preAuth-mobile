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
import { Stethoscope } from 'lucide-react-native'
import * as React from 'react'
import SelectCore from '../SelectCore'

export const TreatmentSelect: React.FC<{
  showIcon?: boolean
  showLabel?: boolean
}> = ({ showIcon = true, showLabel = true }) => {
  const { formData, setFormData } = useFormData()
  const handleOnSelect = React.useCallback(
    (value: SelectOption) => {
      if (value) {
        setFormData({
          ...formData,
          treatment: value.value as string,
        })
      }
    },
    [formData, setFormData]
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
        options={ncdOptions}
        placeholder={formLabels.treatmentSelect.helperText}
        onChange={handleOnSelect}
        value={
          formData.treatment
            ? { label: formData.treatment, value: formData.treatment }
            : undefined
        }
      />
    </FormControl>
  )
}
