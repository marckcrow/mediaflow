import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { UrlInput } from '@/components/shared/UrlInput'
import { MediaPreview } from '@/components/shared/MediaPreview'
import { ProcessingProgress } from '@/components/shared/ProcessingProgress'
import { DownloadCard } from '@/components/shared/DownloadCard'
import { UsageProgress } from '@/components/shared/UsageProgress'
import { analyzeUrl } from '@/mocks/mockData'
import { useAuth } from '@/contexts/AuthContext'
import type { AnalyzedMedia, FormatOption } from '@/types'
import {
  Zap, Download, ChevronDown, Shield, Star,
  Youtube, Instagram, Music, Film, Globe, Clock
} from 'lucide-react'

// Supported platforms (like SaveFrom.net's grid)
const PLATFORMS = [
  { name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'TikTok', icon: Music, color: 'text-black dark:text-white', bg: 'bg-black/10 dark:bg-white/10' },
  { name: 'Facebook', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { name: 'Vimeo', icon: Globe, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'X (Twitter)', icon: Globe, color: 'text-slate-300', bg: 'bg-slate-700/50' },
  { name: 'Dailymotion', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Reddit', icon: Globe, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Pinterest', icon: Globe, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Threads', icon: Globe, color: 'text-slate-300', bg: 'bg-slate-700/50' },
  { name: 'VK', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
]

const QUALITIES = [
  { value: '4k', label: '4K (2160p)' },
  { value: '1080', label: 'Full HD (1080p)' },
  { value: '720', label: 'HD (720p)' },
  { value: '480', label: 'SD (480p)' },
  { value: '360', label: '360p' },
  { value: 'mp3-320', label: 'MP3 320kbps' },
  { value: 'mp3-192', label: 'MP3 192kbps' },
  { value: 'mp3-128', label: 'MP3 128kbps' },
  { value: 'm4a', label: 'M4A (AAC)' },
  { value: 'webm', label: 'WebM' },
]

export function DashboardPage() {
  const { user } = useAuth()
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const [media, setMedia] = useState<AnalyzedMedia | null>(null)
  const [selectedQuality, setSelectedQuality] = useState('720')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [fileSize, setFileSize] = useState('')
  const [showFaq, setShowFaq] = useState<number | null>(null)

  // Determine format from quality selection
  const getFormatFromQuality = (q: string): { format: string; formatLabel: string } => {
    if (q.startsWith('mp3-')) return { format: 'mp3', formatLabel: `MP3 ${q.split('-')[1]}kbps` }
    if (q === 'm4a') return { format: 'm4a', formatLabel: 'M4A' }
    if (q === 'webm') return { format: 'webm', formatLabel: `WebM ${q}p` }
    return { format: 'mp4', formatLabel: `MP4 ${q}p` }
  }

  const handleAnalyze = async (urlValue: string) => {
    setAnalyzing(true)
    setAnalyzeError(null)
    setMedia(null)
    setDone(false)
    try {
      const result = await analyzeUrl(urlValue)
      if (!result) {
        setAnalyzeError('Não conseguimos identificar uma mídia válida nessa URL.')
      } else {
        setMedia(result)
        // Auto-select best quality for video
        if (result.mediaType === 'video') setSelectedQuality('720')
        else setSelectedQuality('mp3-320')
      }
    } catch {
      setAnalyzeError('Erro ao analisar a URL. Tente novamente.')
    }
    setAnalyzing(false)
  }

  // Direct download button — combines format selection + processing in one click
  const handleDownload = async () => {
    if (!media) return
    setProcessing(true)

    // Simulate processing with selected quality
    await new Promise(r => setTimeout(r, 2500))
    const sizes = ['85 MB', '120 MB', '245 MB', '412 MB', '67 MB', '15 MB']
    const sz = sizes[Math.floor(Math.random() * sizes.length)]
    setFileSize(sz)
    setDone(true)
    setProcessing(false)
  }

  const handleReset = () => {
    setMedia(null)
    setProcessing(false)
    setDone(false)
    setFileSize('')
    setUrl('')
    setSelectedQuality('720')
  }

  const fmt = getFormatFromQuality(selectedQuality)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ===== HERO SECTION — URL Input ===== */}
      <Card className="border-primary/20 overflow-hidden">
        <CardContent className="p-6 lg:p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><path d="M10 8 L26 16 L10 24 Z" fill="white"/></svg>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">Baixar Vídeo do YouTube</h1>
          </div>
          <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
            Cole o link do vídeo e baixe em alta qualidade. Suporta YouTube, Instagram, TikTok, Vimeo e mais.
          </p>

          {/* Main URL input bar — like SaveFrom.net */}
          {!media && !done && (
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="Cole o link do vídeo aqui"
                    className={`w-full h-12 pl-10 pr-4 rounded-lg border bg-surface-dark text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 ${
                      analyzeError ? 'border-red-500/50' : 'border-border-dark'
                    }`}
                    disabled={analyzing}
                    onKeyDown={e => e.key === 'Enter' && url.length > 5 && handleAnalyze(url)}
                  />
                </div>
                <Button
                  onClick={() => url.length > 5 ? handleAnalyze(url) : null}
                  disabled={analyzing || url.length < 5}
                  className="h-12 px-8 gap-2 shadow-glow font-semibold"
                >
                  {analyzing ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Baixar
                    </>
                  )}
                </Button>
              </div>

              {/* Error message */}
              {analyzeError && (
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-red-400 animate-fade-in">
                  ⚠️ {analyzeError}
                </div>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Shield size={12} /> Seguro</span>
                <span className="flex items-center gap-1">✓ Rápido</span>
                <span className="flex items-center gap-1">✓ Gratuito</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== VIDEO PREVIEW WITH DOWNLOAD (SaveFrom style) ===== */}
      {media && !done && (
        <Card className="overflow-hidden animate-slide-up border-primary/20">
          {/* Video thumbnail / player */}
          <div className="relative aspect-video bg-slate-900 overflow-hidden">
            <img
              src={media.thumbnail}
              alt={media.title}
              className="w-full h-full object-cover opacity-90"
              onError={e => { (e.target as HTMLImageElement).src = 'https://picsum.photos/640/360' }}
            />

            {/* Play overlay for preview */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-primary transition-colors group">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="backdrop-blur-sm">
                <Clock size={10} className="mr-1" />
                {Math.floor(media.duration / 60)}:{String(Math.floor(media.duration % 60)).padStart(2, '0')}
              </Badge>
            </div>

            {/* Source badge */}
            <div className="absolute top-2 left-2">
              <Badge variant={media.mediaType === 'video' ? 'info' : 'success'} className="backdrop-blur-sm">
                {media.mediaType === 'video' ? <Film size={10} className="mr-1" /> : <Music size={10} className="mr-1" />}
                {media.sourceName}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5 space-y-4">
            {/* Title */}
            <h2 className="font-semibold text-base text-white line-clamp-2">{media.title}</h2>

            {/* Quality selector + Download button row — like SaveFrom.net */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quality dropdown */}
              <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Qualidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4k">🎬 4K (2160p)</SelectItem>
                  <SelectItem value="1080">🎬 Full HD (1080p)</SelectItem>
                  <SelectItem value="720">🎬 HD (720p)</SelectItem>
                  <SelectItem value="480">🎬 SD (480p)</SelectItem>
                  <SelectItem value="360">🎬 360p</SelectItem>
                  <SelectItem value="mp3-320">🎵 MP3 320kbps</SelectItem>
                  <SelectItem value="mp3-192">🎵 MP3 192kbps</SelectItem>
                  <SelectItem value="mp3-128">🎵 MP3 128kbps</SelectItem>
                  <SelectItem value="m4a">🎵 M4A (AAC)</SelectItem>
                  <SelectItem value="webm">🎬 WebM</SelectItem>
                </SelectContent>
              </Select>

              {/* Green Download button */}
              <Button
                onClick={handleDownload}
                disabled={processing}
                className="flex-1 sm:flex-initial h-12 px-8 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/25"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <Download size={18} /> Download
                  </>
                )}
              </Button>
            </div>

            {/* File info line */}
            <p className="text-xs text-slate-500">
              Formato: <span className="text-slate-300 font-medium">{fmt.formatLabel}</span> · 
              Fonte: <span className="text-slate-300">{media.sourceName}</span> · 
              Duração: <span className="text-slate-300">{Math.floor(media.duration / 60)}:{String(Math.floor(media.duration % 60)).padStart(2, '0')}</span>
            </p>

            {/* New URL link */}
            <button
              onClick={handleReset}
              className="text-xs text-primary hover:underline"
            >
              ← Analisar outro vídeo
            </button>
          </CardContent>
        </Card>
      )}

      {/* ===== PROCESSING STATE ===== */}
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

      {/* ===== COMPLETED / DOWNLOAD READY ===== */}
      {done && media && (
        <DownloadCard
          title={media.title}
          format={fmt.format}
          formatLabel={fmt.formatLabel}
          fileSize={fileSize}
          duration={media.duration}
          thumbnail={media.thumbnail}
          onReset={handleReset}
        />
      )}

      {/* ===== SUPPORTED PLATFORMS GRID ===== */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-white text-center mb-4">Todos os sites suportados</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg ${p.bg} hover:bg-opacity-70 transition-colors cursor-default`}
              >
                <p.icon size={22} className={p.color} />
                <span className="text-[10px] sm:text-xs text-slate-300 text-center leading-tight">{p.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ===== FAQ ACCORDION ===== */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-white text-center mb-4">Perguntas Frequentes</h3>
          <div className="space-y-2 max-w-xl mx-auto">
            {[
              { q: 'Como baixar vídeo do YouTube de qualquer site?', a: 'Basta colar a URL do vídeo no campo acima, selecionar a qualidade desejada e clicar em "Download". O MediaFlow processará o vídeo e fornecerá o arquivo para download.' },
              { q: 'Como baixar vídeo do YouTube através de uma URL?', a: 'Copie a URL da barra de endereços do navegador ou do botão "Compartilhar" do YouTube. Cole na caixa acima e pressione "Baixar".' },
              { q: 'Qual é o melhor formato para baixar?', a: 'Para vídeos em alta qualidade, recomendamos MP4 1080p (Full HD) ou 720p (HD). Para áudio apenas, MP3 320kbps oferece a melhor qualidade sonora.' },
              { q: 'É seguro usar o MediaFlow?', a: 'Sim! O MediaFlow não armazena seus dados pessoais e todos os arquivos são processados de forma segura. Não instalamos extensões ou software no seu dispositivo.' },
            ].map((faq, i) => (
              <div key={i} className="border border-border-dark rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-dark/50 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-200 pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform ${showFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {showFaq === i && (
                  <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ===== USAGE BAR (only show when not actively using) ===== */}
      {user && !media && !done && (
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

// Need Link2 icon
function Link2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function Play(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
