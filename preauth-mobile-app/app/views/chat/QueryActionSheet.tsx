// import {
//     FormControl,
//     FormControlLabel,
//     FormControlError,
//     FormControlErrorText,
//     FormControlErrorIcon,
//     FormControlHelper,
//     FormControlHelperText,
//     FormControlLabelText,
//     Input, InputField,
//     Text,
//     Heading,
//     Button, ButtonText
// } from '@gluestack-ui/themed';
import React from 'react';

import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from '@/components/ui/actionsheet';


const QueryActionSheet: React.FC<{ setShowActionsheet?: React.Dispatch<boolean>, showActionsheet: boolean, handleClose?: () => void }> = ({ setShowActionsheet, showActionsheet, handleClose }) => {

    return <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Edit Message</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Mark Unread</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Remind Me</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem isDisabled onPress={handleClose}>
                <ActionsheetItemText>Delete</ActionsheetItemText>
            </ActionsheetItem>
        </ActionsheetContent>
    </Actionsheet>


}

export default QueryActionSheet