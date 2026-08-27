import { Router } from 'express'

export const adminRouter = Router()

// Admin middleware stub
function adminMiddleware(req: any, res: any, next: any) {
  // TODO: Check req.user.isAdmin
  next()
}

// GET /api/admin/stats
adminRouter.get('/stats', adminMiddleware, (_req, res) => {
  res.json({
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
  })
})

// GET /api/admin/users
adminRouter.get('/users', adminMiddleware, (_req, res) => {
  res.json({
    users: [
      { id: 'usr_001', name: 'Carlos Eduardo', email: 'carlos@email.com', plan: 'free', processes: 47, joined: '2024-03-15' },
      { id: 'usr_002', name: 'Ana Paula Silva', email: 'ana.paula@email.com', plan: 'pro', processes: 312, joined: '2024-02-01' },
      { id: 'usr_003', name: 'Ricardo Mendes', email: 'ricardo.m@email.com', plan: 'free', processes: 12, joined: '2024-06-10' },
      { id: 'usr_004', name: 'Fernanda Costa', email: 'fernanda@email.com', plan: 'business', processes: 1847, joined: '2024-01-05' },
    ],
    total: 1247,
  })
})
