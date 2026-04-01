# SPEC.md — Especificação Completa do Projeto
# Loja de Moda Premium / Luxo

> **Versão:** 1.0  
> **Data:** 2026-03-31  
> **Status:** Documento de Arquitetura — Fase de Planejamento

---

## 1. VISÃO DO PRODUTO

### 1.1 Proposta de Valor

Uma loja de e-commerce premium/luxo focada em três categorias principais:
- **Roupas** (masculino e feminino): coleções sazonais, formalwear, casual premium
- **Relógios**: de entrada de luxo a high-end, com storytelling imersivo por modelo
- **Acessórios**: correntes, pulseiras, anéis, colares, pulseiras de couro, cintos

A diferença do mercado é a **experiência visual imersiva**: o site deve transmitir exclusividade, artesania e desejo — não apenas vender produtos, mas vender um estilo de vida. Inspirado na abordagem de Omega (storytelling técnico + emocional), Sacoor Brothers (elegância masculina estruturada) e Thomas Sabo (acessórios com narrativa de coleção).

### 1.2 Público-Alvo

- **Primário:** Adultos 25–45 anos, poder aquisitivo médio-alto, orientados a moda e estilo
- **Secundário:** Presentes de luxo (natal, aniversários, casamentos)
- **Geográfico:** Brasil (foco principal) + Portugal (expansão futura)
- **Comportamento:** Mobile-first (60%+ do tráfego via mobile), pesquisam antes de comprar, valorizam autenticidade e exclusividade

### 1.3 KPIs Esperados

- Taxa de conversão alvo: 2.5–4% (benchmark luxo)
- AOV (Average Order Value) alvo: R$ 600–R$ 1.200
- Bounce rate: < 45% (experiência visual engajante)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 2. STACK TÉCNICA

### 2.1 Frontend

| Tecnologia | Versão | Justificativa |
|---|---|---|
| **Next.js** | 15 (App Router) | SSR/SSG híbrido, performance, SEO, React Server Components |
| **TypeScript** | 5.x | Type safety, DX, escalabilidade do projeto |
| **Tailwind CSS** | 4.x | Utilidades, design system consistente, purge automático |
| **Framer Motion** | 11.x | Animações declarativas, gestos, scroll effects, layout animations |
| **React** | 19.x | Base do Next.js, Server Components |

### 2.2 Backend / API

| Tecnologia | Papel |
|---|---|
| **Next.js API Routes** | BFF (Backend for Frontend) — endpoints internos |
| **Prisma ORM** | Acesso ao banco de dados com type safety |
| **PostgreSQL** | Banco relacional principal (produtos, pedidos, usuários) |
| **Supabase** | Hosting do PostgreSQL + Auth + Storage de imagens |

### 2.3 Serviços Externos

| Serviço | Função |
|---|---|
| **Stripe** | Pagamentos internacionais (cartão, Apple Pay, Google Pay) |
| **MercadoPago** | PIX, boleto, cartões brasileiros |
| **Resend** | E-mails transacionais (confirmação, rastreio) |
| **Cloudinary** | CDN e otimização de imagens dos produtos |
| **Sanity CMS** | Gestão de conteúdo (banners, textos editoriais, lookbooks) |
| **Vercel** | Deploy, edge functions, analytics |
| **Vercel Analytics** | Web Vitals, tráfego real |

---

## 3. ARQUITETURA DE PASTAS (App Router — Monorepo)

