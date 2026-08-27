import React from 'react'
import { User, Mail, Calendar, HardDrive, Cpu, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { UsageProgress } from '@/components/shared/UsageProgress'
import { useAuth } from '@/contexts/AuthContext'
import { formatDate } from '@/lib/utils'

export function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-glow">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-slate-400">{user.email}</p>
            <Badge variant="default" className="mt-2 capitalize">{user.plan} Plan</Badge>
          </div>

          <Separator className="mb-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-dark border border-border-dark">
              <User size={18} className="text-primary" />
              <div>
                <p className="text-xs text-slate-500">Nome</p>
                <p className="text-sm font-medium text-white">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-dark border border-border-dark">
              <Mail size={18} className="text-accent" />
              <div>
                <p className="text-xs text-slate-500">E-mail</p>
                <p className="text-sm font-medium text-white truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-dark border border-border-dark">
              <Calendar size={18} className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-500">Membro desde</p>
                <p className="text-sm font-medium text-white">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-dark border border-border-dark">
              <Cpu size={18} className="text-amber-400" />
              <div>
                <p className="text-xs text-slate-500">Processamentos</p>
                <p className="text-sm font-medium text-white">{user.processingCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Uso este mês</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageProgress
            label={`Processamentos (${user.monthlyUsed}/${user.monthlyLimit})`}
            used={user.monthlyUsed}
            total={user.monthlyLimit}
            color="from-primary to-accent"
          />
          <UsageProgress
            label="Armazenamento"
            used={user.storageUsed}
            total={user.storageLimit}
            color="from-cyan-500 to-blue-500"
          />
        </CardContent>
      </Card>

      {/* Plan info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Plano {user.plan.toUpperCase()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {user.plan === 'free' && (
            <>
              <PlanFeature label={`${user.monthlyLimit} processamentos/mês`} included />
              <PlanFeature label="Limite de arquivo: 500MB" included />
              <PlanFeature label="1 processo simultâneo" included />
              <PlanFeature label="Histórico: 30 dias" included />
              <PlanFeature label="Processamento prioritário" included={false} />
              <PlanFeature label="Armazenamento estendido" included={false} />
              <Button size="sm" className="mt-3 gap-2 shadow-glow" onClick={() => {}}>
                Fazer upgrade para Pro →
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2" onClick={logout}>
        <LogOut size={16} /> Sair da conta
      </Button>
    </div>
  )
}

function PlanFeature({ label, included }: { label: string; included: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${included ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
        {included ? '✓' : '—'}
      </div>
      <span className={`text-sm ${included ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
    </div>
  )
}
