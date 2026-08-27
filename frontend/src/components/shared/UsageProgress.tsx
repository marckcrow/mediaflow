import React from 'react'
import { Progress } from '@/components/ui/progress'
import { formatBytes } from '@/lib/utils'

interface UsageProgressProps {
  label: string
  used: number
  total: number
  unit?: string
  color?: string
}

export function UsageProgress({ label, used, total, color = 'from-primary to-accent' }: UsageProgressProps) {
  const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-medium text-white">
          {formatBytes(used)} / {formatBytes(total)}
        </span>
      </div>
      <Progress
        value={pct}
        className="h-1.5"
        indicatorClassName={`bg-gradient-to-r ${color}`}
      />
    </div>
  )
}
