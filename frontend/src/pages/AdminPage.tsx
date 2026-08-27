import React from 'react'
import { Navigate } from 'react-router-dom'
import {
  Users, Activity, CheckCircle2, AlertTriangle, HardDrive,
  TrendingUp, BarChart2, Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { mockAdminStats, mockUsers } from '@/mocks/mockData'
import { formatBytes } from '@/lib/utils'

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon size={20} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
        {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  )
}

export function AdminPage() {
  const { user } = useAuth()
  const stats = mockAdminStats

  if (!user?.isAdmin) return <Navigate to="/app" replace />

  const maxCount = Math.max(...stats.byDay.map(d => d.count))

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">Painel Administrativo</h1>
        <p className="text-sm text-slate-400">Visão geral da plataforma</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total de usuários" value={stats.totalUsers.toLocaleString()} color="bg-primary/10 text-primary" />
        <StatCard icon={Activity} label="Processamentos hoje" value={stats.processesToday} sub={`${stats.processesCompleted} concluídos`} color="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={CheckCircle2} label="Total processamentos" value={stats.totalProcesses.toLocaleString()} color="bg-cyan-500/10 text-cyan-400" />
        <StatCard icon={AlertTriangle} label="Erros hoje" value={stats.errorsToday} color="bg-red-500/10 text-red-400" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Usuários ativos" value={stats.activeUsers} color="bg-amber-500/10 text-amber-400" />
        <StatCard icon={HardDrive} label="Armazenamento usado" value={formatBytes(stats.storageUsed)} sub={`de ${formatBytes(stats.storageLimit)}`} color="bg-violet-500/10 text-violet-400" />
        <StatCard icon={BarChart2} label="Formato mais usado" value="MP4" sub={`${((stats.byFormat.mp4 / stats.totalProcesses) * 100).toFixed(1)}% do total`} color="bg-pink-500/10 text-pink-400" />
        <StatCard icon={Clock} label="Processamentos/mês" value={Math.round(stats.totalProcesses / 6).toLocaleString()} sub="média mensal" color="bg-teal-500/10 text-teal-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Processamentos por dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {stats.byDay.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end" style={{ height: `${(day.count / maxCount) * 100}%` }}>
                    <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/50 transition-all hover:from-primary/80" title={`${day.count} processamentos`} />
                  </div>
                  <span className="text-[10px] text-slate-500">{day.date}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border-dark">
              {(['mp4', 'webm', 'mp3', 'm4a'] as const).map(fmt => (
                <div key={fmt} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${fmt === 'mp4' ? 'bg-primary' : fmt === 'webm' ? 'bg-cyan-400' : fmt === 'mp3' ? 'bg-amber-400' : 'bg-pink-400'}`} />
                  <span className="text-xs text-slate-400">{fmt.toUpperCase()}: {stats.byFormat[fmt].toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Format distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Distribuição por formato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(['mp4', 'webm', 'mp3', 'm4a'] as const).map(fmt => {
              const pct = (stats.byFormat[fmt] / stats.totalProcesses) * 100
              const colors = { mp4: 'from-primary to-primary/60', webm: 'from-cyan-500 to-cyan-400/60', mp3: 'from-amber-500 to-amber-400/60', m4a: 'from-pink-500 to-pink-400/60' }
              return (
                <div key={fmt}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">{fmt.toUpperCase()}</span>
                    <span className="text-sm text-slate-400">{stats.byFormat[fmt].toLocaleString()} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${colors[fmt]} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Users table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Usuários recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">USUÁRIO</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">E-MAIL</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">PLANO</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">PROCESSAMENTOS</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">DESDE</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-border-dark/50 hover:bg-surface-dark/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                          {u.name.charAt(0)}
                        </div>
                        <span className="text-slate-200 font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.plan === 'business' ? 'success' : u.plan === 'pro' ? 'info' : 'outline'} className="capitalize">
                        {u.plan}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{u.processes.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
