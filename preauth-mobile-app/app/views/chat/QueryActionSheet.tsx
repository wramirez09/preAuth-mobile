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

const QueryActionSheet: React.FC<{ setShowActionsheet?: React.Dispatch<boolean>, showActionsheet: boolean, handleClose?: () => void }> = ({ setShowActionsheet, showActionsheet, handleClose }) => {

    return <Actionsheet isOpen={showActionsheet} onClose={handleClose} >
        <ActionsheetBackdrop />
        <ActionsheetContent className='h-full'>
            <ActionsheetDragIndicatorWrapper><ActionsheetDragIndicator /></ActionsheetDragIndicatorWrapper>

            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>Guidelines</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={'select guideline'} options={[{ label: "test", value: "test" }]} />
                <FormControlHelper>
                    <FormControlHelperText>Select a Guideline</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>State</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={'select guidelines'} options={[{ label: "IL", value: "il" }]} />
                <FormControlHelper>
                    <FormControlHelperText>Select a state</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className="mb-5 w-full">
                <FormControlLabel>
                    <FormControlLabelText>Treatment</FormControlLabelText>
                </FormControlLabel>
                <SelectCore placeholder={'select a treatment'} options={[{ label: "IL", value: "il" }]} />
                <FormControlHelper>
                    <FormControlHelperText>Select a state</FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl className='mb-5 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>Diagnosis</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    className=""
                >
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
            <FormControl className='mb-5 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>Medical History</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    className=""
                >
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
            <FormControl className='mb-3 w-full'>
                <FormControlLabel>
                    <FormControlLabelText>Addtional CPT code(s)</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                    size="sm"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    className=""
                >
                    <TextareaInput placeholder="Your text goes here..." />
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