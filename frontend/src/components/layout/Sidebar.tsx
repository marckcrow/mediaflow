import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Clock, Star, ListOrdered, User,
  Shield, ChevronLeft, ChevronRight, LogOut, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/app/historico', icon: Clock, label: 'Histórico' },
  { to: '/app/favoritos', icon: Star, label: 'Favoritos' },
  { to: '/app/fila', icon: ListOrdered, label: 'Fila' },
  { to: '/app/perfil', icon: User, label: 'Perfil' },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-surface-dark border-r border-border-dark h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border-dark">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <path d="M10 8 L26 16 L10 24 Z" fill="white" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-white text-sm">MediaFlow</h1>
          <p className="text-[10px] text-slate-500">Plataforma de mídia</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-border-dark'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {user?.isAdmin && (
          <>
            <div className="h-px bg-border-dark my-3" />
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-border-dark'
                )
              }
            >
              <Shield size={18} />
              Admin
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border-dark space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-slate-200 truncate max-w-[100px]">{user?.name}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user?.plan}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
            onClick={logout}
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}
