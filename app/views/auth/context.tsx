import { Session, User } from '@supabase/supabase-js'
import * as React from 'react'
import { createContext } from 'react'

interface SignInResponse {
  user: User
  session: Session
  weakPassword?: {
    is_weak_password: boolean
    strength: {
      score: number
      feedback: {
        suggestions: string[]
        warning: string
      }
    }
  }
}

export type AuthContextType = {
  session: Session | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<SignInResponse> | any
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
