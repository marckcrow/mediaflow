import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { mockUser, mockAdminUser } from '@/mocks/mockData'
import type { User } from '@/types'

// Only this email can register (owner-only mode)
const ALLOWED_EMAILS = ['marcondesjrti@gmail.com']

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  isRegistrationOpen: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistrationOpen] = useState(false) // Registration closed — owner only

  useEffect(() => {
    const stored = localStorage.getItem('mf_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1200))
    if (!email || _password.length < 4) {
      return { success: false, error: 'E-mail ou senha incorretos.' }
    }
    // Login with real user data
    if (email === mockUser.email) {
      setUser(mockUser)
      localStorage.setItem('mf_user', JSON.stringify(mockUser))
      return { success: true }
    }
    // Fallback: create session with provided info
    const u: User = { ...mockUser, name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), email }
    setUser(u)
    localStorage.setItem('mf_user', JSON.stringify(u))
    return { success: true }
  }

  const register = async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1500))

    // Owner-only registration check
    if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
      return { success: false, error: 'O registro está temporariamente fechado. Apenas o proprietário pode criar contas neste momento.' }
    }

    if (!name || !email || password.length < 4) {
      return { success: false, error: 'Preencha todos os campos corretamente.' }
    }

    const u: User = { ...mockUser, name, email, id: 'usr_' + Date.now(), createdAt: new Date().toISOString() }
    setUser(u)
    localStorage.setItem('mf_user', JSON.stringify(u))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mf_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isRegistrationOpen }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