```
loja-moda/
├── app/                          # Next.js App Router (rotas)
│   ├── (marketing)/              # Route group: páginas públicas
│   │   ├── page.tsx              # Homepage /
│   │   ├── layout.tsx            # Layout com header/footer
│   │   ├── sobre/page.tsx        # /sobre
│   │   ├── contato/page.tsx      # /contato
│   │   └── faq/page.tsx          # /faq
│   ├── (loja)/                   # Route group: loja
│   │   ├── layout.tsx            # Layout da loja
│   │   ├── colecoes/
│   │   │   └── [slug]/page.tsx   # /colecoes/[slug]
│   │   ├── produtos/
│   │   │   ├── page.tsx          # /produtos (PLP geral)
│   │   │   └── [slug]/page.tsx   # /produtos/[slug] (PDP)
│   │   ├── roupas/
│   │   │   ├── page.tsx          # /roupas (PLP roupas)
│   │   │   └── [categoria]/
│   │   │       └── page.tsx      # /roupas/[categoria]
│   │   ├── relogios/
│   │   │   ├── page.tsx          # /relogios
│   │   │   └── [slug]/page.tsx   # /relogios/[slug]
│   │   └── acessorios/
│   │       ├── page.tsx          # /acessorios
│   │       └── [categoria]/
│   │           └── page.tsx      # /acessorios/correntes etc
│   ├── (checkout)/               # Route group: checkout
│   │   ├── layout.tsx            # Layout minimal (sem nav)
│   │   ├── carrinho/page.tsx     # /carrinho
│   │   ├── checkout/
│   │   │   ├── page.tsx          # /checkout (step 1: endereço)
│   │   │   ├── envio/page.tsx    # /checkout/envio
│   │   │   └── pagamento/page.tsx # /checkout/pagamento
│   │   └── confirmacao/
│   │       └── [orderId]/page.tsx # /confirmacao/[orderId]
│   ├── (auth)/                   # Route group: autenticação
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── cadastro/page.tsx
│   │   └── recuperar-senha/page.tsx
│   ├── conta/                    # Área autenticada
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard da conta
│   │   ├── pedidos/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── enderecos/page.tsx
│   │   └── wishlist/page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── produtos/route.ts
│   │   ├── produtos/[id]/route.ts
│   │   ├── carrinho/route.ts
│   │   ├── pedidos/route.ts
│   │   ├── pagamento/
│   │   │   ├── stripe/route.ts
│   │   │   └── mercadopago/route.ts
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts
│   │   │   └── mercadopago/route.ts
│   │   └── newsletter/route.ts
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx
│   └── sitemap.ts                # Sitemap dinâmico
├── components/
│   ├── ui/                       # Componentes base (design system)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Drawer.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   ├── layout/                   # Estrutura de página
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── NewsletterFooter.tsx
│   │   └── CartDrawer/
│   │       ├── CartDrawer.tsx
│   │       └── CartItem.tsx
│   ├── home/                     # Seções da Homepage
│   │   ├── HeroSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── EditorialBanner.tsx
│   │   ├── BestSellers.tsx
│   │   ├── WatchesSection.tsx
│   │   ├── AccessoriesSection.tsx
│   │   └── NewsletterCTA.tsx
│   ├── product/                  # Componentes de produto
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductVariants.tsx
│   │   ├── ProductStoryTelling.tsx
│   │   ├── RelatedProducts.tsx
│   │   ├── QuickView.tsx
│   │   ├── WishlistButton.tsx
│   │   └── ProductReviews.tsx
│   ├── plp/                      # Product Listing Page
│   │   ├── FilterSidebar.tsx
│   │   ├── FilterTopBar.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── ActiveFilters.tsx
│   │   └── ProductCount.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── CouponInput.tsx
│   │   └── UpsellBlock.tsx
│   ├── checkout/
│   │   ├── AddressForm.tsx
│   │   ├── ShippingOptions.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── OrderSummary.tsx
│   │   └── ProgressSteps.tsx
│   └── shared/
│       ├── AnimatedSection.tsx
│       ├── ScrollReveal.tsx
│       ├── ImageWithBlur.tsx
│       ├── PriceDisplay.tsx
│       └── Breadcrumb.tsx
├── lib/
│   ├── db/
│   │   ├── prisma.ts             # Client singleton
│   │   └── schema.prisma         # Modelo de dados
│   ├── auth/
│   │   └── options.ts            # NextAuth config
│   ├── payment/
│   │   ├── stripe.ts
│   │   └── mercadopago.ts
│   ├── sanity/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── cloudinary.ts
│   ├── email.ts                  # Resend client
│   └── utils.ts
├── hooks/
│   ├── useCart.ts
│   ├── useWishlist.ts
│   ├── useFilters.ts
│   ├── useScroll.ts
│   └── useMediaQuery.ts
├── store/
│   ├── cartStore.ts              # Zustand: carrinho
│   ├── wishlistStore.ts          # Zustand: wishlist
│   └── uiStore.ts                # Zustand: drawer, modais
├── types/
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── user.ts
│   └── sanity.ts
├── styles/
│   ├── globals.css               # Tailwind base + CSS vars
│   └── animations.css            # Keyframes custom
├── public/
│   ├── fonts/                    # Self-hosted fonts
│   └── icons/
├── sanity/                       # Sanity Studio (CMS)
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── collection.ts
│   │   ├── banner.ts
│   │   └── editorial.ts
│   └── sanity.config.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. MAPEAMENTO DE PÁGINAS E ROTAS

### 4.1 Páginas Públicas / Marketing

| Rota | Componente Principal | Tipo | Descrição |
|---|---|---|---|
| `/` | `HomepagePage` | SSG + ISR | Homepage com hero, categorias, produtos |
| `/sobre` | `SobrePage` | SSG | História da marca, valores |
| `/contato` | `ContatoPage` | SSR | Formulário de contato |
| `/faq` | `FAQPage` | SSG | Perguntas frequentes |
| `/politica-devolucao` | `DevolucaoPage` | SSG | Política de devolução |
| `/termos` | `TermosPage` | SSG | Termos de uso |
| `/privacidade` | `PrivacidadePage` | SSG | Política de privacidade |

### 4.2 Loja — PLPs (Product Listing Pages)

| Rota | Tipo | Filtros Disponíveis |
|---|---|---|
| `/produtos` | ISR | Categoria, Marca, Preço, Cor, Tamanho |
| `/roupas` | ISR | Gênero, Categoria, Tamanho, Cor, Preço |
| `/roupas/camisas` | ISR | Tamanho, Cor, Material, Preço |
| `/roupas/calcas` | ISR | Tamanho, Cor, Material, Corte |
| `/roupas/casacos` | ISR | Tamanho, Cor, Material |
| `/roupas/formalwear` | ISR | Tamanho, Cor, Tipo |
| `/relogios` | ISR | Marca, Material caixa, Cor mostrador, Preço, Movimento |
| `/relogios/[slug]` | SSG | — (PDP) |
| `/acessorios` | ISR | Tipo, Material, Cor, Preço |
| `/acessorios/correntes` | ISR | Material, Comprimento, Espessura, Preço |
| `/acessorios/pulseiras` | ISR | Material, Tipo, Cor, Preço |
| `/acessorios/aneis` | ISR | Material, Tamanho, Estilo |
| `/acessorios/cintos` | ISR | Material, Largura, Cor |
| `/colecoes/[slug]` | SSG + ISR | — (Editorial + Produtos) |

### 4.3 Produto — PDP

| Rota | Tipo | Dados |
|---|---|---|
| `/produtos/[slug]` | SSG + ISR | Produto completo, variantes, galeria, storytelling |

### 4.4 Checkout

| Rota | Tipo | Descrição |
|---|---|---|
| `/carrinho` | CSR | Carrinho completo, upsell |
| `/checkout` | SSR (protegido) | Step 1: Endereço |
| `/checkout/envio` | SSR (protegido) | Step 2: Opções de envio |
| `/checkout/pagamento` | SSR (protegido) | Step 3: Pagamento |
| `/confirmacao/[orderId]` | SSR (protegido) | Confirmação do pedido |

### 4.5 Autenticação e Conta

| Rota | Tipo | Protegida |
|---|---|---|
| `/login` | CSR | Não |
| `/cadastro` | CSR | Não |
| `/recuperar-senha` | CSR | Não |
| `/conta` | SSR | Sim |
| `/conta/pedidos` | SSR | Sim |
| `/conta/pedidos/[id]` | SSR | Sim |
| `/conta/enderecos` | SSR | Sim |
| `/conta/wishlist` | SSR | Sim |

---

## 5. MODELO DE DADOS (Prisma Schema)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  phone         String?
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  orders        Order[]
  addresses     Address[]
  wishlist      WishlistItem[]
}

model Product {
  id            String        @id @default(cuid())
  slug          String        @unique
  name          String
  description   String
  price         Decimal       @db.Decimal(10,2)
  comparePrice  Decimal?      @db.Decimal(10,2)
  category      Category      @relation(fields: [categoryId], references: [id])
  categoryId    String
  images        ProductImage[]
  variants      ProductVariant[]
  tags          String[]
  inStock       Boolean       @default(true)
  featured      Boolean       @default(false)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model ProductVariant {
  id        String   @id @default(cuid())
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  sku       String   @unique
  size      String?
  color     String?
  material  String?
  stock     Int      @default(0)
  price     Decimal? @db.Decimal(10,2)
}

model Category {
  id       String    @id @default(cuid())
  slug     String    @unique
  name     String
  parent   Category? @relation("SubCategories", fields: [parentId], references: [id])
  parentId String?
  children Category[] @relation("SubCategories")
  products Product[]
}

model Order {
  id          String      @id @default(cuid())
  user        User?       @relation(fields: [userId], references: [id])
  userId      String?
  status      OrderStatus @default(PENDING)
  items       OrderItem[]
  address     Address     @relation(fields: [addressId], references: [id])
  addressId   String
  shipping    Decimal     @db.Decimal(10,2)
  subtotal    Decimal     @db.Decimal(10,2)
  total       Decimal     @db.Decimal(10,2)
  paymentId   String?
  paymentMethod String?
  createdAt   DateTime    @default(now())
}

enum OrderStatus {
  PENDING CONFIRMED PROCESSING SHIPPED DELIVERED CANCELLED REFUNDED
}
```

