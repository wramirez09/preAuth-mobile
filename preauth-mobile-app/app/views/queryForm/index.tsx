import { formLabels } from "@/app/data/labels";
import { ncdOptions } from "@/app/data/ncdOptions";
import { insuranceProvidersOptions, stateOptions } from "@/app/data/selectOptions";
import AccordionCore from "@/components/accordionCore";
import SafeContainer from "@/components/SafeContainer"
import SelectCore from "@/components/SelectCore";
import {
    FormControl,
    FormControlLabel,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabelText,
    Textarea,
    Heading,
    TextareaInput,
    ButtonText,
    Button,
    Text

} from '@gluestack-ui/themed';
import * as React from "react";
import { ReactNode } from "react";
import { ScrollView } from "react-native";

export type AccordionItemData = {
    label: string;
    component: ReactNode;
};

const formData: AccordionItemData[] = [{
    label: "Diagnosis",
    component: <FormControl
        size="md"
        className="mb-5"
    >
        <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            className="w-full bg-zinc-100"
        >
            <TextareaInput placeholder="Your text goes here..." />
        </Textarea>

    </FormControl>,
},
{
    label: "Medical History",
    component: <FormControl
        size="md"
        className="mb-5"
    >
        <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            className="w-full bg-zinc-100"
        >
            <TextareaInput placeholder="Your text goes here..." />
        </Textarea>
    </FormControl>,
},
{
    label: "CPT Code(s)",
    component: <FormControl
        size="md"
        className="mb-5"
    >

        <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            className="w-full bg-zinc-100"
        >
            <TextareaInput placeholder="Your text goes here..." />
        </Textarea>

    </FormControl>,
}, {
    label: "Additional Chat Prompt Context",
    component: <FormControl
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
        className="mb-5"
    >
        <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            className="w-full bg-zinc-100"
        >
            <TextareaInput placeholder="Your text goes here..." />
        </Textarea>
    </FormControl>,
}]

const QueryForm: React.FC = () => {
    const data = React.useMemo(() => formData, []);

    return <SafeContainer>
        <ScrollView keyboardShouldPersistTaps="always" className="p-5">
            <Heading className="mb-1">Form</Heading>
            <Text className="mb-5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Text>

            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.guidelinesSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <SelectCore options={insuranceProvidersOptions} placeholder="medicare" />
                <FormControlHelper>
                    <FormControlHelperText>
                        {formLabels.guidelinesSelect.helperText}
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.stateSelect.label}</FormControlLabelText>
                </FormControlLabel>

                <SelectCore options={stateOptions} placeholder={formLabels.stateSelect.placeholder} />

                <FormControlHelper>
                    <FormControlHelperText>
                        {formLabels.stateSelect.helperText}
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>{formLabels.treatmentSelect.label}</FormControlLabelText>
                </FormControlLabel>
                <SelectCore options={ncdOptions} placeholder={formLabels.treatmentSelect.placeholder} />
                <FormControlHelper>
                    <FormControlHelperText>
                        {formLabels.treatmentSelect.helperText}
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>

            <AccordionCore type="multiple" data={data} />


            <Button className="mt-5"><ButtonText>Submit</ButtonText></Button>

        </ScrollView>
    </SafeContainer>
}

export default QueryForm