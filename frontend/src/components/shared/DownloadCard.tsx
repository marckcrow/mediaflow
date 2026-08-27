import React, { useState } from 'react'
import { Download, RotateCcw, FileText, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDuration, formatDateTime, slugify } from '@/lib/utils'

interface DownloadCardProps {
  title: string
  format: string
  formatLabel: string
  fileSize?: string
  duration?: number
  createdAt?: string
  thumbnail?: string
  onReset?: () => void
}

export function DownloadCard({
  title, format, formatLabel, fileSize, duration,
  createdAt, thumbnail, onReset
}: DownloadCardProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)

    try {
      const ext = format === 'mp3' ? 'mp3' : format === 'm4a' ? 'm4a' : format === 'webm' ? 'webm' : 'mp4'
      const fileName = `${slugify(title)}.${ext}`

      // Generate a text file with metadata as placeholder download
      // In production this would be the real processed media file URL
      const fileContent = [
        `MediaFlow - Arquivo Processado`,
        ``,
        `Titulo: ${title}`,
        `Formato: ${formatLabel}`,
        `Tamanho: ${fileSize ?? "N/A"}`,
        `Duracao: ${duration ? formatDuration(duration) : "N/A"}`,
        `Gerado em: ${new Date().toLocaleString("pt-BR")}`,
        ``,
        `Este e um arquivo placeholder gerado pelo MediaFlow.`,
        `Em producao, o arquivo de midia real seria baixado aqui.`,
      ].join("\r\n")

      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloaded(true)
    } catch (err) {
      console.error("Download error:", err)
    }

    setDownloading(false)
  }

  return (
    <Card className="overflow-hidden animate-slide-up border-emerald-500/20 shadow-glow">
      {thumbnail && (
        <div className="aspect-video bg-slate-900 overflow-hidden">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-80"
            onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
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
          <p className="text-xs text-slate-500 mb-4">Concluido em {formatDateTime(createdAt)}</p>
        )}
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-2 shadow-glow"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloaded ? (
              <>
                <CheckCircle2 size={16} /> Baixado!
              </>
            ) : downloading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Baixando...
              </>
            ) : (
              <>
                <Download size={16} /> Baixar arquivo
              </>
            )}
          </Button>
          <Button variant="secondary" className="gap-2" onClick={onReset}>
            <RotateCcw size={16} /> Novo
          </Button>
        </div>
        {downloaded && (
          <p className="text-xs text-emerald-400 mt-3 text-center animate-fade-in">
            Arquivo baixado com sucesso!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
