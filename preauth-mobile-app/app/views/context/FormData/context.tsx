import * as React from 'react'

export type FormData = {
  guidelines?: string
  treatment?: string
  state?: string
  diagnosis?: string
  medicalHistory?: string
  codes?: string
}

type UpdateFormData = (newData: Partial<FormData>) => void

export type FormDataContext = {
  formData: FormData
  setFormData: UpdateFormData
}

const defaultContext: FormDataContext = {
  formData: {},
  setFormData: () => {},
}

export const FormDataContext = React.createContext<FormDataContext>(defaultContext)

export const useFormData = () => {
  const context = React.useContext(FormDataContext)
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider')
  }
  return context
}
