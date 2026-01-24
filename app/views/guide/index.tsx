import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GuideWelcome from './GuideWelcome'
import Codes from './steps/Codes'
import Diagnosis from './steps/Diagnosis'
import Guidelines from './steps/Guidelines'
import History from './steps/History'
import Review from './steps/Review'
import State from './steps/State'
import Treatment from './steps/Treatment'

export const GuideStack = createNativeStackNavigator({
  initialRouteName: 'GuideWelcome',
  options: {
    headerShown: false,
  },

  screens: {
    GuideWelcome: {
      screen: GuideWelcome,
      options: {
        title: 'Guide',
        headerShown: false,
        headerBackButton: {
          visible: false,
        },
      },
    },

    Guidelines: {
      screen: Guidelines,
      options: {
        title: 'Guidelines',
        headerShown: false,
      },
    },
    State: {
      screen: State,
      options: {
        title: 'State',
        headerShown: false,
      },
    },
    Treatment: {
      screen: Treatment,
      options: {
        title: 'Treatment',
        headerShown: false,
      },
    },
    Diagnosis: {
      screen: Diagnosis,
      options: {
        title: 'Diagnosis',
        headerShown: false,
      },
    },
    History: {
      screen: History,
      options: {
        title: 'History',
        headerShown: false,
      },
    },
    Codes: {
      screen: Codes,
      options: {
        title: 'Codes',
        headerShown: false,
      },
    },
    Review: {
      screen: Review,
      options: {
        title: 'Review',
        headerShown: false,
      },
    },
  },
})
