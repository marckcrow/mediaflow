import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Clock, Star, ListOrdered, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/historico', icon: Clock, label: 'Histórico' },
  { to: '/app/favoritos', icon: Star, label: 'Favoritos' },
  { to: '/app/fila', icon: ListOrdered, label: 'Fila' },
  { to: '/app/perfil', icon: User, label: 'Perfil' },
]

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-md border-t border-border-dark safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors duration-200',
                isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
              )
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
