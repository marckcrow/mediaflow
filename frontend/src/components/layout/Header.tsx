import React, { useState } from 'react'
import { Menu, X, Bell } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  title: string
  onMenuToggle?: () => void
  menuOpen?: boolean
}

export function Header({ title, onMenuToggle, menuOpen }: HeaderProps) {
  const { user } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6 h-16 bg-bg-dark/80 backdrop-blur-md border-b border-border-dark">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-dark transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div>
          <h2 className="font-semibold text-white text-base">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-dark transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-dark border border-border-dark rounded-xl shadow-xl animate-slide-up overflow-hidden">
              <div className="px-4 py-3 border-b border-border-dark">
                <p className="text-sm font-medium text-white">Notificações</p>
              </div>
              <div className="py-2">
                <div className="px-4 py-3 hover:bg-border-dark/50 cursor-pointer transition-colors">
                  <p className="text-sm text-slate-200">Processamento concluído</p>
                  <p className="text-xs text-slate-500 mt-0.5">Rick Astley - Never Gonna Give You Up</p>
                </div>
                <div className="px-4 py-3 hover:bg-border-dark/50 cursor-pointer transition-colors">
                  <p className="text-sm text-slate-200">Erro no processamento</p>
                  <p className="text-xs text-slate-500 mt-0.5">Mix Musical - Tente novamente</p>
                </div>
                <div className="px-4 py-3 hover:bg-border-dark/50 cursor-pointer transition-colors">
                  <p className="text-sm text-slate-200">Arquivo expirado</p>
                  <p className="text-xs text-slate-500 mt-0.5">Vlog de Viagem - Baixe em 24h</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-slate-300 hidden md:block">{user?.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
