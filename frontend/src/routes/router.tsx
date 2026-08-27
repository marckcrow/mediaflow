import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { QueuePage } from '@/pages/QueuePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AdminPage } from '@/pages/AdminPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    path: '/app',
    element: <AppLayout title="Dashboard"><DashboardPage /></AppLayout>,
  },
  {
    path: '/app/historico',
    element: <AppLayout title="Histórico"><HistoryPage /></AppLayout>,
  },
  {
    path: '/app/favoritos',
    element: <AppLayout title="Favoritos"><FavoritesPage /></AppLayout>,
  },
  {
    path: '/app/fila',
    element: <AppLayout title="Fila"><QueuePage /></AppLayout>,
  },
  {
    path: '/app/perfil',
    element: <AppLayout title="Perfil"><ProfilePage /></AppLayout>,
  },
  { path: '/admin', element: <AdminPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
