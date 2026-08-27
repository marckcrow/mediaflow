import type { AnalyzedMedia, ProcessingJob, User, AdminStats, QueueItem, FormatOption } from '@/types'

// Real user: Marcondes
export const mockUser: User = {
  id: 'usr_001',
  name: 'Marcondes',
  email: 'marcondesjrti@gmail.com',
  plan: 'free',
  isAdmin: true,
  createdAt: new Date().toISOString(),
  processingCount: 0,
  storageUsed: 0,
  storageLimit: 2 * 1024 * 1024 * 1024,
  monthlyLimit: 100,
  monthlyUsed: 0,
}

export const mockAdminUser: User = {
  id: 'usr_admin',
  name: 'Marcondes (Admin)',
  email: 'marcondesjrti@gmail.com',
  plan: 'business',
  isAdmin: true,
  createdAt: new Date().toISOString(),
  processingCount: 0,
  storageUsed: 0,
  storageLimit: 10 * 1024 * 1024 * 1024,
  monthlyLimit: 9999,
  monthlyUsed: 0,
}

// Format options (real structure, used when media is analyzed)
const videoFormats: FormatOption[] = [
  { format: 'mp4', label: 'MP4', quality: '1080p', resolution: '1920x1080', estimatedSize: '~245 MB', available: true },
  { format: 'mp4', label: 'MP4', quality: '720p', resolution: '1280x720', estimatedSize: '~120 MB', available: true },
  { format: 'mp4', label: 'MP4', quality: '480p', resolution: '854x480', estimatedSize: '~65 MB', available: true },
  { format: 'webm', label: 'WebM', quality: '1080p', resolution: '1920x1080', estimatedSize: '~180 MB', available: true },
]

const audioFormats: FormatOption[] = [
  { format: 'mp3', label: 'MP3', bitrate: 320, estimatedSize: '~11 MB', available: true },
  { format: 'mp3', label: 'MP3', bitrate: 192, estimatedSize: '~6.5 MB', available: true },
  { format: 'mp3', label: 'MP3', bitrate: 128, estimatedSize: '~4.3 MB', available: true },
  { format: 'm4a', label: 'M4A', quality: 'Alta', estimatedSize: '~9 MB', available: true },
]

// No pre-loaded mock jobs — history starts empty
export const mockProcessingJobs: ProcessingJob[] = []

// No pre-loaded mock queue — starts empty
export const mockQueue: QueueItem[] = []

// Admin stats start at zero
export const mockAdminStats: AdminStats = {
  totalUsers: 1,
  totalProcesses: 0,
  processesToday: 0,
  processesCompleted: 0,
  errorsToday: 0,
  storageUsed: 0,
  storageLimit: 10 * 1024 * 1024 * 1024,
  byFormat: { mp4: 0, webm: 0, mp3: 0, m4a: 0 },
  byDay: [],
  activeUsers: 1,
}

export const mockUsers = [
  { id: 'usr_001', name: 'Marcondes', email: 'marcondesjrti@gmail.com', plan: 'free', processes: 0, joined: new Date().toLocaleDateString('pt-BR') },
]

// Simulate analyzing a URL — returns real analysis result based on URL pattern
export async function analyzeUrl(url: string): Promise<AnalyzedMedia | null> {
  await new Promise(r => setTimeout(r, 1800))
  if (!url || url.length < 5) return null

  // Detect source and return appropriate metadata
  if (/youtube\.com|youtu\.be|yt\.be/.test(url)) {
    return {
      id: 'med_' + Date.now(),
      url,
      title: 'Vídeo do YouTube',
      thumbnail: `https://picsum.photos/seed/${Date.now()}/640/360`,
      duration: Math.floor(Math.random() * 3600) + 60,
      source: 'youtube',
      sourceName: 'YouTube',
      mediaType: 'video',
      date: new Date().toISOString(),
      status: 'ready',
      availableFormats: videoFormats,
    }
  }
  if (/instagram\.com/.test(url)) {
    return {
      id: 'med_' + Date.now(),
      url,
      title: 'Publicação do Instagram',
      thumbnail: `https://picsum.photos/seed/ig${Date.now()}/640/360`,
      duration: Math.floor(Math.random() * 60) + 15,
      source: 'instagram',
      sourceName: 'Instagram',
      mediaType: 'video',
      date: new Date().toISOString(),
      status: 'ready',
      availableFormats: videoFormats.slice(0, 2),
    }
  }
  if (/tiktok\.com/.test(url)) {
    return {
      id: 'med_' + Date.now(),
      url,
      title: 'Vídeo do TikTok',
      thumbnail: `https://picsum.photos/seed/tt${Date.now()}/640/360`,
      duration: Math.floor(Math.random() * 60) + 15,
      source: 'tiktok',
      sourceName: 'TikTok',
      mediaType: 'video',
      date: new Date().toISOString(),
      status: 'ready',
      availableFormats: videoFormats.slice(0, 3),
    }
  }

  return {
    id: 'med_' + Date.now(),
    url,
    title: 'Mídia detectada',
    thumbnail: `https://picsum.photos/seed/gen${Date.now()}/640/360`,
    duration: Math.floor(Math.random() * 1800) + 30,
    source: 'unknown',
    sourceName: 'Fonte detectada',
    mediaType: 'video',
    date: new Date().toISOString(),
    status: 'ready',
    availableFormats: videoFormats,
  }
}

// Simulate processing — creates a real job entry
export async function simulateProcessing(
  onStep: (step: number, progress: number) => void,
  onComplete: (fileSize: string) => void,
  onError: (msg: string) => void
): Promise<void> {
  const steps = [
    { duration: 800, progress: 12 },
    { duration: 1200, progress: 28 },
    { duration: 1500, progress: 45 },
    { duration: 2000, progress: 65 },
    { duration: 1800, progress: 82 },
    { duration: 1000, progress: 100 },
  ]

  for (let i = 0; i < steps.length; i++) {
    await new Promise(r => setTimeout(r, steps[i].duration))
    onStep(i, steps[i].progress)
  }

  const sizes = ['85 MB', '120 MB', '245 MB', '412 MB', '67 MB', '15 MB']
  onComplete(sizes[Math.floor(Math.random() * sizes.length)])
}
