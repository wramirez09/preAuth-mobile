import { formLabels } from "@/app/data/labels";
import { ncdOptions } from "@/app/data/ncdOptions";
import { insuranceProvidersOptions, stateOptions } from "@/app/data/selectOptions";
import AccordionCore from "@/components/accordionCore";
import LinearGradientCore from "@/components/LinearGradientCore";
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
    Text,
    View,
    HStack

} from '@gluestack-ui/themed';
import { Activity, ClipboardList, FileBarChart, FileText, MapPin, MessageSquare, Stethoscope } from "lucide-react-native";
import * as React from "react";
import { ReactNode } from "react";
import { ScrollView } from "react-native";

export type AccordionItemData = {
    label: string;
    icon: ReactNode,
    component: ReactNode;
};

const formData: AccordionItemData[] = [
    {
        label: 'Diagnosis',
        icon: <Activity size={18} color="#2563eb" />,
        component: (
            <FormControl size="md" className="mb-2">
                <Textarea className="w-full bg-zinc-100">
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
        ),
    },
    {
        label: 'Medical History',
        icon: <ClipboardList size={18} color="#2563eb" />,
        component: (
            <FormControl size="md" className="mb-2">
                <Textarea className="w-full bg-zinc-100">
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
        ),
    },
    {
        label: 'CPT Code(s)',
        icon: <FileBarChart size={18} color="#2563eb" />,
        component: (
            <FormControl size="md" className="mb-2">
                <Textarea className="w-full bg-zinc-100">
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
        ),
    },
    {
        label: 'Additional Chat Prompt Context',
        icon: <MessageSquare size={18} color="#2563eb" />,
        component: (
            <FormControl size="md" className="mb-2">
                <Textarea className="w-full bg-zinc-100">
                    <TextareaInput placeholder="Your text goes here..." />
                </Textarea>
            </FormControl>
        ),
    },
];

const QueryForm: React.FC = () => {
    const data = React.useMemo(() => formData, []);

    return (
        <LinearGradientCore className="h-full w-full rounded-none" colors={["#eff6ff", "#FFF", "#eef2ff"]}>
            <SafeContainer className="h-full">
                <Heading className="text-2xl font-bold text-slate-900 mb-3">
                    Pre-Authorization Request
                </Heading>
                <Text className="text-slate-600 mb-6 text-sm pr-10">
                    Please complete the following information to submit your
                    pre-authorization request.
                </Text>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    className="flex-1 bg-white p-3 rounded-2xl"
                    contentContainerStyle={{ paddingBottom: 32 }}
                >

                    {/* Card */}
                    <View className="p-0 m-">
                        {/* Guidelines */}
                        <FormControl size="md" className="mb-5">
                            <FormControlLabel className="mb-2">
                                <HStack alignItems="center" space="xs">
                                    <FileText size={16} color="#2563EB" />
                                    <FormControlLabelText className="text-sm font-semibold text-slate-900">
                                        {formLabels.guidelinesSelect.label}
                                    </FormControlLabelText>
                                </HStack>
                            </FormControlLabel>

                            <SelectCore
                                options={insuranceProvidersOptions}
                                placeholder="Select guidelines"
                            />

                            <FormControlHelper>
                                <FormControlHelperText className="text-xs text-slate-500 mt-1">
                                    {formLabels.guidelinesSelect.helperText}
                                </FormControlHelperText>
                            </FormControlHelper>
                        </FormControl>

                        {/* State */}
                        <FormControl size="md" className="mb-5">
                            <FormControlLabel className="mb-2">
                                <HStack alignItems="center" space="xs">
                                    <MapPin size={16} color="#2563EB" />
                                    <FormControlLabelText className="text-sm font-semibold text-slate-900">
                                        {formLabels.stateSelect.label}
                                    </FormControlLabelText>
                                </HStack>
                            </FormControlLabel>

                            <SelectCore
                                options={stateOptions}
                                placeholder={formLabels.stateSelect.placeholder}
                            />

                            <FormControlHelper>
                                <FormControlHelperText className="text-xs text-slate-500 mt-1">
                                    {formLabels.stateSelect.helperText}
                                </FormControlHelperText>
                            </FormControlHelper>
                        </FormControl>

                        {/* Treatment */}
                        <FormControl size="md" className="mb-6">
                            <FormControlLabel className="mb-2">
                                <HStack alignItems="center" space="xs">
                                    <Stethoscope size={16} color="#2563EB" />
                                    <FormControlLabelText className="text-sm font-semibold text-slate-900">
                                        {formLabels.treatmentSelect.label}
                                    </FormControlLabelText>
                                </HStack>
                            </FormControlLabel>

                            <SelectCore
                                options={ncdOptions}
                                placeholder={formLabels.treatmentSelect.placeholder}
                            />

                            <FormControlHelper>
                                <FormControlHelperText className="text-xs text-slate-500 mt-1">
                                    {formLabels.treatmentSelect.helperText}
                                </FormControlHelperText>
                            </FormControlHelper>
                        </FormControl>

                        {/* Accordion */}
                        <AccordionCore type="multiple" data={data} />
                    </View>

                    {/* Submit */}
                    <Button className="mt-6 bg-blue-600 shadow-md active:bg-blue-700">
                        <ButtonText className="text-white font-semibold">
                            Submit Request
                        </ButtonText>
                    </Button>

                    {/* Footer */}
                    <Text className="text-center text-xs text-slate-500 mt-4">
                        All fields are required to process your request
                    </Text>

                </ScrollView>

            </SafeContainer>
        </LinearGradientCore>
    );
};


export default QueryForm