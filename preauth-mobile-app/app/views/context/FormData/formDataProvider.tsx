import React from 'react'
import { FormDataContext } from './context'
import { FormData } from './context'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Key for AsyncStorage
const FORM_DATA_STORAGE_KEY = '@formData'

const FormDataProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [formData, setFormData] = React.useState<FormData>({})
  const [isInitialized, setIsInitialized] = React.useState(false)

  // Load saved form data on initial render
  React.useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(FORM_DATA_STORAGE_KEY)
        if (savedData) {
          setFormData(JSON.parse(savedData))
        }
      } catch (error) {
        console.error('Failed to load form data', error)
      } finally {
        setIsInitialized(true)
      }
    }

    loadFormData()
  }, [])

  // Save form data whenever it changes
  React.useEffect(() => {
    const saveFormData = async () => {
      if (isInitialized && Object.keys(formData).length > 0) {
        try {
          await AsyncStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData))
          console.log('Form data saved:', formData)
        } catch (error) {
          console.error('Failed to save form data', error)
        }
      }
    }

    saveFormData()
  }, [formData, isInitialized])

  // Update function that merges new data with existing data
  const updateFormData = React.useCallback((newData: Partial<FormData>) => {
    console.log('Updating form data with:', newData)
    setFormData((prev) => {
      const updated = {
        ...prev,
        ...newData,
      }
      console.log('New form data state:', updated)
      return updated
    })
  }, [])

  // Reset form data to empty object and clear from storage
  const resetFormData = React.useCallback(async () => {
    try {
      await AsyncStorage.removeItem(FORM_DATA_STORAGE_KEY)
      setFormData({
        guidelines: undefined,
        treatment: undefined,
        state: undefined,
        diagnosis: undefined,
        medicalHistory: undefined,
        codes: undefined,
      })
      console.log('Form data has been reset')
    } catch (error) {
      console.error('Failed to reset form data', error)
    }
  }, [])

  // Don't render children until we've loaded the form data
  if (!isInitialized) {
    return null
  }

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData: updateFormData,
        resetFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  )
}

export default FormDataProvider