---

## 6. FLUXOS DE USUÁRIO

### 6.1 Fluxo Principal: Browse → Produto → Carrinho → Checkout → Confirmação

```
[Homepage]
    │
    ├─ Hero CTA "Ver Coleção" ──────────────────────────────▶ [PLP: /produtos]
    │                                                               │
    ├─ Categoria "Relógios" ──────────────────────────────▶ [PLP: /relogios]    │
    │                                                               │
    └─ Card de produto clicado ──────────────────────────── ┘
                                                            │
                                                    [PDP: /produtos/[slug]]
                                                            │
                                        ┌───────────────────┤
                                        │                   │
                                [Wishlist ♡]       [Adicionar ao Carrinho]
                                        │                   │
                                [/conta/wishlist]   [Cart Drawer abre]
                                                            │
                                                    [Botão "Finalizar Compra"]
                                                            │
                                                    [/checkout — Endereço]
                                                            │
                                                    [/checkout/envio]
                                                            │
                                                    [/checkout/pagamento]
                                                            │
                                               ┌────────────┴────────────┐
                                               │                         │
                                           [Stripe]               [MercadoPago]
                                               │                         │
                                               └────────────┬────────────┘
                                                            │
                                                    [/confirmacao/[id]]
                                                            │
                                                    [E-mail confirmação]
```

### 6.2 Fluxo de Autenticação

```
[Visitante]
    │
    ├─ Tenta acessar /conta ──────▶ Redirect → /login
    │
    ├─ /login
    │     ├─ Credenciais corretas ──▶ Redirect → /conta (ou returnUrl)
    │     ├─ Google OAuth ──────────▶ Callback → /conta
    │     └─ "Não tenho conta" ─────▶ /cadastro
    │
    └─ /cadastro
          ├─ Cadastro OK ──────────▶ E-mail de boas-vindas + /conta
          └─ "Já tenho conta" ─────▶ /login
```

