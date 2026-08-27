import React, { useState } from 'react'
import { Link2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UrlInputProps {
  onAnalyze: (url: string) => Promise<void>
  analyzing?: boolean
  error?: string
}

export function UrlInput({ onAnalyze, analyzing = false, error }: UrlInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    await onAnalyze(url.trim())
  }

  const isValidUrl = (s: string) => {
    try { new URL(s); return true } catch { return false }
  }

  const urlValid = url.length > 0 && isValidUrl(url)

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          <Link2 size={18} />
        </div>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Cole aqui a URL da mídia..."
          className={cn(
            'w-full h-14 pl-12 pr-32 rounded-xl bg-surface-dark border text-sm text-slate-100',
            'placeholder:text-slate-500 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
            error ? 'border-red-500/50' : 'border-border-dark',
            analyzing ? 'opacity-70' : ''
          )}
          disabled={analyzing}
        />
        <Button
          type="submit"
          disabled={analyzing || !urlValid}
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 gap-2"
        >
          {analyzing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            'Analisar URL'
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-3 text-sm text-red-400 animate-fade-in">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {!error && urlValid && (
        <div className="flex items-center gap-2 mt-3 text-sm text-emerald-400 animate-fade-in">
          <CheckCircle2 size={14} />
          URL válida — clique em "Analisar URL"
        </div>
      )}
    </form>
  )
}
