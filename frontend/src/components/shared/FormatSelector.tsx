import React, { useState } from 'react'
import { Film, Music, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AnalyzedMedia, FormatOption, Format } from '@/types'

interface FormatSelectorProps {
  media: AnalyzedMedia
  onSelect: (format: FormatOption) => void
}

export function FormatSelector({ media, onSelect }: FormatSelectorProps) {
  const [selected, setSelected] = useState<FormatOption | null>(null)

  const videoFormats = media.availableFormats.filter(f => f.format === 'mp4' || f.format === 'webm')
  const audioFormats = media.availableFormats.filter(f => f.format === 'mp3' || f.format === 'm4a')

  const handleSelect = (opt: FormatOption) => {
    setSelected(opt)
    onSelect(opt)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Video formats */}
      {videoFormats.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Film size={16} className="text-primary" />
            <h4 className="text-sm font-semibold text-white">Vídeo</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videoFormats.map((opt, i) => (
              <Card
                key={i}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-md',
                  selected === opt ? 'border-primary shadow-glow bg-primary/5' : 'border-border-dark'
                )}
                onClick={() => handleSelect(opt)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={opt.format === 'mp4' ? 'info' : 'secondary'}>
                        {opt.format.toUpperCase()}
                      </Badge>
                      {opt.quality && (
                        <span className="text-sm font-semibold text-white">{opt.quality}</span>
                      )}
                      {opt.resolution && (
                        <span className="text-xs text-slate-400">{opt.resolution}</span>
                      )}
                    </div>
                    {selected === opt && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{opt.estimatedSize}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Audio formats */}
      {audioFormats.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Music size={16} className="text-accent" />
            <h4 className="text-sm font-semibold text-white">Áudio</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audioFormats.map((opt, i) => (
              <Card
                key={i}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:border-accent/40 hover:shadow-md',
                  selected === opt ? 'border-accent shadow-glow bg-accent/5' : 'border-border-dark'
                )}
                onClick={() => handleSelect(opt)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={opt.format === 'mp3' ? 'info' : 'secondary'}>
                        {opt.format.toUpperCase()}
                      </Badge>
                      {opt.bitrate && (
                        <span className="text-sm font-semibold text-white">{opt.bitrate} kbps</span>
                      )}
                      {opt.quality && (
                        <span className="text-xs text-slate-400">{opt.quality}</span>
                      )}
                    </div>
                    {selected === opt && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{opt.estimatedSize}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Process button */}
      {selected && (
        <div className="animate-slide-up pt-2">
          <Button
            size="lg"
            className="w-full gap-2 shadow-glow"
            onClick={() => onSelect(selected)}
          >
            Processar
          </Button>
        </div>
      )}
    </div>
  )
}
