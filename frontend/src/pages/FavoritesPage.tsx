import React from 'react'
import { Star, Download, Trash2, Film, Music } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockProcessingJobs } from '@/mocks/mockData'
import { formatDate } from '@/lib/utils'

export function FavoritesPage() {
  const [jobs, setJobs] = React.useState(
    mockProcessingJobs.filter(j => j.isFavorite)
  )

  const removeFavorite = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">Favoritos</h1>
        <p className="text-sm text-slate-400">{jobs.length} itens salvos</p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="p-0">
            <EmptyState
              icon={Star}
              title="Nenhum favorito ainda"
              description="Marque processamentos como favoritos para encontrá-los rapidamente aqui."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => (
            <Card key={job.id} className="overflow-hidden">
              <div className="aspect-video bg-slate-900 overflow-hidden">
                {job.thumbnail && (
                  <img src={job.thumbnail} alt={job.title} className="w-full h-full object-cover opacity-80"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white line-clamp-2">{job.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{job.sourceName} · {formatDate(job.createdAt)}</p>
                  </div>
                  <Star size={16} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.formatLabel}</Badge>
                  {job.fileSize && <Badge variant="outline">{job.fileSize}</Badge>}
                </div>
                <div className="flex gap-2">
                  {job.status === 'completed' ? (
                    <Button size="sm" className="flex-1 gap-1.5" onClick={() => {}}>
                      <Download size={14} /> Baixar
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="flex-1" disabled>
                      {job.status === 'processing' ? 'Processando...' : 'Indisponível'}
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => removeFavorite(job.id)} className="text-yellow-400">
                    <Star size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteJob(job.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