### 6.3 Fluxo de Filtros (PLP)

```
[PLP carregada]
    │
    ├─ URL inicial: /relogios?cor=preto&preco=500-2000
    │
    ├─ Usuário clica filtro "Material: Ouro" 
    │     └─ Router.push atualiza URL (sem reload)
    │         └─ React Query refetch com novos params
    │
    └─ Usuário remove filtro (X nos active filters)
          └─ URL params limpos → fetch atualizado
```

---

## 7. SEO E PERFORMANCE

### 7.1 Estratégia SEO

- **Metadata dinâmica** via `generateMetadata()` em cada page.tsx
- **Open Graph** e **Twitter Cards** em todas as páginas de produto
- **JSON-LD** schema markup: `Product`, `BreadcrumbList`, `Organization`, `WebSite`
- **Sitemap dinâmico** gerado via `sitemap.ts` (produtos, coleções, categorias)
- **robots.txt** configurado (bloquear /api/, /checkout/, /conta/)
- **URLs canônicas** para variantes de produto
- **Alt text** obrigatório em todas as imagens de produto

### 7.2 Performance (Core Web Vitals)

- **LCP < 2.5s**: Imagens hero com `priority={true}`, preload critical CSS
- **CLS < 0.1**: Dimensões explícitas em todas imagens, skeleton screens
- **INP < 200ms**: Interações com debounce, React transitions
- `next/image` com Cloudinary loader para otimização automática
- Font subsetting + `font-display: swap`
- Bundle splitting automático do App Router
- Edge caching no Vercel para páginas ISR

---

## 8. SISTEMA DE PAGAMENTO

### 8.1 Stripe (Internacional)
- Cartão de crédito/débito (Visa, Mastercard, Amex)
- Apple Pay e Google Pay (via Stripe Payment Request Button)
- Stripe Webhooks para atualização de status do pedido
- Checkout via Payment Intents API (não redirect)

### 8.2 MercadoPago (Brasil)
- **PIX**: QR Code gerado na hora, confirmação via webhook
- **Boleto**: Geração de boleto, expiração 3 dias
- **Cartão de crédito BR**: Parcelamento em até 12x
- Checkout Transparente (sem redirect)

### 8.3 Fluxo de Pagamento
```
[Usuário submete pagamento]
        │
        ▼
[API Route: /api/pagamento/stripe ou /api/pagamento/mercadopago]
        │
        ├─ Cria Payment Intent (Stripe) ou Preferência (MP)
        │
        ▼
[Frontend processa no client (Stripe Elements ou MP SDK)]
        │
        ├─ Sucesso ──▶ Webhook confirma ──▶ Order.status = CONFIRMED
        │              ──▶ E-mail enviado via Resend
        │              ──▶ Redirect para /confirmacao/[id]
        │
        └─ Falha ───▶ Toast de erro ──▶ Usuário tenta novamente
```

---

## 9. COMPONENTES POR SEÇÃO (Resumo)

### 9.1 Header
- `<Header>`: Container sticky com blur backdrop
- `<Logo>`: SVG responsivo, link para home
- `<MegaMenu>`: Desktop — dropdown com colunas e imagens
- `<MobileNav>`: Drawer lateral com hierarquia expandível
- `<SearchBar>`: Input com predictive search (debounce 300ms)
- `<CartIcon>`: Badge animado com contagem de itens
- `<AccountIcon>`: Link para /conta ou /login
- `<WishlistIcon>`: Badge com contagem

### 9.2 Footer
- 5 colunas: Navegação, Ajuda, Empresa, Redes Sociais, Newsletter
- `<NewsletterForm>`: Input + botão, integração Resend
- Métodos de pagamento aceitos (logos)
- Certificados de segurança (SSL, etc.)

### 9.3 Componentes de Produto
- `<ProductCard>`: Imagem (hover revela 2ª foto), nome, preço, badge (Novo/Sale)
- `<QuickView>`: Modal com info básica + add to cart sem sair da PLP
- `<ProductGallery>`: Thumbnails + imagem principal com zoom no hover
- `<ProductInfo>`: Nome, preço, avaliações, seletor de variante, botão add to cart
- `<ProductStoryTelling>`: Seção expandida de descrição técnica/emocional (especialmente relógios)

---

---

## 10. ARQUITETURA DE RENDERIZAÇÃO ADAPTATIVA — "O DIRETOR"

> Esta é a decisão arquitetural central do projeto. Um único componente `ProductPage` funciona como um **Diretor** que recebe um `ProductType` ENUM e decide qual layout e quais componentes renderizar. Elimina duplicação, garante consistência e torna o sistema extensível.

### 10.1 O ENUM ProductType

```typescript
// types/product.ts

export enum ProductType {
  APPAREL   = 'APPAREL',    // Roupas — Casual, conversão rápida
  WATCH     = 'WATCH',      // Relógios — Luxury, storytelling imersivo
  ACCESSORY = 'ACCESSORY',  // Acessórios — Híbrido (casual ou luxury por tier)
}

export type ProductTier = 'premium' | 'standard';
```

### 10.2 Data Model TypeScript / Zod

