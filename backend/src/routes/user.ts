import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const userRouter = Router()

// Mock auth middleware stub (replace with real JWT validation)
function authMiddleware(req: any, res: any, next: any) {
  // TODO: Validate JWT, set req.user
  req.user = { id: 'usr_001', isAdmin: false }
  next()
}

// GET /api/user/profile
userRouter.get('/profile', authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
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
  })
})

// GET /api/user/usage
userRouter.get('/usage', authMiddleware, (req, res) => {
  res.json({
    monthlyUsed: 23,
    monthlyLimit: 100,
    storageUsed: 1.2 * 1024 * 1024 * 1024,
    storageLimit: 2 * 1024 * 1024 * 1024,
    totalProcesses: 47,
  })
})
