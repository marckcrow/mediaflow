import type { AnalyzedMedia, ProcessingJob, User, AdminStats, QueueItem, FormatOption } from '@/types'

export const mockUser: User = {
  id: 'usr_001',
  name: 'Carlos Eduardo',
  email: 'carlos.eduardo@email.com',
  plan: 'free',
  isAdmin: false,
  createdAt: '2024-03-15T10:00:00Z',
  processingCount: 47,
  storageUsed: 1.2 * 1024 * 1024 * 1024,
  storageLimit: 2 * 1024 * 1024 * 1024,
  monthlyLimit: 100,
  monthlyUsed: 23,
}

export const mockAdminUser: User = {
  id: 'usr_admin',
  name: 'Admin MediaFlow',
  email: 'admin@mediaflow.com',
  plan: 'business',
  isAdmin: true,
  createdAt: '2024-01-01T00:00:00Z',
  processingCount: 0,
  storageUsed: 0,
  storageLimit: 0,
  monthlyLimit: 9999,
  monthlyUsed: 0,
}

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

export const mockAnalyzedVideos: AnalyzedMedia[] = [
  {
    id: 'med_001',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    thumbnail: 'https://picsum.photos/seed/rick/640/360',
    duration: 213,
    source: 'youtube',
    sourceName: 'YouTube',
    mediaType: 'video',
    date: new Date().toISOString(),
    status: 'ready',
    availableFormats: videoFormats,
  },
  {
    id: 'med_002',
    url: 'https://www.instagram.com/reel/ABC123',
    title: 'Sunset Timelapse - Reel',
    thumbnail: 'https://picsum.photos/seed/sunset/640/360',
    duration: 45,
    source: 'instagram',
    sourceName: 'Instagram',
    mediaType: 'video',
    date: new Date().toISOString(),
    status: 'ready',
    availableFormats: videoFormats.slice(0, 2),
  },
  {
    id: 'med_003',
    url: 'https://www.tiktok.com/@user/video/123456',
    title: 'Dance Challenge 2024',
    thumbnail: 'https://picsum.photos/seed/dance/640/360',
    duration: 30,
    source: 'tiktok',
    sourceName: 'TikTok',
    mediaType: 'video',
    date: new Date().toISOString(),
    status: 'ready',
    availableFormats: videoFormats.slice(0, 3),
  },
  {
    id: 'med_004',
    url: 'https://soundcloud.com/artist/track',
    title: 'Podcast: O Futuro da IA',
    thumbnail: 'https://picsum.photos/seed/podcast/640/360',
    duration: 3600,
    source: 'soundcloud',
    sourceName: 'SoundCloud',
    mediaType: 'audio',
    date: new Date().toISOString(),
    status: 'ready',
    availableFormats: audioFormats,
  },
]

export const mockProcessingJobs: ProcessingJob[] = [
  {
    id: 'job_001',
    mediaId: 'med_001',
    title: 'Rick Astley - Never Gonna Give You Up',
    format: 'mp4',
    formatLabel: 'MP4 1080p',
    quality: '1080p',
    status: 'completed',
    progress: 100,
    currentStep: 5,
    fileSize: '245 MB',
    duration: 213,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    isFavorite: true,
    source: 'youtube',
    sourceName: 'YouTube',
    thumbnail: 'https://picsum.photos/seed/rick/640/360',
  },
  {
    id: 'job_002',
    mediaId: 'med_002',
    title: 'Podcast: O Futuro da IA',
    format: 'mp3',
    formatLabel: 'MP3 320kbps',
    status: 'completed',
    progress: 100,
    currentStep: 5,
    fileSize: '11 MB',
    duration: 3600,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isFavorite: false,
    source: 'soundcloud',
    sourceName: 'SoundCloud',
    thumbnail: 'https://picsum.photos/seed/podcast/640/360',
  },
  {
    id: 'job_003',
    mediaId: 'med_003',
    title: 'Tutorial React Avançado - Parte 1',
    format: 'mp4',
    formatLabel: 'MP4 720p',
    quality: '720p',
    status: 'processing',
    progress: 68,
    currentStep: 3,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isFavorite: false,
    source: 'youtube',
    sourceName: 'YouTube',
    thumbnail: 'https://picsum.photos/seed/react/640/360',
  },
  {
    id: 'job_004',
    mediaId: 'med_004',
    title: 'Keynote WWDC 2024',
    format: 'mp4',
    formatLabel: 'MP4 1080p',
    quality: '1080p',
    status: 'pending',
    progress: 0,
    currentStep: 0,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isFavorite: true,
    source: 'youtube',
    sourceName: 'YouTube',
    thumbnail: 'https://picsum.photos/seed/wwdc/640/360',
  },
  {
    id: 'job_005',
    mediaId: 'med_005',
    title: 'Mix Musical - Summer Vibes',
    format: 'mp3',
    formatLabel: 'MP3 320kbps',
    status: 'error',
    progress: 45,
    currentStep: 3,
    error: 'Falha na conexão com o servidor de origem',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: false,
    source: 'unknown',
    sourceName: 'Desconhecido',
    thumbnail: 'https://picsum.photos/seed/music/640/360',
  },
  {
    id: 'job_006',
    mediaId: 'med_006',
    title: 'Documentário Natureza - Episódio 3',
    format: 'mp4',
    formatLabel: 'MP4 1080p',
    quality: '1080p',
    status: 'completed',
    progress: 100,
    currentStep: 5,
    fileSize: '890 MB',
    duration: 3600,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    isFavorite: false,
    source: 'vimeo',
    sourceName: 'Vimeo',
    thumbnail: 'https://picsum.photos/seed/nature/640/360',
  },
  {
    id: 'job_007',
    mediaId: 'med_007',
    title: 'Entrevista: Design Systems',
    format: 'mp3',
    formatLabel: 'MP3 192kbps',
    status: 'completed',
    progress: 100,
    currentStep: 5,
    fileSize: '42 MB',
    duration: 3600,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000).toISOString(),
    isFavorite: true,
    source: 'youtube',
    sourceName: 'YouTube',
    thumbnail: 'https://picsum.photos/seed/design/640/360',
  },
  {
    id: 'job_008',
    mediaId: 'med_008',
    title: 'Vlog de Viagem - Portugal',
    format: 'webm',
    formatLabel: 'WebM 1080p',
    quality: '1080p',
    status: 'expired',
    progress: 100,
    currentStep: 5,
    fileSize: '180 MB',
    duration: 900,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
    isFavorite: false,
    source: 'facebook',
    sourceName: 'Facebook',
    thumbnail: 'https://picsum.photos/seed/portugal/640/360',
  },
]

