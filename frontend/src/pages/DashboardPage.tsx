import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UrlInput } from '@/components/shared/UrlInput'
import { MediaPreview } from '@/components/shared/MediaPreview'
import { FormatSelector } from '@/components/shared/FormatSelector'
import { ProcessingProgress } from '@/components/shared/ProcessingProgress'
import { DownloadCard } from '@/components/shared/DownloadCard'
import { UsageProgress } from '@/components/shared/UsageProgress'
import { analyzeUrl } from '@/mocks/mockData'
import { useAuth } from '@/contexts/AuthContext'
import type { AnalyzedMedia, FormatOption } from '@/types'
import { Zap } from 'lucide-react'

export function DashboardPage() {
  const { user } = useAuth()
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const [media, setMedia] = useState<AnalyzedMedia | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(null)
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [fileSize, setFileSize] = useState('')

  const handleAnalyze = async (urlValue: string) => {
    setAnalyzing(true)
    setAnalyzeError(null)
    setMedia(null)
    setSelectedFormat(null)
    setDone(false)
    try {
      const result = await analyzeUrl(urlValue)
      if (!result) {
        setAnalyzeError('Não conseguimos identificar uma mídia válida nessa URL.')
      } else {
        setMedia(result)
      }
    } catch {
      setAnalyzeError('Erro ao analisar a URL. Tente novamente.')
    }
    setAnalyzing(false)
  }

  const handleFormatSelect = (fmt: FormatOption) => {
    if (selectedFormat && !processing && !done) return
    setSelectedFormat(fmt)
    setProcessing(true)
  }

  const handleReset = () => {
    setMedia(null)
    setSelectedFormat(null)
    setProcessing(false)
    setDone(false)
    setFileSize('')
    setUrl('')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title card */}
      <Card className="border-primary/10">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={20} className="text-primary" />
            <h1 className="text-xl lg:text-2xl font-bold text-white">Transforme seus arquivos de mídia</h1>
          </div>
          <p className="text-slate-400 text-sm">Insira uma URL autorizada e escolha o formato desejado.</p>
        </CardContent>
      </Card>

      {/* URL input */}
      {!done && (
        <Card>
          <CardContent className="p-5">
            <UrlInput onAnalyze={handleAnalyze} analyzing={analyzing} error={analyzeError ?? undefined} />
          </CardContent>
        </Card>
      )}

      {/* Analyzing state */}
      {analyzing && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl border-2 border-primary/30 border-t-primary animate-spin mb-4" />
            <p className="text-sm text-slate-400">Analisando URL...</p>
          </CardContent>
        </Card>
      )}

      {/* Media preview + format selector */}
      {media && !done && !processing && (
        <div className="space-y-4 animate-slide-up">
          <MediaPreview media={media} />
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Selecione o formato</h3>
              <FormatSelector media={media} onSelect={handleFormatSelect} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Processing */}
      {processing && !done && (
        <Card>
          <CardContent className="p-5">
            <ProcessingProgress
              onComplete={(size) => { setDone(true); setFileSize(size); setProcessing(false) }}
              onReset={handleReset}
            />
          </CardContent>
        </Card>
      )}

      {/* Done / Download */}
      {done && media && (
        <div className="space-y-4 animate-slide-up">
          <DownloadCard
            title={media.title}
            format={selectedFormat?.format ?? 'mp4'}
            formatLabel={selectedFormat?.label ?? 'MP4'}
            fileSize={fileSize}
            duration={media.duration}
            thumbnail={media.thumbnail}
            onReset={handleReset}
          />
          <button
            onClick={handleReset}
            className="w-full text-sm text-slate-400 hover:text-white py-2 transition-colors"
          >
            ← Analisar outra URL
          </button>
        </div>
      )}

      {/* Usage bar */}
      {user && !done && (
        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="text-xs font-medium text-slate-400 mb-2">SUA UTILIZAÇÃO ESTE MÊS</p>
            <UsageProgress
              label="Processamentos"
              used={user.monthlyUsed}
              total={user.monthlyLimit}
              color="from-primary to-accent"
            />
            <UsageProgress
              label="Armazenamento"
              used={user.storageUsed}
              total={user.storageLimit}
              color="from-cyan-500 to-blue-500"
            />
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{user.processingCount} processamentos totais</span>
              <span className="text-slate-500">Plano {user.plan.toUpperCase()}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
