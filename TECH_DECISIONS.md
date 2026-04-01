# TECH_DECISIONS.md — Decisões Técnicas Justificadas
# Loja de Moda Premium / Luxo

> Cada decisão aqui tem uma justificativa baseada em: requisitos do produto, performance, DX (Developer Experience), custo e escalabilidade.

---

## 1. FRAMEWORK — Next.js 15 com App Router

**Decisão:** Next.js 15 com App Router (RSC — React Server Components)

**Justificativa:**
- **SEO crítico para e-commerce**: SSG/SSR nativo sem configuração extra. Páginas de produto indexadas pelo Google desde o primeiro crawl.
- **App Router é o futuro do Next.js**: Route Groups permitem layouts compartilhados limpos (ex: `(loja)` com header/footer, `(checkout)` minimal, `(auth)` centered).
- **React Server Components**: dados do produto são buscados no servidor → zero JS de fetching no cliente → menor bundle → LCP mais rápido.
- **Streaming e Suspense**: partes pesadas da PDP (reviews, relacionados) carregam de forma assíncrona sem bloquear o resto da página.
- **Alternativas consideradas e rejeitadas:**
  - Remix: menos ecossistema, curva maior para a equipe
  - Nuxt/Vue: equipe domina React
  - Shopify Hydrogen: lock-in total no ecossistema Shopify (limitante)

---

## 2. LINGUAGEM — TypeScript 5 (modo strict)

**Decisão:** TypeScript em modo strict, `noImplicitAny: true`, `strictNullChecks: true`

**Justificativa:**
- **QA Gate obrigatório**: nenhum `any` permitido. O compilador é a primeira linha de defesa.
- **Discriminated Union para ProductType**: a arquitetura "O Diretor" só funciona bem com TypeScript. O `type` ENUM no produto garante que o compilador force o tratamento de todos os casos (APPAREL | WATCH | ACCESSORY). Se adicionar um 4º tipo no futuro, o compilador avisa em todos os locais que precisam ser atualizados.
- **Zod + TypeScript**: validação em runtime + type safety em compile time. APIs externas nunca são trusted sem validação.
- **DX**: autocomplete em todos os componentes, refactoring seguro.

---

## 3. ESTILIZAÇÃO — Tailwind CSS 4

**Decisão:** Tailwind CSS 4 (versão mais recente, CSS-first config)

**Justificativa:**
- **Tailwind 4 muda a configuração para CSS nativo** (não mais tailwind.config.js para tudo) — mais rápido, mais simples.
- **Purge automático**: CSS de produção < 10KB. Nenhum CSS não-usado.
- **Design system como utilities**: os tokens do DESIGN_SYSTEM.md são definidos uma vez como CSS custom properties e reutilizados em todo o projeto.
- **Colocation**: estilos junto ao componente, sem criar arquivos .css separados (exceto globals.css e keyframes).
- **Alternativas consideradas:**
  - CSS Modules: verboso, não escala bem com design system rico
  - Styled Components/Emotion: runtime CSS-in-JS tem custo de performance (SSR hydration overhead)
  - Vanilla Extract: bom mas menos adotado, menor ecossistema de utilidades
  
**Exceção permitida:** CSS custom properties globais em `globals.css` para variáveis de design (cores, tipografia). Isso permite que o tema mude por `data-product-type` sem recalcular classes Tailwind.

---

## 4. ANIMAÇÕES — Framer Motion 11

**Decisão:** Framer Motion como biblioteca de animação principal

**Justificativa:**
- **Declarativo e integrado ao React**: sem manipulação de DOM manual, sem ref hacks.
- **layout animations**: a transição shared layout (PLP card → PDP hero) só é viável com Framer Motion `layoutId`. Implementar isso com CSS puro seria centenas de linhas de JavaScript customizado.
- **Gestures**: drag para fechar drawer (mobile), swipe na galeria de produto — abstrações de gestos prontas.
- **useScroll + useTransform**: parallax com 2 linhas de código, interpolação suave.
- **AnimatePresence**: mount/unmount animados de modais, toasts, drawers — essencial para UX de luxo.
- **Performance**: Framer Motion usa `transform` e `opacity` por padrão (GPU composited layers). Nunca anima `width`, `height`, `top`, `left` (que forçam reflow).
- **Alternativas consideradas:**
  - GSAP: mais poderoso para animações complexas, mas licença comercial paga e menor integração com React
  - CSS animations puras: insuficientes para layout animations e gestures
  - React Spring: similar ao Framer, mas menos features para gestures e scroll

