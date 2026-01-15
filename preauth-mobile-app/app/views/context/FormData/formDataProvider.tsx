import React from 'react'
import { FormDataContext } from './context'
import { FormData } from './context'

const FormDataProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [formData, setFormData] = React.useState<FormData | undefined>()

  React.useEffect(() => {
    console.log('updated form data', { formData })
  }, [formData])

  return (
    <FormDataContext.Provider value={{ setFormData, formData }}>
      {children}
    </FormDataContext.Provider>
  )
}

export default FormDataProvider
