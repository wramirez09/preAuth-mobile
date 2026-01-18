import { states } from '@/app/data/selectOptions'
export const formatFormDataForChat = (formData: any) => {
  const { guidelines, treatment, state, states, diagnosis, medicalHistory, codes } = formData

  const getStateName = (stateId: number) => {
    return states?.find((s: any) => s.state_id === stateId)?.description || 'Not specified'
  }

  const messageParts = [
    "Here's my pre-authorization request:",
    `- Guidelines: ${guidelines || 'Not specified'}`,
    `- Treatment: ${treatment || 'Not specified'}`,
    `- State: ${typeof state === 'number' ? getStateName(state) : 'Not specified'}`,
    `- Diagnosis: ${diagnosis || 'Not specified'}`,
    `- Medical History: ${medicalHistory || 'Not specified'}`,
    `- CPT/HCPCS Codes: ${codes || 'Not specified'}`,
  ]
  return messageParts.join('\n')
}