```typescript
// types/product.ts

import { z } from 'zod'

// --- Shared types ---
const SizeGuideSchema = z.object({
  unit: z.enum(['BR', 'EU', 'US', 'UK']),
  sizes: z.array(z.object({
    label: z.string(),       // "P", "M", "G", "GG", "40", "42"...
    chest: z.number().optional(),
    waist: z.number().optional(),
    hip:   z.number().optional(),
  }))
})

const ColorVariantSchema = z.object({
  name:      z.string(),   // "Preto", "Dourado", "Rose Gold"
  hex:       z.string(),   // "#1A1A1A"
  images:    z.array(z.string().url()),
  inStock:   z.boolean(),
  price:     z.number().optional(),  // override de preço por cor
})

// --- Base Product ---
const BaseProductSchema = z.object({
  id:     z.string().cuid(),
  name:   z.string().min(1),
  price:  z.number().positive(),
  slug:   z.string().min(1),
  images: z.array(z.string().url()).min(1),
  comparePrice: z.number().optional(),
  description:  z.string(),
  shortDesc:    z.string().max(160),
  tags:         z.array(z.string()),
  inStock:      z.boolean(),
  featured:     z.boolean().default(false),
})

// --- APPAREL ---
export const ApparelProductSchema = BaseProductSchema.extend({
  type:         z.literal('APPAREL'),
  fabric:       z.string(),          // "100% Algodão Pima", "Linho"
  care:         z.array(z.string()), // instruções de lavagem
  sizeGuide:    SizeGuideSchema,
  colorVariants:z.array(ColorVariantSchema),
  fit:          z.enum(['slim', 'regular', 'relaxed', 'oversized']),
  gender:       z.enum(['masculine', 'feminine', 'unisex']),
})

// --- WATCH ---
export const WatchProductSchema = BaseProductSchema.extend({
  type:             z.literal('WATCH'),
  movement:         z.string(),   // "Automático Swiss Made", "Quartzo Japonês"
  material:         z.string(),   // "Aço Inoxidável 316L"
  caseMaterial:     z.string(),
  caseDiameter:     z.string(),   // "42mm"
  caseThickness:    z.string(),   // "12mm"
  waterResistance:  z.string(),   // "100m / 10 ATM"
  dialColor:        z.string(),
  strapMaterial:    z.string(),
  crystalType:      z.string(),   // "Safira anti-reflexo"
  powerReserve:     z.string().optional(), // "42 horas"
  story:            z.string(),   // narrativa editorial do relógio
  collections:      z.array(z.string()),
})

// --- ACCESSORY ---
export const AccessoryProductSchema = BaseProductSchema.extend({
  type:         z.literal('ACCESSORY'),
  tier:         z.enum(['premium', 'standard']),
  material:     z.string(),    // "Aço Inoxidável", "Prata 925", "Couro"
  colorVariants:z.array(ColorVariantSchema),
  dimensions:   z.string().optional(), // "Corrente 50cm x 3mm"
  weight:       z.string().optional(), // "8g"
  closure:      z.string().optional(), // "Fecho de lagosta"
  warranty:     z.string().optional(), // "2 anos de garantia"
})

// --- Union type ---
export const ProductSchema = z.discriminatedUnion('type', [
  ApparelProductSchema,
  WatchProductSchema,
  AccessoryProductSchema,
])

export type BaseProduct      = z.infer<typeof BaseProductSchema>
export type ApparelProduct   = z.infer<typeof ApparelProductSchema>
export type WatchProduct     = z.infer<typeof WatchProductSchema>
export type AccessoryProduct = z.infer<typeof AccessoryProductSchema>
export type Product          = z.infer<typeof ProductSchema>
export type ColorVariant     = z.infer<typeof ColorVariantSchema>
export type SizeGuide        = z.infer<typeof SizeGuideSchema>
```

### 10.3 O Diretor — ProductPage Component

```typescript
// app/(loja)/produtos/[slug]/page.tsx

import { notFound }        from 'next/navigation'
import { getProductBySlug } from '@/lib/db/products'
import { ProductSchema }   from '@/types/product'
import { LayoutCasual }    from '@/components/forge/casual/LayoutCasual'
import { LayoutLuxury }    from '@/components/forge/luxury/LayoutLuxury'

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const raw     = await getProductBySlug(params.slug)
  if (!raw)     return notFound()

  // Validação em tempo de execução com Zod (QA Gate)
  const product = ProductSchema.parse(raw)

  // O DIRETOR decide o layout
  if (product.type === 'WATCH') {
    return <LayoutLuxury product={product} />
  }

  if (product.type === 'APPAREL') {
    return <LayoutCasual product={product} />
  }

  // ACCESSORY: modo híbrido por tier
  if (product.type === 'ACCESSORY') {
    return product.tier === 'premium'
      ? <LayoutLuxury product={product} />
      : <LayoutCasual product={product} />
  }

  // TypeScript garante que nunca chegamos aqui (exhaustive check)
  const _exhaustive: never = product
  return notFound()
}
```

### 10.4 Component Forge — Duas Pastas

