import { formLabels } from '@/app/data/labels'
import {
  insuranceProvidersOptions,
  SelectOption,
} from '@/app/data/selectOptions'
import { useFormData } from '@/app/views/context/FormData/context'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
} from '@gluestack-ui/themed'
import { FileText } from 'lucide-react-native'
import React from 'react'
import SelectCore from '../SelectCore'

export const GuidelinesSelect: React.FC<{
  showIcon?: boolean
  showLable?: boolean
}> = ({ showIcon = true, showLable = true }) => {
  const { formData, setFormData } = useFormData()
  const handleOnSelect = React.useCallback(
    (value: SelectOption) => {
      if (value) {
        setFormData({
          ...formData,
          guidelines: value.value as string,
        })
      }
    },
    [formData, setFormData]
  )
  return (
    <FormControl size="md" className="mb-5">
      <FormControlLabel className="mb-2">
        <HStack alignItems="center" space="xs">
          {showIcon && <FileText size={16} color="#2563EB" />}
          {showLable && (
            <FormControlLabelText className="text-sm font-semibold text-slate-900">
              {formLabels.guidelinesSelect.label}
            </FormControlLabelText>
          )}
        </HStack>
      </FormControlLabel>

      <SelectCore
        onChange={handleOnSelect}
        options={insuranceProvidersOptions}
        placeholder={formLabels.guidelinesSelect.helperText}
        value={
          formData.guidelines
            ? { label: formData.guidelines, value: formData.guidelines }
            : undefined
        }
      />
    </FormControl>
  )
}