---

## 5. CMS — Sanity (Headless)

**Decisão:** Sanity como CMS headless para conteúdo editorial

**Justificativa:**
- **Conteúdo dinâmico sem redeploy**: banners, textos de campanha, lookbooks, storytelling de relógios — tudo editável pelo cliente sem tocar código.
- **GROQ query language**: mais expressivo que GraphQL para conteúdo hierárquico. Uma query pode buscar banner + produtos relacionados + configuração de tema em uma única chamada.
- **Real-time preview**: cliente pode ver mudanças antes de publicar.
- **Sanity Studio**: painel de admin personalizável, pode ser embarcado em `/studio` no próprio projeto Next.js.
- **Campos para o Diretor**: o schema de produto no Sanity inclui o campo `type: 'APPAREL' | 'WATCH' | 'ACCESSORY'` e `tier: 'premium' | 'standard'` — o conteúdo editorial (storytelling) também é gerenciado por tipo.
- **Alternativas consideradas:**
  - Contentful: mais caro para escalar, menos flexível no schema
  - Strapi: self-hosted (mais custo de infra), boa opção se quiser zero vendor lock-in
  - Hardcoded MDX: não escalável, requer dev para cada mudança de conteúdo

**Divisão de responsabilidade (importante):**
```
Sanity CMS gerencia:       Prisma/PostgreSQL gerencia:
- Textos de campanha        - Produtos (preço, stock, SKU)
- Banners homepage          - Pedidos
- Storytelling de relógio   - Usuários
- Lookbooks                 - Endereços
- FAQ                       - Pagamentos
- Configurações visuais     - Wishlist
```

---

## 6. BANCO DE DADOS — Supabase (PostgreSQL + Prisma)

**Decisão:** Supabase como hosting do PostgreSQL + Prisma como ORM

**Justificativa:**
- **Supabase PostgreSQL**: managed database com free tier generoso, backups automáticos, réplicas de leitura, Row Level Security (RLS) nativo.
- **Prisma ORM**: type-safe queries, migrations versionadas, schema como source of truth, excelente integração com TypeScript (gera types automaticamente).
- **Supabase Storage**: storage de imagens alternativo ao Cloudinary para assets de usuário (ex: avatares). Para imagens de produto, usar Cloudinary (melhor transformação).
- **Supabase Auth**: pode ser usado como alternativa/complemento ao NextAuth se o cliente quiser magic links nativos.
- **Alternativas consideradas:**
  - PlanetScale (MySQL): sem suporte a FKs nativas (serverless constraints), menos flexível
  - MongoDB: não relacional; para e-commerce com pedidos e relações complexas, PostgreSQL é mais adequado
  - Firebase Firestore: NoSQL, consultas complexas são mais difíceis, custo imprevisível
  - Neon: boa alternativa ao Supabase (serverless PostgreSQL), considerar se Supabase tiver limitações

---

## 7. AUTENTICAÇÃO — NextAuth.js v5 (Auth.js)

**Decisão:** NextAuth.js v5 (Auth.js) com providers: Credentials + Google OAuth

**Justificativa:**
- **Integração nativa com Next.js App Router**: Auth.js v5 foi reescrito para funcionar com RSC e middleware do Next.js.
- **Credentials provider**: login com e-mail/senha com hash bcrypt via Prisma.
- **Google OAuth**: reduz atrito de cadastro (muito usuário abandona por não querer criar senha).
- **JWT + Session no cookie httpOnly**: seguro contra XSS, funciona bem com middleware de proteção de rotas.
- **Middleware de proteção de rotas**:
  ```typescript
  // middleware.ts
  export { auth as middleware } from '@/lib/auth/options'
  export const config = {
    matcher: ['/conta/:path*', '/checkout/:path*', '/confirmacao/:path*']
  }
  ```
