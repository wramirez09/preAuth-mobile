import { formLabels } from '@/app/data/labels'
import { ncdOptions } from '@/app/data/ncdOptions'
import { FormControl, FormControlLabel, FormControlLabelText, HStack } from '@gluestack-ui/themed'
import { Stethoscope } from 'lucide-react-native'
import SelectCore from '../SelectCore'

export const TreatmentSelect: React.FC<{ showIcon?: boolean; showLabel?: boolean }> = ({
  showIcon = true,
  showLabel = true,
}) => {
  return (
    <FormControl size="md" className="mb-6">
      <FormControlLabel className="mb-2">
        <HStack alignItems="center" space="xs">
          {showIcon && <Stethoscope size={16} color="#2563EB" />}
          {showLabel && (
            <FormControlLabelText className="text-sm font-semibold text-slate-900">
              {formLabels.treatmentSelect.label}
            </FormControlLabelText>
          )}
        </HStack>
      </FormControlLabel>

      <SelectCore options={ncdOptions} placeholder={formLabels.treatmentSelect.helperText} />
    </FormControl>
  )
}
