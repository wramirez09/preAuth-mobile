import { Box, HStack, Text, View } from '@gluestack-ui/themed'
import { AlertTriangle } from 'lucide-react-native'
import React from 'react'

interface PatientInfoWarningProps {
  compact?: boolean
}

const PatientInfoWarning: React.FC<PatientInfoWarningProps> = ({
  compact = false,
}) => {
  return (
    <Box className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 mt-2 w-full">
      <HStack className="items-start" space="sm">
        <AlertTriangle size={16} color="#F59E0B" style={{ marginTop: 2 }} />
        <View className="flex-1">
          <Text className="text-amber-800 font-semibold text-sm mb-1">
            HIPAA Compliance
          </Text>
          <Text className="text-amber-700 text-xs leading-4">
            {compact
              ? 'Do not include patient-specific information (names, DOB, medical record numbers).'
              : 'Please do not include any patient-specific information such as names, dates of birth, medical record numbers, or other identifying details. This helps protect patient privacy and ensures compliance with healthcare regulations.'}
          </Text>
        </View>
      </HStack>
    </Box>
  )
}

export default PatientInfoWarning