- **Alternativas consideradas:**
  - Clerk: excelente DX, mas caro para escalar (custo por MAU), UI customizável mas limitada
  - Supabase Auth: boa opção se já usa Supabase, mas NextAuth é mais integrado com Next.js
  - Auth0: poderoso, mas overhead para este escopo

---

## 8. PAGAMENTOS

### 8.1 Stripe (Internacional)
**Decisão:** Stripe como gateway principal

**Justificativa:**
- API mais bem documentada do mercado
- Stripe Elements: formulário de pagamento seguro com PCI compliance automático
- Payment Intents API: suporte a 3D Secure, prevenção de fraude
- Apple Pay / Google Pay sem código extra (via Payment Request Button)
- Webhooks confiáveis com verificação de assinatura
- Dashboard analítico de pagamentos incluído

### 8.2 MercadoPago (Brasil)
**Decisão:** MercadoPago para métodos de pagamento brasileiros

**Justificativa:**
- PIX é o método de pagamento #1 do Brasil (2024+): taxas zero, confirmação instantânea
- Boleto bancário: ainda relevante para público 35+
- Parcelamento no cartão: cultura brasileira de comprar parcelado (12x sem juros possível)
- MercadoPago tem Checkout Transparente (sem redirect para o site deles)
- Alternativa: Pagar.me (melhor para alguns casos B2B), mas MercadoPago tem mais documentação

### 8.3 Coexistência Stripe + MercadoPago
```typescript
// checkout/pagamento/page.tsx
// Tabs: [Cartão Internacional] [PIX] [Boleto] [Cartão Nacional]
// Cartão Internacional → Stripe
// PIX, Boleto, Cartão Nacional → MercadoPago
// Ambos processam independentemente; pedido criado após confirmação de qualquer um
```

---

## 9. IMAGENS — Cloudinary

**Decisão:** Cloudinary como CDN e serviço de otimização de imagens

**Justificativa:**
- **Transformações automáticas**: resize, crop, format (WebP/AVIF automático), qualidade adaptativa
- **next/image loader customizado**: URLs de Cloudinary passam pelo loader do Next.js automaticamente
- **Responsive images**: CDN serve tamanho exato para cada viewport (evita carregar imagem 2000px em mobile)
- **Lazy loading** integrado com IntersectionObserver
- **Armazenamento**: imagens de produto sobem via painel ou API (automatização futura)
- **Alternativa:** Vercel Image Optimization (mais simples, sem custo extra no Vercel) — considerar para MVP, migrar para Cloudinary ao escalar

---

## 10. ESTADO GLOBAL — Zustand

**Decisão:** Zustand para estado global do cliente

**Justificativa:**
- **Minimal boilerplate**: 5 linhas para criar uma store vs 50 no Redux
- **TypeScript perfeito**: stores com tipos inferidos
- **Persist middleware**: carrinho e wishlist persistidos no localStorage automaticamente
- **Devtools**: integração com Redux DevTools para debug
- **Stores planejadas:**
  ```typescript
  // store/cartStore.ts
  interface CartStore {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product, variant: ProductVariant, qty: number) => void
    removeItem: (variantId: string) => void
    updateQty: (variantId: string, qty: number) => void
    clearCart: () => void
    toggleDrawer: () => void
    total: number  // computed
    itemCount: number  // computed
  }

  // store/wishlistStore.ts
  interface WishlistStore {
    items: string[]  // product IDs
    add: (id: string) => void
    remove: (id: string) => void
    has: (id: string) => boolean
  }

  // store/uiStore.ts
  interface UIStore {
    cartOpen: boolean
    searchOpen: boolean
    mobileNavOpen: boolean
    activeToasts: Toast[]
    addToast: (toast: Toast) => void
    removeToast: (id: string) => void
  }
  ```
- **Alternativas consideradas:**
  - Redux Toolkit: excelente mas excessivo para este escopo
  - Context API: re-renders desnecessários quando o estado do carrinho atualiza (pode afetar performance)
  - Jotai: boa opção atômica, mas Zustand é mais comum para stores de carrinho

---

## 11. PERSISTÊNCIA DO CARRINHO

