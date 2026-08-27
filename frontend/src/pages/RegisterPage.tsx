import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Registration is owner-only for now
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) return
    if (password.length < 4) { setError('Senha mínimo 4 caracteres.'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
    const data = await res.json().catch(() => ({ error: 'Erro de conexão.' }))
    setLoading(false)
    if (data.success) navigate('/app')
    else setError(data.error || 'Erro ao cadastrar.')
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow mb-3">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M10 8 L26 16 L10 24 Z" fill="white" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">MediaFlow</h1>
        </div>

        {/* Registration closed notice */}
        <Card className="border-primary/20">
          <CardContent className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <Lock size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Registro Fechado</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                O MediaFlow está em fase de desenvolvimento. 
                Apenas o proprietário pode criar contas neste momento.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Nome</label>
                <Input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">E-mail do proprietário</label>
                <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Senha</label>
                <div className="relative">
                  <Input type={showPw ? 'text' : 'password'} placeholder="Mínimo 4 caracteres" value={password} onChange={e => setPassword(e.target.value)} required className="pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full gap-2 shadow-glow" disabled={loading}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? 'Criando conta...' : 'Criar minha conta'}
              </Button>
            </form>

            <p className="text-xs text-slate-600 text-center pt-2">
              Em breve o registro será aberto ao público com planos Free e Pro.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-400 mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
