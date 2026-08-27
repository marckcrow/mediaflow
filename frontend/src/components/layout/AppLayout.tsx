import React, { type ReactNode, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileNav } from './MobileNav'

interface AppLayoutProps {
  children: ReactNode
  title: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const { user, isLoading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow animate-pulse">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M10 8 L26 16 L10 24 Z" fill="white" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-bg-dark flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