**Decisão:** Zustand persist (localStorage) + sincronização com servidor na autenticação

**Justificativa:**
```
Visitante não logado:
  → Carrinho salvo em localStorage via Zustand persist
  → Persiste entre sessões no mesmo dispositivo
  
Usuário faz login:
  → Carrinho local é "mergeado" com carrinho salvo no servidor
  → Se mesmo produto em ambos: soma as quantidades
  → Servidor passa a ser a fonte de verdade

Usuário logado em múltiplos dispositivos:
  → Carrinho sincronizado via DB (tabela cart_sessions)
  → Polling a cada 30s OU WebSocket (decidir por custo/complexidade)
  
Checkout:
  → Sempre usa o carrinho do servidor (não localStorage)
  → Garante stock atualizado no momento do pagamento
```

---

## 12. DEPLOY — Vercel

**Decisão:** Vercel como plataforma de deploy

**Justificativa:**
- **Zero config para Next.js**: Vercel é a empresa criadora do Next.js — integração perfeita
- **Edge Network**: CDN global, páginas ISR revalidadas no edge
- **Preview deployments**: cada PR gera uma URL de preview (essencial para review de design)
- **Vercel Analytics**: Core Web Vitals reais por rota
- **Serverless Functions**: API routes do Next.js viram serverless functions automaticamente
- **Vercel KV** (Redis): pode ser usado para rate limiting nas APIs de pagamento
- **Custo**: plano Hobby gratuito para MVP, Pro (~$20/mês) para produção

---

## 13. E-MAIL TRANSACIONAL — Resend

**Decisão:** Resend para e-mails transacionais

**Justificativa:**
- **API simples**: `resend.emails.send()` em uma linha, com React Email para templates
- **React Email**: templates de e-mail em JSX/TSX — mesma linguagem do projeto
- **Deliverability alta**: infraestrutura dedicada, não cai em spam
- **Alternativas:** SendGrid (mais caro, mais burocrático), Nodemailer (precisa configurar SMTP)

**E-mails planejados:**
```
1. Boas-vindas ao cadastro
2. Confirmação de pedido (com itens, preços, endereço)
3. Atualização de status (Confirmado → Em processamento → Enviado → Entregue)
4. Código de rastreio
5. Abandono de carrinho (opcional, 2h após abandono)
6. Confirmação de devolução
7. Recuperação de senha
```

---

## 14. ARQUITETURA "O DIRETOR" — Decisão Central

**Decisão:** Um único `ProductPage` como Diretor que roteia para `LayoutCasual` ou `LayoutLuxury`

**Justificativa técnica:**
- **Evita duplicação de rotas**: não precisa de `/relogios/[slug]` e `/roupas/[slug]` com código duplicado. Uma única rota `/produtos/[slug]` serve todos os tipos.
- **Open/Closed Principle**: para adicionar um 4º tipo no futuro (ex: FRAGRANCE), basta criar `AccessoryProduct`, adicionar o case no Diretor, e criar um novo layout se necessário — sem modificar código existente.
- **TypeScript exhaustive check**: o compilador garante que todos os tipos são tratados.
- **Component Forge (casual/luxury)**: componentes pesados do modo luxury são `dynamic imports` — zero impacto na performance do modo casual.

```typescript
// Lazy loading de componentes luxury (não impactam bundle do casual):
const LayoutLuxury = dynamic(
  () => import('@/components/forge/luxury/LayoutLuxury'),
  {
    loading: () => <LuxurySkeleton />,
    ssr: true,  // ainda renderizado no servidor
  }
)

// Resultado: usuário comprando roupas (APPAREL) nunca carrega
// os componentes pesados do modo luxury (Three.js, galeria 360°, etc.)
```

---

## 15. QA GATE — Requisitos Não-Negociáveis

| Requisito | Ferramenta | Threshold |
|---|---|---|
| TypeScript sem `any` | `tsc --noEmit` no CI | 0 erros |
| Lighthouse Performance | Lighthouse CI | ≥ 90 |
| Lighthouse Accessibility | Lighthouse CI | ≥ 90 |
| Lighthouse SEO | Lighthouse CI | ≥ 90 |
| Hydration errors | `next build` + Playwright | 0 erros no console |
| Bundle size | `@next/bundle-analyzer` | < 150KB First Load JS |
| Core Web Vitals LCP | Vercel Analytics (real) | < 2.5s |
| Core Web Vitals CLS | Vercel Analytics (real) | < 0.1 |