```
components/
└── forge/
    ├── casual/                         # Leves, conversão rápida (APPAREL + ACCESSORY standard)
    │   ├── LayoutCasual.tsx            # Orquestrador do layout casual
    │   ├── CasualGallery.tsx           # Galeria compacta: thumbnails + main
    │   ├── CasualProductInfo.tsx       # Nome, preço, variantes, CTA direto
    │   ├── CasualVariantSelector.tsx   # Seletor de cor/tamanho visual (dots/pills)
    │   ├── CasualSizeGuide.tsx         # Tabela de medidas (modal)
    │   ├── CasualAddToCart.tsx         # Botão grande de CTA + quantity
    │   ├── CasualRelated.tsx           # Grid horizontal de relacionados
    │   └── CasualReviews.tsx           # Reviews compactas com rating
    │
    └── luxury/                         # Pesados em design, storytelling (WATCH + ACCESSORY premium)
        ├── LayoutLuxury.tsx            # Orquestrador do layout luxury
        ├── LuxuryHero.tsx              # Hero full-viewport com parallax
        ├── LuxuryGallery.tsx           # Galeria imersiva (zoom, lightbox, 360°)
        ├── LuxuryProductInfo.tsx       # Info com tipografia Playfair, animada
        ├── LuxurySpecs.tsx             # Especificações técnicas animadas (counters)
        ├── LuxuryStoryTelling.tsx      # Seções editoriais scroll-triggered
        ├── LuxuryMaterials.tsx         # Seção de materiais com close-ups
        ├── LuxuryAddToCart.tsx         # CTA com efeito gold glow
        ├── LuxuryRelated.tsx           # Carrossel de produtos relacionados premium
        └── LuxuryAtmosphere.tsx        # Imagens ambiente / lifestyle editorial
```

### 10.5 QA Gate — Regras de Qualidade

```typescript
// Estas regras são HARD REQUIREMENTS, não sugestões:

// 1. TypeScript sem 'any'
// tsconfig.json:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// 2. Sem hydration errors
// - Nunca usar Date.now(), Math.random(), ou window no render
// - Sempre usar suppressHydrationWarning quando inevitável (theme)
// - Componentes com estado de browser: 'use client' explícito

// 3. Lighthouse Performance ≥ 90
// Checklist:
// ✓ next/image com width/height explícitos em todos os <Image />
// ✓ priority={true} nas 2–3 primeiras imagens visíveis
// ✓ Fonts: preload + font-display: swap
// ✓ CSS: sem unused CSS (Tailwind purge automático)
// ✓ JS: dynamic imports para componentes pesados (modais, carrosséis, 3D)
// ✓ Third-party: defer todos os scripts não-críticos
// ✓ Suspense boundaries em todos os async components

// 4. Zod parse em todas as API responses
// Nunca confiar em dados externos sem validação
```

---

---

## 11. PREMIUM MECHANICS CHECKLIST

> Este checklist representa os **padrões de qualidade não-negociáveis** do projeto.  
> Cada item deve ser verificado antes do merge de qualquer feature para main.  
> **Status:** 🔲 = pendente / ✅ = implementado / ❌ = bloqueador

---

### PMC-01 — Framer Motion Easing Precision

```
REGRA: easing padrão OBRIGATÓRIO: cubic-bezier(0.4, 0, 0.2, 1)
       (Material Design "standard easing" — testado em milhões de interações)

PROIBIDO:
  ❌ transition={{ ease: 'linear' }}        — mecânico, sem vida
  ❌ transition={{ ease: 'ease-in-out' }}   — genérico, não premium
  ❌ transition={{ ease: 'ease' }}          — CSS default, inconsistente

EXCEÇÕES PERMITIDAS:
  ✅ ease: 'easeOut'  — para elementos que entram (de fora para dentro)
  ✅ ease: 'easeIn'   — para elementos que saem (de dentro para fora)
  ✅ type: 'spring'   — para drawers, modais, interações físicas táteis
     → sempre com stiffness + damping explícitos, nunca valores default

IMPLEMENTAÇÃO:
  // Centralizar em lib/animations.ts
  export const ease = {
    standard:  [0.4, 0, 0.2, 1] as const,
    decelerate:[0, 0, 0.2, 1]   as const,  // entrada de elementos
    accelerate:[0.4, 0, 1, 1]   as const,  // saída de elementos
    luxury:    [0.25, 0.46, 0.45, 0.94] as const, // modo luxury
  }
  // Proibido definir easings inline em componentes individuais
```

---

### PMC-02 — Typography Scale Modular

```
REGRA: escala tipográfica baseada em razão modular 1.25 (Major Third)
       A partir de 16px base:

  xs:  10.24px  (16 ÷ 1.25³)
  sm:  12.80px  (16 ÷ 1.25²)
  md:  16.00px  (base)
  lg:  20.00px  (16 × 1.25)
  xl:  25.00px  (16 × 1.25²)
  2xl: 31.25px  (16 × 1.25³)
  3xl: 39.06px  (16 × 1.25⁴)
  4xl: 48.83px  (16 × 1.25⁵)
  5xl: 61.04px  (16 × 1.25⁶)
  6xl: 76.29px  (16 × 1.25⁷)

PROIBIDO:
  ❌ font-size: 17px, 19px, 22px, 26px — tamanhos arbitrários fora da escala
  ❌ "Achei que 15px ficava melhor aqui" — intuição sem sistema
  ❌ Mais de 2 tamanhos de fonte na mesma secção visual

FERRAMENTAS:
  typescale.com → para calcular e exportar escala
  tokens de Tailwind: text-sm, text-base, text-lg (mapeados para a escala acima)
```

