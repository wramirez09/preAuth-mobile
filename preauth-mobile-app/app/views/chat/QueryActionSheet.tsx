import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabelText,
    Textarea,
    TextareaInput,
    Button,
    ButtonText,
    View
} from '@gluestack-ui/themed';
import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import SelectCore from '@/components/SelectCore';
import { formLabels } from '@/app/data/labels';
import { insuranceProvidersOptions, stateOptions } from '@/app/data/selectOptions';
import { ncdOptions } from '@/app/data/ncdOptions';

const QueryActionSheet: React.FC<{ setShowActionsheet?: React.Dispatch<boolean>, showActionsheet: boolean, handleClose?: () => void }> = ({ setShowActionsheet, showActionsheet, handleClose }) => {

    return <Actionsheet isOpen={showActionsheet} onClose={handleClose} >
        <ActionsheetBackdrop />
        <ActionsheetContent className='h-full'>
            <ActionsheetDragIndicatorWrapper><ActionsheetDragIndicator /></ActionsheetDragIndicatorWrapper>

            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.guidelinesSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={formLabels.guidelinesSelect.placeholder} options={insuranceProvidersOptions} />
                <FormControlHelper>
                    <FormControlHelperText>{formLabels.guidelinesSelect.helperText}</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.stateSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={formLabels.stateSelect.placeholder} options={stateOptions} />
                <FormControlHelper>
                    <FormControlHelperText>{formLabels.stateSelect.helperText}</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.treatmentSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={formLabels.treatmentSelect.placeholder} options={ncdOptions} />
                <FormControlHelper>
                    <FormControlHelperText>{formLabels.treatmentSelect.placeholder}</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className='mb-5 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.diagnosisTextArea.label}</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                >
                    <TextareaInput placeholder={formLabels.diagnosisTextArea.placeholder} />
                </Textarea>
            </FormControl>
            <FormControl className='mb-5 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.treatmentSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                >
                    <TextareaInput placeholder={formLabels.treatmentSelect.placeholder} />
                </Textarea>
            </FormControl>
            <FormControl className='mb-3 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.cptCodesTextArea.label}</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                >
                    <TextareaInput placeholder={formLabels.cptCodesTextArea.placeholder} />
                </Textarea>
            </FormControl>
            <View className='flex flex-row gap-2'>
                <Button size='sm' className='w-auto'><ButtonText>Submit</ButtonText></Button>
                <Button size='sm' variant='outline' onPress={handleClose} className='w-auto'><ButtonText>Cancel</ButtonText></Button>
            </View>

        </ActionsheetContent>
    </Actionsheet>


}

export default QueryActionSheet