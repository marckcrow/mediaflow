import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { mockUser, mockAdminUser } from '@/mocks/mockData'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('mf_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1200))
    if (email === 'admin@mediaflow.com') {
      setUser(mockAdminUser)
      localStorage.setItem('mf_user', JSON.stringify(mockAdminUser))
      return { success: true }
    }
    if (email && _password.length >= 4) {
      const u = { ...mockUser, email, name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }
      setUser(u)
      localStorage.setItem('mf_user', JSON.stringify(u))
      return { success: true }
    }
    return { success: false, error: 'E-mail ou senha incorretos.' }
  }

  const register = async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1500))
    if (name && email && _password.length >= 4) {
      const u: User = { ...mockUser, name, email, id: 'usr_' + Date.now(), createdAt: new Date().toISOString() }
      setUser(u)
      localStorage.setItem('mf_user', JSON.stringify(u))
      return { success: true }
    }
    return { success: false, error: 'Preencha todos os campos corretamente.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mf_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
