import React, { useEffect, useState } from 'react'
import {
  Link2, Info, Download, Cog, RefreshCw, CheckCircle2, Loader2
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { STEPS } from '@/types'
import { cn } from '@/lib/utils'

interface ProcessingProgressProps {
  onComplete?: (fileSize: string) => void
  onError?: (msg: string) => void
  onReset?: () => void
}

const stepIcons = [Link2, Info, Download, Cog, RefreshCw, CheckCircle2]

export function ProcessingProgress({ onComplete, onError, onReset }: ProcessingProgressProps) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState('')

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const addDelay = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
      return id
    }

    const schedule = (cb: () => void, ms: number) => addDelay(cb, ms)

    schedule(() => setStep(1), 800)
    schedule(() => setProgress(15), 800)
    schedule(() => setStep(2), 2000)
    schedule(() => setProgress(28), 2000)
    schedule(() => setStep(3), 3500)
    schedule(() => setProgress(45), 3500)
    schedule(() => setStep(4), 5500)
    schedule(() => setProgress(65), 5500)
    schedule(() => setStep(5), 7500)
    schedule(() => setProgress(82), 7500)
    schedule(() => setStep(6), 9300)
    schedule(() => setProgress(100), 9300)
    schedule(() => {
      const sizes = ['85 MB', '120 MB', '245 MB', '412 MB', '67 MB', '15 MB']
      const sz = sizes[Math.floor(Math.random() * sizes.length)]
      setFileSize(sz)
      setDone(true)
      onComplete?.(sz)
    }, 10300)

    return () => timers.forEach(clearTimeout)
  }, [])

  if (err) {
    return (
      <div className="flex flex-col items-center py-10 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Erro no processamento</h3>
        <p className="text-sm text-slate-400 text-center mb-6">{err}</p>
        <Button onClick={() => { setErr(null); setStep(0); setProgress(0); onReset?.() }}>
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex flex-col items-center py-10 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 shadow-glow">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Processamento concluído!</h3>
        <p className="text-sm text-slate-400 mb-6 text-center">
          Seu arquivo está pronto para download
        </p>
        <div className="flex flex-col gap-2 items-center mb-6 p-4 bg-surface-dark rounded-xl border border-border-dark w-full">
          <p className="text-sm text-slate-300">Tamanho: <span className="text-white font-semibold">{fileSize}</span></p>
        </div>
        <div className="flex gap-3 w-full">
          <Button className="flex-1 gap-2 shadow-glow" onClick={() => {}}>
            Baixar arquivo
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onReset}>
            Novo processamento
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <Loader2 size={32} className="text-primary mb-3 animate-spin" />
        <p className="text-sm font-medium text-white">Processando mídia...</p>
      </div>

      <Progress value={progress} className="mb-6 h-2.5" indicatorClassName="bg-gradient-to-r from-primary to-accent" />

      <div className="space-y-3">
        {STEPS.map((stepName, i) => {
          const Icon = stepIcons[i]
          const isDone = i < step
          const isActive = i === step - 1
          return (
            <div key={i} className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
              isDone ? 'bg-emerald-500/5 border border-emerald-500/20' :
              isActive ? 'bg-primary/5 border border-primary/20' :
              'bg-surface-dark border border-border-dark'
            )}>
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                isDone ? 'bg-emerald-500/20' :
                isActive ? 'bg-primary/20 animate-pulse' :
                'bg-slate-800'
              )}>
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : isActive ? (
                  <Icon size={16} className="text-primary" />
                ) : (
                  <Icon size={16} className="text-slate-600" />
                )}
              </div>
              <span className={cn(
                'text-sm flex-1',
                isDone ? 'text-emerald-400' :
                isActive ? 'text-white font-medium' :
                'text-slate-500'
              )}>
                {stepName}
              </span>
              <span className={cn(
                'text-xs font-mono',
                isDone ? 'text-emerald-400' :
                isActive ? 'text-primary' :
                'text-slate-600'
              )}>
                {isDone ? '✓' : isActive ? `${progress}%` : ''}
              </span>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-600 text-center mt-6">
        Por favor, não feche esta janela durante o processamento
      </p>
    </div>
  )
}
