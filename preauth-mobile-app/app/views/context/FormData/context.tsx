import * as React from 'react'

export type FormData = {
  guidelines?: string
  treatment?: string
  state?: string
  diagnosis?: string
  medicalHistory?: string
  codes?: string
}

export type FormDataContext = {
  formData: FormData | undefined
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

export const FormDataContext = React.createContext<FormDataContext>({} as any)

export const useFormData = () => {
  const context = React.useContext(FormDataContext)
  if (context === undefined) {
    throw new Error('useGuide must be used within an GuideProvider')
  }
  return context
}
