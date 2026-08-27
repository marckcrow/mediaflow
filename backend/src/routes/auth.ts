import { Router } from 'express'
import { z } from 'zod'

export const authRouter = Router()

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(4, 'Senha mínimo 4 caracteres'),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// In-memory users (replace with DB)
const users: Map<string, any> = new Map()

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body)
    if (Array.from(users.values()).some(u => u.email === email)) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' })
    }
    const user = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password, // TODO: hash with bcrypt
      plan: 'free',
      isAdmin: false,
      createdAt: new Date().toISOString(),
      processingCount: 0,
      storageUsed: 0,
      storageLimit: 2 * 1024 * 1024 * 1024,
      monthlyLimit: 100,
      monthlyUsed: 0,
    }
    users.set(user.id, user)
    const { password: _, ...safeUser } = user
    res.status(201).json({ user: safeUser, token: 'mock_token_' + user.id })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = Array.from(users.values()).find(u => u.email === email && u.password === password)
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
    }
    const { password: _, ...safeUser } = user
    res.json({ user: safeUser, token: 'mock_token_' + user.id })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/auth/forgot-password
authRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  // TODO: Send email with reset link
  res.json({ message: `Instruções enviadas para ${email || 'o e-mail informado'}.` })
})
