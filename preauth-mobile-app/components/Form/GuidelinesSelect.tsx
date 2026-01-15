import { formLabels } from '@/app/data/labels'
import { insuranceProvidersOptions, SelectOption } from '@/app/data/selectOptions'
import { FileText } from 'lucide-react-native'
import SelectCore from '../SelectCore'
import { FormControl, FormControlLabel, FormControlLabelText, HStack } from '@gluestack-ui/themed'
import React from 'react'
import { useFormData } from '@/app/views/context/FormData/context'

export const GuidelinesSelect: React.FC<{ showIcon?: boolean; showLable?: boolean }> = ({
  showIcon = true,
  showLable = true,
}) => {
  const { setFormData } = useFormData()
  const handleOnSelect = React.useCallback((value: SelectOption) => {
    if (value)
      setFormData((prev) => {
        return {
          ...prev,
          guidelines: value.value,
        }
      })
  }, [])
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
      />
    </FormControl>
  )
}
