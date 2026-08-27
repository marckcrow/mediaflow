import React from 'react'
import { Download, RotateCcw, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDuration, formatDateTime } from '@/lib/utils'

interface DownloadCardProps {
  title: string
  format: string
  formatLabel: string
  fileSize?: string
  duration?: number
  createdAt?: string
  thumbnail?: string
  onDownload?: () => void
  onReset?: () => void
}

export function DownloadCard({
  title, format, formatLabel, fileSize, duration,
  createdAt, thumbnail, onDownload, onReset
}: DownloadCardProps) {
  return (
    <Card className="overflow-hidden animate-slide-up border-emerald-500/20 shadow-glow">
      {thumbnail && (
        <div className="aspect-video bg-slate-900 overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-80"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-white line-clamp-2 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">{formatLabel}</Badge>
              {fileSize && <Badge variant="outline">{fileSize}</Badge>}
              {duration && <Badge variant="outline">{formatDuration(duration)}</Badge>}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-emerald-400" />
          </div>
        </div>
        {createdAt && (
          <p className="text-xs text-slate-500 mb-4">Concluído em {formatDateTime(createdAt)}</p>
        )}
        <div className="flex gap-2">
          <Button className="flex-1 gap-2 shadow-glow" onClick={onDownload}>
            <Download size={16} /> Baixar arquivo
          </Button>
          <Button variant="secondary" className="gap-2" onClick={onReset}>
            <RotateCcw size={16} /> Novo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
