import { GuideContext } from './context'
import React from 'react'
export type GuideStepId =
  | 'welcome'
  | 'Guidelines'
  | 'Treatment'
  | 'Diagnosis'
  | 'History'
  | 'State'
  | 'Codes'
  | 'Review'

export const GUIDE_STEPS: {
  id: GuideStepId
  title: string
  subTitle: string
}[] = [
  {
    id: 'Guidelines',
    title: 'Select Guidelines',
    subTitle: "Choose the specific Guidelines you're requesting pre-authorization for.",
  },
  {
    id: 'State',
    title: 'Choose State',
    subTitle: 'Choose a state where you are requesting pre-authorization for.',
  },
  {
    id: 'Treatment',
    title: 'Select Treatment',
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization for.",
  },
  {
    id: 'Diagnosis',
    title: 'Provide Diagnosis',
    subTitle: "Add diagnosis information you're requesting pre-authorization for.",
  },
  {
    id: 'History',
    title: 'Meical History',
    subTitle: "Add medical history information you're requesting pre-authorization for,",
  },
  {
    id: 'Codes',
    title: 'Add CPT or HCPCS',
    subTitle: "Add specific CPT or HCPCS codes you're requesting pre-authorization for.",
  },
  {
    id: 'Review',
    title: 'Review Your Information',
    subTitle:
      'Please review all the information below before submitting your pre-authorization request for.',
  },
]

export const GuideProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const [isGuideOpen, setIsGuideOpen] = React.useState(false)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

  const values = React.useMemo(() => {
    return {
      isGuideOpen,
      setIsGuideOpen,
      currentStepIndex,
      setCurrentStepIndex,
    }
  }, [isGuideOpen, currentStepIndex, setIsGuideOpen, setCurrentStepIndex])

  return <GuideContext.Provider value={{ ...values }}>{children}</GuideContext.Provider>
}
