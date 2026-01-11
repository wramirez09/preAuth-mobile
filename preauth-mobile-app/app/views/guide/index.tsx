import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "./steps/StepOne";
import GuideWelcome from "./GuideWelcome";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";

export const GuideStack = createNativeStackNavigator({
    initialRouteName: "GuideWelcome",
    screens: {
        GuideWelcome: {
            screen: GuideWelcome,
            options: {
                title: "Guide"
            }
        },
        StepOne: {
            screen: StepOne,
            options: {
                title: 'Step 1: Diagnosis',
            },
        },
        StepTwo: {
            screen: StepTwo,
            options: {
                title: 'Step 2',
            },
        },
        StepThree: {
            screen: StepThree,
            options: {
                title: 'Step 3',
            },
        },
        StepFour: {
            screen: StepFour,
            options: {
                title: 'Step 4',
            },
        },

    },
});