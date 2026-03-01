import * as React from 'react'

export type GuideContext = {
  isGuideOpen: boolean
  setIsGuideOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentStepIndex: number
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
  isTransitioning: boolean
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>
  isEditingFromReview: boolean
  setIsEditingFromReview: React.Dispatch<React.SetStateAction<boolean>>
  goToStep: (step: number) => void
  goToNextStep: () => void
  goToPrevStep: () => void
  markStepComplete: (step: number) => void
  currentStep: any
  completedSteps: Set<number>
  totalSteps: number
}

export const GuideContext = React.createContext<GuideContext>({} as any)

export const useGuide = () => {
  const context = React.useContext(GuideContext)
  if (context === undefined) {
    throw new Error('useGuide must be used within an GuideProvider')
  }
  return context
}
