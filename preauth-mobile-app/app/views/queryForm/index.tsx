import AccordionCore from "@/components/accordionCore";
import SafeContainer from "@/components/SafeContainer"
import SelectCore from "@/components/SelectCore";
import { ThemedText } from "@/components/themed-text";
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



const FormCore: React.FC = () => {
    const data = React.useMemo(() => formData, []);

    return <SafeContainer>
        <ScrollView keyboardShouldPersistTaps="always">
            <Heading className="mb-1">Form</Heading>
            <Text className="mb-5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Text>

            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>Guidelines</FormControlLabelText>
                </FormControlLabel>
                <SelectCore options={[{ label: "medicare", value: "medicare" }]} placeholder="medicare" />
                <FormControlHelper>
                    <FormControlHelperText>
                        Select guidelines
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>State</FormControlLabelText>
                </FormControlLabel>
                <SelectCore options={[{ label: "medicare", value: "medicare" }]} placeholder="medicare" />
                <FormControlHelper>
                    <FormControlHelperText>
                        Select state
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>
            <FormControl
                size="md"
                className="mb-5"
            >
                <FormControlLabel>
                    <FormControlLabelText>Treatment</FormControlLabelText>
                </FormControlLabel>
                <SelectCore options={[{ label: "medicare", value: "medicare" }]} placeholder="medicare" />
                <FormControlHelper>
                    <FormControlHelperText>
                        Select Treatment
                    </FormControlHelperText>
                </FormControlHelper>
            </FormControl>

            <AccordionCore type="multiple" data={data} />


            <Button className="mt-5"><ButtonText>Submit</ButtonText></Button>

        </ScrollView>
    </SafeContainer>


}
const QueryForm: React.FC = () => {

    return <FormCore />
}



export default QueryForm