# MediaFlow

Plataforma de processamento e conversão de mídia a partir de URLs autorizadas.

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS v3 + shadcn/ui + React Router v6 + TanStack Query
- **Backend:** Node.js + Express + TypeScript (API REST)

## Começando

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

### Backend

```bash
cd backend
npm install
npm run dev
```

API: http://localhost:3001

## Estrutura

```
mediaflow/
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/  # UI + Layout + Shared
│   │   ├── pages/       # All pages
│   │   ├── contexts/    # Auth + Theme
│   │   ├── mocks/       # Mock data
│   │   ├── types/       # TypeScript types
│   │   └── routes/      # React Router
│   └── ...
└── backend/           # Express API
    └── src/
        ├── routes/      # API endpoints
        ├── middleware/   # Auth, rate limit
        └── providers/   # Media source adapters
```

## Credenciais de teste

- Qualquer e-mail/senha (mín. 4 caracteres) para login normal
- `admin@mediaflow.com` para acesso admin

## Segurança

Este sistema é destinado exclusivamente a conteúdos que o usuário possui autorização para baixar, reutilizar ou converter. Não implementar mecanismos para contornar DRM, paywalls ou autenticação de plataformas.
