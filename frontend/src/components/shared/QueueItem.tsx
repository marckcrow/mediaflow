import React from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { QueueItem } from '@/types'

interface QueueItemProps {
  item: QueueItem
}

export function QueueItemCard({ item }: QueueItemProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
      item.status === 'processing'
        ? 'bg-primary/5 border-primary/20'
        : item.status === 'completed'
        ? 'bg-emerald-500/5 border-emerald-500/20'
        : 'bg-surface-dark border-border-dark'
    )}>
      {/* Position */}
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
        item.status === 'processing' ? 'bg-primary/20 text-primary' :
        item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
        'bg-slate-800 text-slate-400'
      )}>
        {item.status === 'completed' ? '✓' : item.position}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          {item.status === 'processing' && (
            <span className="text-xs text-primary">Processando</span>
          )}
          {item.status === 'waiting' && (
            <span className="text-xs text-slate-400">Aguardando</span>
          )}
          {item.status === 'completed' && (
            <span className="text-xs text-emerald-400">Concluído</span>
          )}
        </div>
        {item.status === 'processing' && (
          <Progress value={item.progress} className="mt-2 h-1" indicatorClassName="from-primary to-accent" />
        )}
      </div>

      {/* Status indicator */}
      {item.status === 'processing' && (
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
      )}
    </div>
  )
}
