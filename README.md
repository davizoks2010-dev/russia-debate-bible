# КРЕМЛЬ — Sistema de Inteligência Diplomática

> Painel de comando da Delegação Soberana da Federação Russa — SOCHUM · CIMED 2026.
> Tema: defesa dos direitos da criança em conflitos armados e soberania nacional.

Aplicação estática modular, deploy direto na Vercel (HTML + CSS + JS nativos + API serverless).

---

## Estrutura

```
kremlin/
├── index.html              # markup enxuto (~250 linhas)
├── assets/
│   ├── css/                # design system modular (tokens → fx)
│   └── js/                 # 13 módulos ES (data, auth, nav, sword, intel, …)
├── api/                    # rotas Vercel (Vercel Blob + KV)
│   ├── files/              # upload, list, delete, [id]
│   └── notes/              # CRUD notas Tiptap
├── package.json
├── vercel.json
└── .env.local.example
```

## Setup local

```bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Servir o front (sem backend)
npx serve .

# 3. Para rodar com backend (Vercel dev)
vercel link                  # vincula a um projeto Vercel
vercel env pull .env.local   # baixa BLOB/KV vars
npm run dev                  # vercel dev
```

## Acesso

- Códigos: `0502026`, `260726`, `kr5`, `russia`, `msk5`, `kremlin`, `5326658`
- Header para API: `X-Access-Code: <código>`

## Módulos

| Aba | Função | Atalho |
|---|---|---|
| War Room | Painel central + bento | `1` |
| Inteligência | 30 dossiês com 8-12 defesas | `2` |
| Arsenal | 25 ataques catalogados | `3` |
| Escudo | 25 linhas defensivas | `4` |
| Requerimentos | Gerador de discursos | `5` |
| Discurso | Pins + drawer | `6` |
| Arquivos | Upload + Tiptap | `7` |
| Espada (open nav) | — | `M` |
| Retaliação | Modal vermelho | `Ω` |

## Stack

- **Frontend**: HTML + CSS variables + JS ES Modules (zero build)
- **Editor**: Tiptap 2.6 (CDN)
- **Storage**: Vercel Blob (binários) + Vercel KV (metadados + notas)
- **Deploy**: Vercel