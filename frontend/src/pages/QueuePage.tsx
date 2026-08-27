import React from 'react'
import { ListOrdered, CheckCircle2, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QueueItemCard } from '@/components/shared/QueueItem'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockQueue } from '@/mocks/mockData'

export function QueuePage() {
  const [queue, setQueue] = React.useState(mockQueue)

  const clearCompleted = () => {
    setQueue(prev => prev.filter(i => i.status !== 'completed'))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Fila de Processamento</h1>
          <p className="text-sm text-slate-400">
            {queue.filter(i => i.status !== 'completed').length} na fila · máx. 3 simultâneos
          </p>
        </div>
        {queue.some(i => i.status === 'completed') && (
          <Button size="sm" variant="ghost" className="text-slate-400" onClick={clearCompleted}>
            Limpar concluídos
          </Button>
        )}
      </div>

      {/* Concurrent limit indicator */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-dark border border-border-dark">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < queue.filter(q => q.status === 'processing').length
                  ? 'bg-primary'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400">
          {queue.filter(q => q.status === 'processing').length}/3 processos simultâneos
        </span>
      </div>

      {queue.length === 0 ? (
        <Card>
          <CardContent className="p-0">
            <EmptyState
              icon={ListOrdered}
              title="Fila vazia"
              description="Inicie um processamento para vê-lo aqui."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {queue.map(item => (
            <div key={item.id} className="flex items-start gap-3">
              <QueueItemCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
