import { refNavigate } from '@/app/utils/navigationRef'
import React from 'react'
import { GuideContext } from './context'
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
  step: number
}[] = [
  {
    id: 'Guidelines',
    title: 'Select Guidelines',
    subTitle:
      "Choose the specific Guidelines you're requesting pre-authorization for.",
    step: 1,
  },
  {
    id: 'State',
    title: 'Choose State',
    subTitle: 'Choose a state where you are requesting pre-authorization for.',
    step: 2,
  },
  {
    id: 'Treatment',
    title: 'Select Treatment',
    subTitle:
      "Choose the specific treatment or procedure you're requesting pre-authorization for. Only one is required",
    step: 3,
  },
  {
    id: 'Diagnosis',
    title: 'Provide Diagnosis',
    subTitle:
      "Add diagnosis information you're requesting pre-authorization for.",
    step: 4,
  },
  {
    id: 'History',
    title: 'Medical History',
    subTitle:
      "Add medical history information you're requesting pre-authorization for,",
    step: 5,
  },
  // {
  //   id: 'Codes',
  //   title: 'Add CPT or HCPCS',
  //   subTitle:
  //     "Add specific CPT or HCPCS codes you're requesting pre-authorization for.",
  //   step: 6,
  // },
  {
    id: 'Review',
    title: 'Review Your Information',
    subTitle:
      'Please review all the information below before submitting your pre-authorization request for.',
    step: 6,
  },
]

export const GuideProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [isGuideOpen, setIsGuideOpen] = React.useState(false)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(1)
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(
    new Set()
  )
  const [isEditingFromReview, setIsEditingFromReview] = React.useState(false)

  const goToStep = React.useCallback((step: number) => {
    const targetIndex = step - 1
    if (targetIndex >= 0 && targetIndex < GUIDE_STEPS.length) {
      setIsTransitioning(true)
      setCurrentStepIndex(targetIndex)
      const targetStep = GUIDE_STEPS[targetIndex]
      refNavigate(targetStep.id as any)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }, [])

  const goToNextStep = React.useCallback(() => {
    const nextStepIndex = currentStepIndex + 1
    if (nextStepIndex < GUIDE_STEPS.length) {
      // Update the current step index first
      setCurrentStepIndex(nextStepIndex)
      // Mark current step as complete
      setCompletedSteps(prev => new Set([...prev, currentStepIndex]))
      // Navigate to the next step (using 1-based step number)
      const nextStep = nextStepIndex + 1
      goToStep(nextStep)
    }
  }, [currentStepIndex, goToStep])

  const goToPrevStep = React.useCallback(() => {
    const prevStepIndex = currentStepIndex - 1
    if (prevStepIndex >= 0) {
      goToStep(prevStepIndex + 1) // Convert to 1-based step number
    }
  }, [currentStepIndex, goToStep])

  const markStepComplete = React.useCallback((step: number) => {
    setCompletedSteps(prev => new Set([...prev, step - 1]))
  }, [])

  const values = React.useMemo(
    () => ({
      isGuideOpen,
      setIsGuideOpen,
      currentStepIndex,
      setCurrentStepIndex,
      isTransitioning,
      setIsTransitioning,
      goToStep,
      goToNextStep,
      goToPrevStep,
      markStepComplete,
      isEditingFromReview,
      setIsEditingFromReview,
      currentStep: GUIDE_STEPS[currentStepIndex],
      completedSteps,
      totalSteps: GUIDE_STEPS.length,
    }),
    [
      isGuideOpen,
      currentStepIndex,
      isTransitioning,
      goToStep,
      goToNextStep,
      goToPrevStep,
      markStepComplete,
      completedSteps,
      isEditingFromReview,
    ]
  )

  return (
    <GuideContext.Provider value={{ ...values }}>
      {children}
    </GuideContext.Provider>
  )
}
