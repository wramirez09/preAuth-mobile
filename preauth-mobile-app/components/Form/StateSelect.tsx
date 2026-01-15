import React from 'react'
import SelectCore from '../SelectCore'
import { FormControl, FormControlLabel, FormControlLabelText, HStack } from '@gluestack-ui/themed'
import { MapPin } from 'lucide-react-native'
import { formLabels } from '@/app/data/labels'
import { SelectOption, stateOptions } from '@/app/data/selectOptions'
import { useFormData } from '@/app/views/context/FormData/context'

export const StateSelect: React.FC<{ showIcon?: boolean; showLabel?: boolean }> = ({
  showIcon = true,
  showLabel = true,
}) => {
  const { formData, setFormData } = useFormData()
  const handleOnSelect = React.useCallback(
    (value: SelectOption) => {
      if (value) {
        setFormData({
          ...formData,
          state: value.label,
        })
      }
    },
    [formData, setFormData]
  )
  return (
    <FormControl size="md" className="mb-5">
      <FormControlLabel className="mb-2">
        <HStack alignItems="center" space="xs">
          {showIcon && <MapPin size={16} color="#2563EB" />}
          {showLabel && (
            <FormControlLabelText className="text-sm font-semibold text-slate-900">
              {formLabels.stateSelect.label}
            </FormControlLabelText>
          )}
        </HStack>
      </FormControlLabel>

      <SelectCore
        options={stateOptions}
        placeholder={formLabels.stateSelect.helperText}
        onChange={handleOnSelect}
      />
    </FormControl>
  )
}
