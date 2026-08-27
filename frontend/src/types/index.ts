export type MediaType = 'video' | 'audio'
export type Format = 'mp4' | 'webm' | 'mp3' | 'm4a'
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'error' | 'expired'
export type Plan = 'free' | 'pro' | 'business'
export type SourceStatus = 'idle' | 'analyzing' | 'ready' | 'error'
export type FilterType = 'all' | 'video' | 'audio' | 'completed' | 'errors'

export interface AnalyzedMedia {
  id: string
  url: string
  title: string
  thumbnail: string
  duration: number
  source: string
  sourceName: string
  mediaType: MediaType
  date: string
  status: SourceStatus
  availableFormats: FormatOption[]
  error?: string
}

export interface FormatOption {
  format: Format
  label: string
  quality?: string
  resolution?: string
  bitrate?: number
  estimatedSize: string
  available: boolean
}

export interface ProcessingJob {
  id: string
  mediaId: string
  title: string
  format: Format
  formatLabel: string
  quality?: string
  status: ProcessingStatus
  progress: number
  currentStep: number
  fileSize?: string
  duration?: number
  createdAt: string
  completedAt?: string
  error?: string
  isFavorite: boolean
  source: string
  sourceName: string
  thumbnail?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: Plan
  isAdmin: boolean
  createdAt: string
  processingCount: number
  storageUsed: number
  storageLimit: number
  monthlyLimit: number
  monthlyUsed: number
}

export interface AdminStats {
  totalUsers: number
  totalProcesses: number
  processesToday: number
  processesCompleted: number
  errorsToday: number
  storageUsed: number
  storageLimit: number
  byFormat: Record<Format, number>
  byDay: { date: string; count: number; errors: number }[]
  activeUsers: number
}

export interface QueueItem {
  id: string
  position: number
  title: string
  status: 'processing' | 'waiting' | 'completed'
  progress?: number
}

export const STEPS = [
  'Validando URL',
  'Obtendo informações',
  'Preparando mídia',
  'Processando',
  'Convertendo',
  'Finalizando',
] as const

export const SUPPORTED_SOURCES = [
  { id: 'youtube', name: 'YouTube', icon: 'youtube', patterns: [/youtube\.com/, /youtu\.be/, /yt\.be/] },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', patterns: [/instagram\.com/, /instagr\.am/] },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', patterns: [/tiktok\.com/] },
  { id: 'vimeo', name: 'Vimeo', icon: 'vimeo', patterns: [/vimeo\.com/] },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', patterns: [/facebook\.com/, /fb\.com/] },
  { id: 'twitter', name: 'X (Twitter)', icon: 'twitter', patterns: [/twitter\.com/, /x\.com/] },
]
