import React from 'react'
import { Clock, Globe, Film, Music, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDuration, formatDate } from '@/lib/utils'
import type { AnalyzedMedia } from '@/types'

interface MediaPreviewProps {
  media: AnalyzedMedia
}

export function MediaPreview({ media }: MediaPreviewProps) {
  return (
    <Card className="overflow-hidden animate-slide-up border-primary/20 shadow-glow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        <img
          src={media.thumbnail}
          alt={media.title}
          className="w-full h-full object-cover opacity-90"
          onError={e => { (e.target as HTMLImageElement).src = 'https://picsum.photos/640/360' }}
        />
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          <Badge variant={media.mediaType === 'video' ? 'info' : 'success'} className="backdrop-blur-sm">
            {media.mediaType === 'video' ? <Film size={10} className="mr-1" /> : <Music size={10} className="mr-1" />}
            {media.mediaType === 'video' ? 'Vídeo' : 'Áudio'}
          </Badge>
          <Badge variant="secondary" className="backdrop-blur-sm">
            <Clock size={10} className="mr-1" />
            {formatDuration(media.duration)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm text-white line-clamp-2 mb-3">{media.title}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1.5">
            <Globe size={10} />
            {media.sourceName}
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Calendar size={10} />
            {formatDate(media.date)}
          </Badge>
          <Badge variant="success" className="gap-1.5">
            ✓ Analisado
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-2 truncate">{media.url}</p>
      </CardContent>
    </Card>
  )
}
