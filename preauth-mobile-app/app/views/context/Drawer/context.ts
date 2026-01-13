import * as React from 'react'
import { createContext } from 'react'

export type DrawerContextType = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDrawerOpen: boolean
}

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export const useDrawer = () => {
  const context = React.useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
