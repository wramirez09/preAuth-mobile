import { formLabels } from '@/app/data/labels'
import { insuranceProvidersOptions } from '@/app/data/selectOptions'
import { FileText } from 'lucide-react-native'
import SelectCore from '../SelectCore'
import { FormControl, FormControlLabel, FormControlLabelText, HStack } from '@gluestack-ui/themed'

export const GuidelinesSelect: React.FC<{ showIcon?: boolean; showLable?: boolean }> = ({
  showIcon = true,
  showLable = true,
}) => {
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
        options={insuranceProvidersOptions}
        placeholder={formLabels.guidelinesSelect.helperText}
      />
    </FormControl>
  )
}