---

### PMC-03 — Layers / Shadows System

```
REGRA: cards premium NUNCA têm bordas sólidas simples.
       Usar glassmorphism + box-shadow em camadas múltiplas.

SISTEMA DE SHADOWS:

  shadow-xs:   0 1px 2px rgba(0,0,0,0.3)
  shadow-sm:   0 2px 8px rgba(0,0,0,0.35)
  shadow-md:   0 4px 16px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)
  shadow-lg:   0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)
  shadow-xl:   0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)
  shadow-gold: 0 0 40px rgba(212,175,55,0.15) — glow ambiente para watches
  shadow-glass: inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.4)

BORDA PARA CARDS PREMIUM (em vez de border sólido):
  border: 1px solid rgba(255,255,255,0.08) + box-shadow shadow-glass

HOVER STATE:
  Transição de shadow: shadow-sm → shadow-lg, 300ms ease
  (comunica elevação ao interagir — sensação física)
```

---

### PMC-04 — Error & Empty State com Voz da Marca

```
REGRA: componentes <BrandError /> e <BrandEmpty /> são obrigatórios.
       Proibido usar mensagens de erro padrão (React/Next defaults).

<BrandError />:
  Props: { title, description, action?, actionLabel? }
  Visual: ícone sutil (sem vermelho agressivo), texto na voz da marca
  Exemplo:
    title="Algo não correu bem."
    description="Tenta novamente. Se persistir, contacta-nos."
    action={() => router.refresh()}
    actionLabel="Tentar outra vez"

<BrandEmpty />:
  Props: { context: 'cart' | 'wishlist' | 'orders' | 'search' | 'products' }
  Visual: ícone relevante ao contexto, copy de venda (ver BRAND_VOICE.md)
  Sempre inclui CTA de recuperação (nunca um beco sem saída)

IMPLEMENTAÇÃO:
  // Substituir next.js error.tsx default:
  export default function Error({ error, reset }) {
    return <BrandError title="Algo não correu bem." action={reset} actionLabel="Tentar outra vez" />
  }
  // not-found.tsx:
  export default function NotFound() {
    return <BrandEmpty context="not-found" />
  }
```

---

### PMC-05 — Macro-Detail Component (Watches)

```
COMPONENTE: <LuxuryMacroDetail /> — exclusivo para WATCH mode

COMPORTAMENTO:
  Ao fazer scroll de 0–400px na secção de produto:
    scale:   1.0 → 2.0 (zoom progressivo na imagem do mostrador)
    opacity fundo: 1 → 0.7 (destacar o produto)
  
  A cada 100px de scroll, uma spec técnica aparece (fadeIn):
    @100px: "Movimento Automático"
    @200px: "Cristal de Safira"
    @300px: "100m Resistência"
    @400px: "42h Reserva de Marcha"

CÓDIGO BASE:
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 2])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  
  // Specs aparecem via IntersectionObserver em threshold específicos
  // OU via useTransform com breakpoints de scrollYProgress

PERFORMANCE:
  will-change: transform na imagem (GPU layer)
  Imagem: 1200×1200px mínimo (vai ser ampliada 2x)
  Lazy load do componente: dynamic import (não impacta bundle APPAREL)
```

---

### PMC-06 — Whitespace Generoso (Secções)

```
REGRA: espaçamento mínimo entre secções no desktop = 80px (padding-y)
       No mobile = 48px

TOKENS:
  section-spacing-desktop: 80px (--section-y: 80px)
  section-spacing-mobile:  48px
  section-spacing-luxury:  120px (para watches section e editorial)

PROIBIDO:
  ❌ padding-y < 48px entre secções principais no mobile
  ❌ padding-y < 80px entre secções principais no desktop
  ❌ Comprimir espaço para "caber mais conteúdo" — destrói o premium

IMPLEMENTAÇÃO TAILWIND:
  <section className="py-20 md:py-32"> /* 80px mobile, 128px desktop */
  <section className="py-12 md:py-20"> /* 48px mobile, 80px desktop */

NOTA: a generosidade do espaço É o luxo. Não é desperdício.
```

---

### PMC-07 — Exit Intent Popup

```
COMPONENTE: <ExitIntentModal />

TRIGGERS:
  Desktop: mouseleave para y < 0 (cursor sai para barra do browser)
  Mobile: evento visibilitychange (app em background)
  
CONDIÇÕES (só disparar se):
  ✅ Usuário está na página há > 30 segundos
  ✅ NÃO está no /checkout ou /confirmacao
  ✅ sessionStorage 'exitIntentShown' === null (1x por sessão)
  ✅ NÃO já tem desconto aplicado no carrinho

CONTEÚDO:
  Variante A (sem carrinho): oferta de 10% desconto na primeira compra
  Variante B (com carrinho): "O teu carrinho espera. Frete Grátis agora."

CÓDIGO TRIGGER:
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown && timeOnPage > 30000) {
        setShown(true)
        sessionStorage.setItem('exitIntentShown', '1')
      }
    }
    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [shown, timeOnPage])
```

---

### PMC-08 — Urgency Triggers

