import { FormdData, GuideContext } from './context'
import React from 'react'
export type GuideStepId =
  | 'welcome'
  | 'Guidelines'
  | 'Treatment'
  | 'Diagnosis'
  | 'History'
  | 'State'
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
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization",
  },
  {
    id: 'Treatment',
    title: 'Select Treatment',
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization",
  },
  {
    id: 'Diagnosis',
    title: 'Provide Diagnosis',
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization",
  },

  {
    id: 'Review',
    title: 'Review',
    subTitle: "Choose the specific treatment or procedure you're requesting pre-authorization",
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
