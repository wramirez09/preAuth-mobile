import { DrawerContext } from './context'
import * as React from 'react'

const DrawerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  return (
    <DrawerContext.Provider value={{ setIsDrawerOpen, isDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
