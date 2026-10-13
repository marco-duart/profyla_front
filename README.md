# Profyla — Front-end

React 19 + TypeScript + Vite, Stitches (design system escuro com "glass"), React Router 7.

## Rodando

```bash
cp .env.example .env     # ajuste VITE_BASE_URL (ex.: http://localhost:3000)
npm install
npm run dev              # http://localhost:5173
```

A API (Rails) fica no repositório `profyla_api`. Credenciais de demonstração: veja o README da API (`rails db:seed`).

## Qualidade

```bash
npm run lint             # ESLint
npx tsc -b --noEmit      # tipos
npm test                 # Vitest + Testing Library (jsdom)
npm run build            # tsc -b && vite build
```

O workflow `.github/workflows/ci.yml` roda lint, tipos, testes e build a cada push/PR (cota gratuita do GitHub Actions).

## Estrutura

- `src/pages/StaffKit` e `src/pages/CandidateKit`: primitivos visuais de cada área. Páginas de staff importam só do StaffKit; páginas de candidato só do CandidateKit.
- `src/services`: chamadas à API (um diretório por domínio, `dto.ts` com os tipos).
- `src/utils`: máscaras (`masks.ts`), datas (`format.ts`), rótulos de domínio (`labels.ts`), erros da API (`api-error.ts`).
- `src/configs/api.ts`: cliente axios (rotação do token e tratamento de 401).

## Docker (build estático servido por nginx)

```bash
docker build --build-arg VITE_BASE_URL=https://api.seu-dominio.com -t profyla-front .
docker run -p 8080:80 profyla-front       # http://localhost:8080  (health: /healthz)
```

O endereço da API é embutido no bundle em tempo de build. O `nginx.conf` faz o fallback de SPA para `index.html`.
