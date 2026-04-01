# HANDOFF — Loja Moda Premium (Noir Élite)

> Lê este ficheiro PRIMEIRO em qualquer nova sessão antes de tocar em qualquer código.

---

## Contexto do Projeto

E-commerce premium de luxo para roupas, relógios e acessórios.
Posicionamento: **"Aggressive Premium"** — não é boutique aspiracional, é outlet premium com urgência e conversão.
Tom da marca: direto, confiante, exclusivo mas acessível. CTAs no imperativo.

---

## Stack Técnica

- Next.js 15 (App Router)
- TypeScript strict (sem `any`)
- Tailwind CSS v4
- Framer Motion
- Zustand (cart + wishlist com localStorage)
- Node v24, npm 11

---

## Localização

- **Pasta do projeto:** `C:\Users\mjnol\Desktop\workspace\projetos\loja-moda`
- **Servidor dev:** porta **3001** (`npm run dev`)
- **URL local:** `http://localhost:3001`

Para arrancar o servidor:
```bash
cd C:\Users\mjnol\Desktop\workspace\projetos\loja-moda
npm run dev
```

---

## Documentação Completa (ler por ordem)

Todos os ficheiros abaixo estão nesta mesma pasta:

1. `SPEC.md` — arquitetura, rotas, componentes, fluxos, Premium Mechanics Checklist
2. `DESIGN_SYSTEM.md` — paleta, tipografia, tokens, animações
3. `SECTIONS_MAP.md` — cada página mapeada seção a seção
4. `INTERACTION_MAP.md` — todas as animações Framer Motion
5. `TECH_DECISIONS.md` — justificativas técnicas, roadmap 5 sprints
6. `BRAND_VOICE.md` — tom da marca, regras de copy, CTAs
7. `PRODUCTS_CATALOG.md` — 45 produtos (15 roupas, 15 relógios, 15 acessórios)
8. `SUPPLIER_PROTOCOL.md` — fornecedores, markups, protocolo de fotos
9. `FINANCEIRO_LOJA.xlsx` — planilha financeira com catálogo, simulador, fornecedores

---

## Arquitetura "O Diretor"

O componente `ProductPage` lê o `ProductType` e decide o layout:
- `APPAREL` → `LayoutCasual` (grade ágil, Sacoor/Parfois style)
- `WATCH` → `LayoutLuxury` (storytelling imersivo, Omega style)
- `ACCESSORY` com `tier: 'premium'` → `LayoutLuxury`
- `ACCESSORY` com `tier: 'standard'` → `LayoutCasual`

---

## Estrutura de Pastas (src/)

```
src/
  app/
    page.tsx                  # Homepage
    layout.tsx                # Root layout
    roupas/page.tsx           # PLP roupas
    relogios/page.tsx         # PLP relógios
    acessorios/page.tsx       # PLP acessórios
    produto/[slug]/page.tsx   # PDP (O Diretor)
    carrinho/page.tsx
    checkout/page.tsx
    login/page.tsx
    conta/page.tsx
    sitemap.xml/route.ts
    robots.txt/route.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      CartDrawer.tsx
    ui/
      Button.tsx
      Badge.tsx
      Toast.tsx
      LoadingSkeleton.tsx
      ProductCard.tsx
      ProductGrid.tsx
    product/
      LayoutCasual.tsx
      LayoutLuxury.tsx
    sections/
      HeroSection.tsx
      TrustBar.tsx
      CategoryGrid.tsx
      FeaturedProducts.tsx
      EditorialBanner.tsx
      WatchesSection.tsx
      AccessoriesSection.tsx
      NewsletterCTA.tsx
  stores/
    cartStore.ts
    wishlistStore.ts
  data/
    products.ts               # 45 produtos mock com Unsplash images
  types/
    product.ts                # ApparelProduct | WatchProduct | AccessoryProduct
  lib/
    utils.ts
  styles/
    globals.css               # CSS vars, Tailwind base
```

---

## Estado Atual do Projeto

- ✅ Build limpo (`npm run build` — 0 erros, 58 páginas)
- ✅ TypeScript sem erros (`tsc --noEmit` limpo)
- ✅ Servidor dev a correr na porta 3001
- ✅ Homepage com 8 secções funcionais
- ✅ PLP (roupas/relógios/acessórios) com filtros
- ✅ PDP com dois layouts (Casual/Luxury)
- ✅ Carrinho, Checkout (3 steps), Login, Conta
- ✅ SEO: sitemap.xml, robots.txt, metadata, Open Graph
- ✅ Zustand stores com localStorage
- ✅ Animações Framer Motion

---

## Próximos Passos Sugeridos

- Substituir imagens Unsplash por fotos reais dos produtos
- Integrar Stripe + MercadoPago no checkout
- Ligar autenticação (NextAuth v5)
- Integrar CMS Sanity para gestão de produtos
- Deploy no Vercel
- Testes de performance (Lighthouse ≥ 90)

---

## Colaboradores

- **Mateus** — owner do projeto
- **Dante** — agente auxiliar (OpenClaw NEXUS)
- **Claude** — arquitetura, documentação, construção do site

---

*Última atualização: 2026-03-31*
