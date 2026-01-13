import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GuideWelcome from './GuideWelcome'
import Guidelines from './steps/Guidelines'
import Treatment from './steps/Treatment'
import State from './steps/State'
import History from './steps/History'
import Diagnosis from './steps/Diagnosis'
import Review from './steps/Review'

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
    Diagnosis: {
      screen: Diagnosis,
      options: {
        title: 'Diagnosis',
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
    State: {
      screen: State,
      options: {
        title: 'State',
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
    Review: {
      screen: Review,
      options: {
        title: 'Review',
        headerShown: false,
      },
    },
  },
})
