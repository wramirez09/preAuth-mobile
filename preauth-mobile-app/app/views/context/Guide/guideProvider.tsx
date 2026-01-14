import { FormdData, GuideContext } from './context'
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
    subTitle: "Choose the specific Guidelines you're requesting pre-authorization for",
  },
  {
    id: 'State',
    title: 'Choose State',
    subTitle: 'Choose a state where you are requesting pre-authorization',
  },
  {
    id: 'Treatment',
    title: 'Select Treatment',
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization",
  },
  {
    id: 'Diagnosis',
    title: 'Provide Diagnosis',
    subTitle: "Add diagnosis information you're requesting pre-authorization",
  },
  {
    id: 'Codes',
    title: 'Add CPT or HCPCS',
    subTitle: "Add specific CPT or HCPCS codes you're requesting pre-authorization for.",
  },
  {
    id: 'Review',
    title: 'Review',
    subTitle: 'Review your pre-authorization request',
  },
]

export const GuideProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGuideOpen, setIsGuideOpen] = React.useState(false)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [formData, setFormData] = React.useState<FormdData | undefined>(undefined)

  const values = React.useMemo(() => {
    return {
      isGuideOpen,
      setIsGuideOpen,
      currentStepIndex,
      setCurrentStepIndex,
      formData,
      setFormData,
    }
  }, [isGuideOpen, currentStepIndex, formData, setIsGuideOpen, setCurrentStepIndex, setFormData])

  return <GuideContext.Provider value={{ ...values }}>{children}</GuideContext.Provider>
}
