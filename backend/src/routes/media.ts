import { Router } from 'express'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const mediaRouter = Router()

// Validation schemas
const analyzeSchema = z.object({ url: z.string().url('URL inválida') })
const processSchema = z.object({
  mediaId: z.string(),
  format: z.enum(['mp4', 'webm', 'mp3', 'm4a']),
  quality: z.string().optional(),
})

// In-memory store (replace with DB later)
const mediaStore: Map<string, any> = new Map()
const queueStore: Map<string, any> = new Map()

// POST /api/media/analyze — Analyze a URL
mediaRouter.post('/analyze', async (req, res) => {
  try {
    const { url } = analyzeSchema.parse(req.body)

    // Basic URL validation
    if (!url || url.length < 5) {
      return res.status(400).json({ error: 'URL inválida ou vazia.' })
    }

    // TODO: Integrate with MediaProvider architecture
    // For now, return mock data
    const media = {
      id: uuidv4(),
      url,
      title: 'Mídia detectada',
      thumbnail: `https://picsum.photos/seed/${Date.now()}/640/360`,
      duration: Math.floor(Math.random() * 3600) + 60,
      source: detectSource(url),
      sourceName: getSourceName(url),
      mediaType: 'video',
      date: new Date().toISOString(),
      status: 'ready',
      availableFormats: [
        { format: 'mp4', label: 'MP4', quality: '1080p', resolution: '1920x1080', estimatedSize: '~245 MB', available: true },
        { format: 'mp3', label: 'MP3', bitrate: 320, estimatedSize: '~11 MB', available: true },
      ],
    }

    mediaStore.set(media.id, media)
    res.json(media)
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao analisar URL.' })
  }
})

// POST /api/media/process — Start processing
mediaRouter.post('/process', async (req, res) => {
  try {
    const { mediaId, format, quality } = processSchema.parse(req.body)
    const media = mediaStore.get(mediaId)

    const job = {
      id: uuidv4(),
      mediaId,
      title: media?.title ?? 'Mídia',
      format,
      formatLabel: `${format.toUpperCase()}${quality ? ` ${quality}` : ''}`,
      quality,
      status: 'pending',
      progress: 0,
      currentStep: 0,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      source: media?.source ?? 'unknown',
      sourceName: media?.sourceName ?? 'Desconhecido',
    }

    queueStore.set(job.id, job)

    // TODO: Add to actual processing queue (Bull/BullMQ/Redis)
    // Simulate async processing start
    setTimeout(() => {
      const q = queueStore.get(job.id)
      if (q) {
        q.status = 'processing'
        queueStore.set(job.id, q)
      }
    }, 500)

    res.status(202).json({ job })
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao iniciar processamento.' })
  }
})

// GET /api/media/status/:id — Get job status
mediaRouter.get('/status/:id', (req, res) => {
  const job = queueStore.get(req.params.id)
  if (!job) return res.status(404).json({ error: 'Job não encontrado.' })
  res.json(job)
})

// GET /api/media/history — Get user history
mediaRouter.get('/history', (_req, res) => {
  const jobs = Array.from(queueStore.values())
  res.json({ jobs, total: jobs.length })
})

// DELETE /api/media/:id — Delete a job
mediaRouter.delete('/:id', (req, res) => {
  queueStore.delete(req.params.id)
  res.status(204).send()
})

// --- Helpers ---
function detectSource(url: string): string {
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube'
  if (/instagram\.com/.test(url)) return 'instagram'
  if (/tiktok\.com/.test(url)) return 'tiktok'
  if (/vimeo\.com/.test(url)) return 'vimeo'
  if (/facebook\.com/.test(url)) return 'facebook'
  return 'unknown'
}

function getSourceName(url: string): string {
  if (/youtube\.com|youtu\.be/.test(url)) return 'YouTube'
  if (/instagram\.com/.test(url)) return 'Instagram'
  if (/tiktok\.com/.test(url)) return 'TikTok'
  if (/vimeo\.com/.test(url)) return 'Vimeo'
  if (/facebook\.com/.test(url)) return 'Facebook'
  return 'Fonte detectada'
}
