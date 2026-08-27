import React, { useState } from 'react'
import { Clock, Globe, Film, Music, Calendar, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDuration, formatDate } from '@/lib/utils'
import type { AnalyzedMedia } from '@/types'

interface MediaPreviewProps {
  media: AnalyzedMedia
}

export function MediaPreview({ media }: MediaPreviewProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)

  // For video types, we embed the original URL as a preview player
  // This lets the user verify it's the correct content before processing
  const isVideo = media.mediaType === 'video'
  const isYouTube = media.source === 'youtube'
  const isVimeo = media.source === 'vimeo'

  // Build embed URL for supported sources
  let embedUrl = ''
  if (isYouTube) {
    // Extract video ID from various YouTube URL formats
    const ytMatch = media.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
    if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`
  }
  if (isVimeo) {
    const vmMatch = media.url.match(/vimeo\.com\/(\d+)/)
    if (vmMatch) embedUrl = `https://player.vimeo.com/video/${vmMatch[1]}`
  }

  return (
    <Card className="overflow-hidden animate-slide-up border-primary/20 shadow-glow">
      {/* Video Player / Thumbnail */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        {showPlayer && embedUrl ? (
          <iframe
            src={embedUrl}
            title={media.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail with play button overlay */}
            <img
              src={media.thumbnail}
              alt={media.title}
              className="w-full h-full object-cover opacity-90"
              onError={e => { (e.target as HTMLImageElement).src = 'https://picsum.photos/640/360' }}
            />

            {/* Play button overlay — click to show player */}
            {(embedUrl || isVideo) && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group transition-colors hover:bg-black/40"
                onClick={() => setShowPlayer(true)}
                role="button"
                tabIndex={0}
                aria-label="Reproduzir preview do vídeo"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
                <p className="absolute bottom-3 text-xs text-white/80 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                  Clique para preview
                </p>
              </div>
            )}

            {/* Audio waveform placeholder for audio type */}
            {!isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20">
                <Music size={48} className="text-white/60" />
              </div>
            )}
          </>
        )}

        {/* Info badges */}
        <div className="absolute top-2 right-2 flex gap-1.5 z-10">
          <Badge variant={media.mediaType === 'video' ? 'info' : 'success'} className="backdrop-blur-sm">
            {media.mediaType === 'video' ? <Film size={10} className="mr-1" /> : <Music size={10} className="mr-1" />}
            {media.mediaType === 'video' ? 'Vídeo' : 'Áudio'}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1.5 z-10">
          <Badge variant="secondary" className="backdrop-blur-sm">
            <Clock size={10} className="mr-1" />
            {formatDuration(media.duration)}
          </Badge>
        </div>

        {/* Close player button */}
        {showPlayer && embedUrl && (
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-2 left-2 z-20 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/90 transition-colors"
          >
            ✕ Fechar preview
          </button>
        )}
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

        {/* Preview toggle for non-embedded sources */}
        {!embedUrl && isVideo && !showPlayer && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 gap-2 w-full text-slate-400 hover:text-white border border-border-dark"
            onClick={() => setShowPlayer(true)}
          >
            <Play size={14} /> Verificar vídeo (preview)
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