**CI/CD Pipeline:**
```yaml
# .github/workflows/ci.yml
steps:
  - TypeScript check (tsc --noEmit)
  - ESLint (eslint . --ext .ts,.tsx)
  - Unit tests (vitest)
  - E2E tests (Playwright: checkout flow, add to cart, auth)
  - Lighthouse CI (build + test)
  - Deploy preview (Vercel)
```

---

## 16. RESUMO EXECUTIVO DE TECNOLOGIAS

| Camada | Tecnologia | Versão | Justificativa em 1 linha |
|---|---|---|---|
| Framework | Next.js | 15 | SSR/SSG híbrido, SEO nativo, RSC |
| Linguagem | TypeScript | 5 | Type safety, QA Gate, Discriminated Union |
| Estilo | Tailwind CSS | 4 | Utility-first, purge, design tokens |
| Animação | Framer Motion | 11 | Layout animations, gestures, scroll effects |
| Validação | Zod | 3 | Runtime type checking, parse de APIs |
| ORM | Prisma | 5 | Type-safe queries, migrations |
| DB | Supabase/PostgreSQL | — | Managed, RLS, storage incluído |
| Auth | NextAuth.js | v5 | RSC nativo, Google + Credentials |
| CMS | Sanity | 3 | Conteúdo editorial sem redeploy |
| Imagens | Cloudinary | — | CDN global, transformações automáticas |
| Pagamentos BR | MercadoPago | — | PIX, boleto, cartão parcelado |
| Pagamentos INT | Stripe | — | Cartão, Apple/Google Pay, webhooks |
| E-mail | Resend | — | React Email, alta deliverability |
| Estado | Zustand | 4 | Minimal, persist, TypeScript perfeito |
| Deploy | Vercel | — | Zero config Next.js, preview deployments |
| Testes E2E | Playwright | — | Cross-browser, headless |
| Testes Unit | Vitest | — | Compatível com Vite, mais rápido que Jest |

---

---

## 17. PRÓXIMOS PASSOS (Ordem de Implementação)

```
SPRINT 1 — Fundação (semana 1-2)
  □ Setup Next.js 15 + TypeScript + Tailwind 4 + Framer Motion
  □ Definir tokens de design em globals.css (cores, tipografia, espaçamento)
  □ Componentes UI base: Button, Input, Badge, Toast, Skeleton
  □ Layout: Header (desktop + mobile nav) + Footer
  □ Configurar Supabase + Prisma schema + migrations
  □ NextAuth com Google provider

SPRINT 2 — Produto (semana 3-4)
  □ Data model completo (Zod schemas + Prisma types)
  □ Component Forge: casual/LayoutCasual
  □ Component Forge: luxury/LayoutLuxury
  □ O Diretor: ProductPage com routing por type
  □ ProductCard + ProductGrid
  □ PLP: filtros, grid, skeleton

SPRINT 3 — Compra (semana 5-6)
  □ Zustand cartStore + cartDrawer
  □ Checkout multi-step (endereço → envio → pagamento)
  □ Integração MercadoPago (PIX + boleto)
  □ Integração Stripe (cartão)
  □ Página de confirmação
  □ E-mails transacionais (Resend)

SPRINT 4 — Conta e Conteúdo (semana 7-8)
  □ Área de conta (pedidos, endereços, wishlist)
  □ Sanity CMS setup + schemas
  □ Homepage completa (todas as seções)
  □ Animações Framer Motion (casual + luxury)
  □ SEO: metadata, sitemap, JSON-LD

SPRINT 5 — QA e Launch (semana 9-10)
  □ Lighthouse CI setup
  □ Playwright E2E tests (checkout flow)
  □ TypeScript strict audit
  □ Performance optimization
  □ Deploy Vercel + configurar domínio
  □ Google Analytics 4 + Meta Pixel
```