export const mockQueue: QueueItem[] = [
  { id: 'job_003', position: 1, title: 'Tutorial React Avançado', status: 'processing', progress: 68 },
  { id: 'job_004', position: 2, title: 'Keynote WWDC 2024', status: 'waiting' },
  { id: 'job_009', position: 3, title: 'Conferência Tech Summit 2024', status: 'waiting' },
  { id: 'job_010', position: 4, title: 'Palestra UX Design', status: 'waiting' },
  { id: 'job_006', position: 5, title: 'Documentário Natureza', status: 'completed' },
]

export const mockAdminStats: AdminStats = {
  totalUsers: 1247,
  totalProcesses: 8934,
  processesToday: 156,
  processesCompleted: 142,
  errorsToday: 8,
  storageUsed: 487 * 1024 * 1024 * 1024,
  storageLimit: 1000 * 1024 * 1024 * 1024,
  byFormat: { mp4: 4200, webm: 890, mp3: 3100, m4a: 744 },
  byDay: [
    { date: '20/08', count: 134, errors: 5 },
    { date: '21/08', count: 156, errors: 3 },
    { date: '22/08', count: 189, errors: 7 },
    { date: '23/08', count: 143, errors: 2 },
    { date: '24/08', count: 98, errors: 4 },
    { date: '25/08', count: 167, errors: 6 },
    { date: '26/08', count: 156, errors: 8 },
  ],
  activeUsers: 312,
}

export const mockUsers = [
  { id: 'usr_001', name: 'Carlos Eduardo', email: 'carlos@email.com', plan: 'free', processes: 47, joined: '2024-03-15' },
  { id: 'usr_002', name: 'Ana Paula Silva', email: 'ana.paula@email.com', plan: 'pro', processes: 312, joined: '2024-02-01' },
  { id: 'usr_003', name: 'Ricardo Mendes', email: 'ricardo.m@email.com', plan: 'free', processes: 12, joined: '2024-06-10' },
  { id: 'usr_004', name: 'Fernanda Costa', email: 'fernanda@email.com', plan: 'business', processes: 1847, joined: '2024-01-05' },
  { id: 'usr_005', name: 'Bruno Oliveira', email: 'bruno.oliveira@email.com', plan: 'pro', processes: 289, joined: '2024-04-20' },
]

// Simulate analyzing a URL
export async function analyzeUrl(url: string): Promise<AnalyzedMedia | null> {
  await new Promise(r => setTimeout(r, 1800))
  if (!url || url.length < 5) return null

  // Detect source
  if (/youtube\.com|youtu\.be|yt\.be/.test(url)) {
    return {
      id: 'med_' + Date.now(),
      url,
      title: 'Vídeo do YouTube - ' + url.substring(0, 40) + '...',
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
  // Generic
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

// Simulate processing
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
    if (Math.random() < 0.05) {
      onError('Erro na conexão. Tente novamente.')
      return
    }
    onStep(i, steps[i].progress)
  }

  const sizes = ['85 MB', '120 MB', '245 MB', '412 MB', '67 MB', '15 MB']
  onComplete(sizes[Math.floor(Math.random() * sizes.length)])
}