```
COMPONENTE: <StockBadge /> e <DeliveryBadge />

StockBadge — Regras:
  stock === 0:        "Esgotado" (cinza, botão disabled)
  stock 1:           "Última unidade" (vermelho, pulso animation)
  stock 2–3:         "Últimas [n] unidades" (vermelho, pulso animation)
  stock 4–10:        "Poucas unidades" (laranja, sem animation)
  stock > 10:        sem badge (não mostrar abundância)
  
  FONTE DOS DADOS: ProductVariant.stock do Prisma DB (real-time)
  REVALIDATION: ISR a cada 5 minutos OU no-store no fetch (se crítico)

DeliveryBadge — Cálculo server-side:
  const hour = new Date().getHours() // fuso PT
  if (hour < 16) return "🚚 Entrega amanhã se pedir até 18h"
  if (hour < 18) return "⏰ Entrega amanhã — últimas horas!"
  else           return "📦 Entrega em 2-3 dias úteis"
  
  Server Component — calcula no servidor, sem JS no cliente para este componente
```

---

### PMC-09 — Mobile Tátil (Gestos Obrigatórios)

```
GESTOS OBRIGATÓRIOS:

Cart Drawer:
  drag="x" com dragConstraints={{ left: 0 }}
  onDragEnd: se offset.x > 120 → fechar o drawer
  Visual feedback: opacity diminui durante o drag (sensação de soltar)

Product Gallery:
  drag="x" com snapToPage={true}
  Dots indicator animado (ativo: scale 1.5 + opaco)
  Velocidade de swipe: se velocity > 500 → avançar página independente da distância

Filter Bottom Sheet:
  drag="y" com dragConstraints={{ top: 0 }}
  Handle bar no topo (40×5px, rounded, cinza)
  Se drag para baixo > 100px → fechar o sheet

Quick View (mobile):
  Bottom sheet em vez de modal centrado
  Altura: 75vh, scrollável internamente
  Drag para fechar igual ao Filter Bottom Sheet

Touch Targets:
  Mínimo 44×44px para QUALQUER elemento interactivo
  Verificar com: Chrome DevTools → Accessibility → Touch Targets
```

---

### PMC-10 — Prefetching de Produtos no Viewport

```
IMPLEMENTAÇÃO: componente <PrefetchOnView />

// Prefetch de produto quando entra no viewport (200px antes):
function PrefetchOnView({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const prefetched = useRef(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !prefetched.current) {
        router.prefetch(href)
        prefetched.current = true
        observer.disconnect()
      }
    }, { rootMargin: '200px 0px' })
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [href, router])
  
  return <div ref={ref}>{children}</div>
}

USO NO ProductCard:
  <PrefetchOnView href={`/produtos/${product.slug}`}>
    <ProductCard product={product} />
  </PrefetchOnView>

ESTRATÉGIA:
  → Prefetch ao entrar no viewport (não ao hover — mobile não tem hover)
  → Só prefetch 1x por produto (useRef previne repetição)
  → rootMargin: 200px — começa a prefetch antes de o utilizador ver o card
  → Links de navegação principal: prefetch={true} no próprio <Link> do Next.js
```

---

### PMC — CHECKLIST DE VERIFICAÇÃO PRÉ-LAUNCH

```
Antes do lançamento público, verificar TODOS os itens:

ANIMAÇÕES:
□ Todos os easings usam os valores de PMC-01 (sem 'linear' ou 'ease-in-out')
□ prefers-reduced-motion: animações reduzidas para utilizadores que o preferem
□ Nenhuma animação > 800ms em interações de UI (botões, menus)
□ Drawers com spring animation (não linear)

TIPOGRAFIA:
□ Todos os tamanhos de fonte estão na escala modular de PMC-02
□ Playfair Display carregada apenas no modo Luxury
□ Inter carregada em todos os modos
□ font-display: swap em todos os @font-face

SHADOWS & CARDS:
□ Nenhum card premium com borda sólida simples (PMC-03)
□ Glassmorphism nos cards de destaque
□ Box-shadow em múltiplas camadas nos cards hover

ESTADOS:
□ <BrandError /> implementado em error.tsx e not-found.tsx
□ <BrandEmpty /> implementado em todas as páginas com estado vazio
□ Nenhuma mensagem de erro técnica exposta ao utilizador

WATCHES:
□ <LuxuryMacroDetail /> funcional com parallax e zoom
□ Counter animation nas specs técnicas
□ Gold glow pulsante na secção de relógios da homepage

WHITESPACE:
□ Todas as secções com padding-y ≥ 48px (mobile) / 80px (desktop)
□ Secções de luxo/watches com padding-y ≥ 80px (mobile) / 120px (desktop)

CONVERSÃO:
□ Exit Intent popup testado (desktop + mobile)
□ StockBadge funcional com dados reais do DB
□ DeliveryBadge calculando corretamente por horário do servidor
□ "Complete o Look" aparece em todos os PDPs de APPAREL

MOBILE:
□ Swipe em CartDrawer testado no iPhone + Android
□ Swipe em ProductGallery testado
□ Filter Bottom Sheet com drag-to-dismiss
□ Todos os touch targets ≥ 44px (verificado com DevTools)

PREFETCHING:
□ PrefetchOnView wrapping todos os ProductCards nos PLPs
□ Navigation links com prefetch={true}
□ Dynamic imports em LayoutLuxury (não impacta bundle do APPAREL)
```

---
