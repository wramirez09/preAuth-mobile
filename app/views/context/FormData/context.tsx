import * as React from 'react'

export type FormData = {
  guidelines?: string
  treatment?: string
  state?: number | string
  diagnosis?: string
  medicalHistory?: string
  codes?: string
  messages?: []
}

type UpdateFormData = (newData: Partial<FormData>) => void

export type FormDataContext = {
  formData: FormData
  setFormData: UpdateFormData
  resetFormData: () => Promise<void>
  resetKey: number
  isSubmitDisabled: boolean
}

const defaultContext: FormDataContext = {
  formData: {},
  setFormData: () => {},
  resetFormData: async () => {},
  resetKey: 0,
  isSubmitDisabled: false,
}

export const FormDataContext =
  React.createContext<FormDataContext>(defaultContext)

export const useFormData = () => {
  const context = React.useContext(FormDataContext)
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider')
  }
  return context
}
