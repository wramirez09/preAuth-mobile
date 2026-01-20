import { states } from '@/app/data/selectOptions'
export const formatFormDataForChat = (formData: any) => {
  const { guidelines, treatment, state, states, diagnosis, medicalHistory, codes } = formData

  const getStateName = (stateId: number) => {
    return states?.find((s: any) => s.state_id === stateId)?.description || 'Not specified'
  }

  const messageParts = [
    "Here's my pre-authorization request:",
    `\u2022 Guidelines: ${guidelines || 'Not specified'}`,
    `\u2022 Treatment: ${treatment || 'Not specified'}`,
    `\u2022 State: ${typeof state === 'number' ? getStateName(state) : 'Not specified'}`,
    `\u2022 Diagnosis: ${diagnosis || 'Not specified'}`,
    `\u2022 Medical History: ${medicalHistory || 'Not specified'}`,
    `\u2022 CPT/HCPCS Codes: ${codes || 'Not specified'}`,
  ]
  return messageParts.join('\n')
}
