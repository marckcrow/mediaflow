import React from 'react'
import { Link } from 'react-router-dom'
import {
  Film, Music, Clock, ListOrdered, Zap, Shield,
  Moon, ArrowRight, Play, Check, Menu, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'

const features = [
  { icon: Film, title: 'Conversão de vídeo', desc: 'Converta para MP4 e WebM em alta qualidade' },
  { icon: Music, title: 'Extração de áudio', desc: 'Extraia MP3 e M4A de qualquer vídeo' },
  { icon: Clock, title: 'Histórico completo', desc: 'Todos os seus processamentos salvos' },
  { icon: ListOrdered, title: 'Fila inteligente', desc: 'Processe vários arquivos simultaneamente' },
  { icon: Zap, title: 'Interface rápida', desc: 'Design moderno e otimizado para performance' },
  { icon: Shield, title: 'Segurança total', desc: 'Seus dados protegidos e processamento seguro' },
]

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-bg-dark/90 backdrop-blur-md border-b border-border-dark">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M10 8 L26 16 L10 24 Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-base">MediaFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Recursos</a>
            <button onClick={toggleTheme} className="text-slate-400 hover:text-white transition-colors">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-1.5">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gap-1.5 shadow-glow">
                Começar agora <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-surface-dark border-t border-border-dark px-4 py-4 flex flex-col gap-3">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full">Entrar</Button>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <Button className="w-full gap-2 shadow-glow">Começar agora <ArrowRight size={14} /></Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">Plataforma de mídia em nuvem</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up">
            Suas mídias.{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seu formato.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Uma plataforma simples para analisar, converter e organizar seus arquivos de mídia autorizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-glow text-base px-8">
                <Play size={16} /> Entrar
              </Button>
            </Link>
          </div>
        </div>

        {/* Mock preview */}
        <div className="max-w-3xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="rounded-2xl border border-border-dark bg-surface-dark shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-dark bg-bg-dark">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-500">MediaFlow — Dashboard</span>
              </div>
            </div>
            <div className="p-6 bg-bg-dark">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  <div className="h-3 w-40 rounded bg-slate-700/60 animate-pulse" />
                  <div className="h-10 rounded-xl bg-surface-dark border border-border-dark animate-pulse" />
                  <div className="h-9 w-28 rounded-lg bg-primary/20 self-start animate-pulse" />
                </div>
                <div className="w-full lg:w-72 h-40 rounded-xl bg-surface-dark border border-border-dark overflow-hidden animate-pulse">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                      <path d="M10 8 L26 16 L10 24 Z" fill="white" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 border-t border-border-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Tudo que você precisa</h2>
            <p className="text-slate-400">Ferramentas completas para processar suas mídias</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/30 transition-all duration-200 group animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">{title}</h3>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 p-10 shadow-glow">
            <h2 className="text-3xl font-bold mb-3">Pronto para começar?</h2>
            <p className="text-slate-400 mb-8">
              Crie sua conta gratuitamente e comece a processar suas mídias em segundos.
            </p>
            <Link to="/login">
              <Button size="lg" className="gap-2 shadow-glow text-base px-10">
                Acessar MediaFlow <ArrowRight size={16} />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Sem cartão de crédito</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Registro em breve</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-dark py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <path d="M10 8 L26 16 L10 24 Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-slate-300">MediaFlow</span>
          </div>
          <p className="text-xs text-slate-500">© 2024 MediaFlow. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Termos</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
