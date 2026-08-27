import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { mediaRouter } from './routes/media.js'
import { authRouter } from './routes/auth.js'
import { userRouter } from './routes/user.js'
import { adminRouter } from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Tente novamente em alguns minutos.' },
})
app.use('/api/', limiter)

// Routes
app.use('/api/media', mediaRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Error]', err.message)
  res.status(500).json({ error: 'Erro interno do servidor.' })
})

app.listen(PORT, () => {
  console.log(`[MediaFlow API] Running on http://localhost:${PORT}`)
  console.log(`[MediaFlow API] Health: http://localhost:${PORT}/api/health`)
})

export default app
