import * as React from 'react'


export type GuideContext = {
  isGuideOpen: boolean
  setIsGuideOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentStepIndex: number
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
}

export const GuideContext = React.createContext<GuideContext>({} as any)

export const useGuide = () => {
  const context = React.useContext(GuideContext)
  if (context === undefined) {
    throw new Error('useGuide must be used within an GuideProvider')
  }
  return context
}
