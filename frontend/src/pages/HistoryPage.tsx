import React, { useState } from 'react'
import { Search, Download, Trash2, Star, Film, Music, SearchX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockProcessingJobs } from '@/mocks/mockData'
import { formatDate, formatDuration, formatDateTime, slugify } from '@/lib/utils'
import type { ProcessingJob, FilterType } from '@/types'

const statusConfig = {
  completed: { label: 'Concluído', variant: 'success' as const },
  processing: { label: 'Processando', variant: 'info' as const },
  pending: { label: 'Aguardando', variant: 'warning' as const },
  error: { label: 'Erro', variant: 'error' as const },
  expired: { label: 'Expirado', variant: 'secondary' as const },
}

export function HistoryPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [jobs, setJobs] = useState(mockProcessingJobs)
  const [favorites, setFavorites] = useState<Set<string>>(new Set(jobs.filter(j => j.isFavorite).map(j => j.id)))

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }

  // Generate and download a file for a completed job
  const handleHistoryDownload = (job: ProcessingJob) => {
    const ext = job.format === 'mp3' ? 'mp3' : job.format === 'm4a' ? 'm4a' : job.format === 'webm' ? 'webm' : 'mp4'
    const fileName = `${slugify(job.title)}.${ext}`

    // Generate a text placeholder file with metadata
    const lines = [
      `MediaFlow - Arquivo Processado`,
      ``,
      `Titulo: ${job.title}`,
      `Formato: ${job.formatLabel}`,
      `Tamanho: ${job.fileSize ?? "N/A"}`,
      `Fonte: ${job.sourceName}`,
      `Data: ${new Date().toLocaleString("pt-BR")}`,
      ``,
      `Este e um arquivo placeholder gerado pelo MediaFlow.`,
      `Em producao, o arquivo de midia real seria baixado aqui.`,
    ]
    const fileContent = lines.join("\r\n")

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filtered = jobs.filter(job => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'video' && (job.format === 'mp4' || job.format === 'webm')) ||
      (filter === 'audio' && (job.format === 'mp3' || job.format === 'm4a')) ||
      (filter === 'completed' && job.status === 'completed') ||
      (filter === 'errors' && job.status === 'error')

    const matchSearch = !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.sourceName.toLowerCase().includes(search.toLowerCase())

    return matchFilter && matchSearch
  })

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">Histórico</h1>
        <p className="text-sm text-slate-400">{jobs.length} processamentos</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou fonte..."
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <Tabs defaultValue="all" onValueChange={v => setFilter(v as FilterType)}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="video">Vídeo</TabsTrigger>
          <TabsTrigger value="audio">Áudio</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="errors">Erros</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-0">
                <EmptyState
                  icon={SearchX}
                  title="Nenhum resultado"
                  description="Tente ajustar os filtros ou buscar por outro termo."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {/* Desktop table */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-border-dark">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-dark bg-surface-dark">
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">DATA</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">NOME</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">FORMATO</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">TAMANHO</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">STATUS</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(job => {
                      const sc = statusConfig[job.status]
                      return (
                        <tr key={job.id} className="border-b border-border-dark/50 hover:bg-surface-dark/50 transition-colors">
                          <td className="px-4 py-3 text-slate-400 text-xs">{formatDate(job.createdAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {job.format === 'mp3' || job.format === 'm4a'
                                ? <Music size={14} className="text-accent flex-shrink-0" />
                                : <Film size={14} className="text-primary flex-shrink-0" />
                              }
                              <span className="text-slate-200 font-medium truncate max-w-[200px]">{job.title}</span>
                            </div>
                            <p className="text-xs text-slate-500">{job.sourceName}</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">{job.formatLabel}</Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs">{job.fileSize ?? '—'}</td>
                          <td className="px-4 py-3">
                            <Badge variant={sc.variant}>{sc.label}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleFavorite(job.id)}
                                className="p-1.5 rounded-md hover:bg-surface-dark transition-colors"
                                title={favorites.has(job.id) ? 'Remover favorito' : 'Favoritar'}
                              >
                                <Star size={14} className={favorites.has(job.id) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'} />
                              </button>
                              {job.status === 'completed' && (
                                <button
                                  className="p-1.5 rounded-md hover:bg-surface-dark text-slate-500 hover:text-white transition-colors"
                                  title="Baixar"
                                  onClick={() => handleHistoryDownload(job)}
                                >
                                  <Download size={14} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteJob(job.id)}
                                className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {filtered.map(job => {
                  const sc = statusConfig[job.status]
                  return (
                    <Card key={job.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white line-clamp-2">{job.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{job.sourceName} · {formatDate(job.createdAt)}</p>
                          </div>
                          <button onClick={() => toggleFavorite(job.id)} className="flex-shrink-0">
                            <Star size={16} className={favorites.has(job.id) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{job.formatLabel}</Badge>
                          <Badge variant={sc.variant}>{sc.label}</Badge>
                          {job.fileSize && <Badge variant="outline">{job.fileSize}</Badge>}
                        </div>
                        <div className="flex gap-2">
                          {job.status === 'completed' && (
                            <Button size="sm" variant="default" className="flex-1 gap-1.5" onClick={() => handleHistoryDownload(job)}>
                              <Download size={14} /> Baixar
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => deleteJob(job.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
