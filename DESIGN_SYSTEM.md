# DESIGN_SYSTEM.md — Sistema de Design
# Loja de Moda Premium / Luxo

> **Filosofia:** Luxo é espaço, silêncio e intenção. Cada elemento visual comunica exclusividade.  
> **Referências:** Sacoor Brothers (charcoal + terracota), A.P.C. (minimalismo sans), Thomas Sabo (preto/prata/ouro), Parfois (serif + paralaxe)

---

## 1. PALETA DE CORES

### 1.1 Cores Base (Dark Mode Premium)

```css
/* === FUNDOS === */
--color-bg-primary:     #0A0A0A;   /* Preto profundo — fundo principal */
--color-bg-secondary:   #111111;   /* Preto suave — cards, seções alternadas */
--color-bg-elevated:    #1A1A1A;   /* Cinzento escuro — drawers, modais */
--color-bg-glass:       rgba(255,255,255,0.04); /* Glassmorphism base */
--color-bg-glass-hover: rgba(255,255,255,0.08);

/* === TEXTOS === */
--color-text-primary:   #F5F5F0;   /* Branco quente — texto principal */
--color-text-secondary: #A0A09A;   /* Cinzento claro — subtítulos, metadados */
--color-text-muted:     #5A5A56;   /* Cinzento médio — placeholders */
--color-text-inverted:  #0A0A0A;   /* Para botões com fundo claro */

/* === BORDAS === */
--color-border-subtle:  rgba(255,255,255,0.08);
--color-border-medium:  rgba(255,255,255,0.15);
--color-border-strong:  rgba(255,255,255,0.30);
```

### 1.2 Acentos de Luxo

```css
/* === OURO (Watches & Premium) === */
--color-gold-100:  #FFF9E6;
--color-gold-300:  #F5D179;
--color-gold-400:  #D4AF37;  /* Gold principal */
--color-gold-500:  #B8941F;  /* Gold hover/dark */
--color-gold-600:  #9A7A0A;

/* === PRATA (Acessórios) === */
--color-silver-100: #F8F8F8;
--color-silver-300: #C8C8C8;
--color-silver-400: #A8A8A8;  /* Silver principal */
--color-silver-500: #888888;
--color-silver-600: #666666;

/* === BRONZE/ROSE GOLD (Feminino) === */
--color-rosegold-300: #F4C5B0;
--color-rosegold-400: #C9956C;  /* Rose Gold principal */
--color-rosegold-500: #A67550;

/* === FEEDBACK === */
--color-success:  #2D7A4F;
--color-error:    #C0392B;
--color-warning:  #D4A017;
--color-info:     #1A6B8A;
```

### 1.3 Modo Claro (Alternativo para páginas editoriais)

```css
--color-bg-light-primary:   #FAFAF8;
--color-bg-light-secondary: #F0EFE9;
--color-text-light-primary: #1A1A18;
--color-text-light-secondary:#4A4A46;
```

### 1.4 Gradientes Luxo

```css
/* Gradiente dourado — botões premium, destaques */
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #F5D179 50%, #B8941F 100%);

/* Gradiente escuro — overlays de hero */
--gradient-dark-overlay: linear-gradient(
  to bottom,
  rgba(10,10,10,0) 0%,
  rgba(10,10,10,0.4) 60%,
  rgba(10,10,10,0.85) 100%
);

/* Glassmorphism card */
--gradient-glass: linear-gradient(
  135deg,
  rgba(255,255,255,0.08) 0%,
  rgba(255,255,255,0.02) 100%
);

/* Radial glow dourado — efeito spotlight em watches */
--gradient-gold-glow: radial-gradient(
  ellipse at center,
  rgba(212,175,55,0.15) 0%,
  transparent 70%
);
```

---

## 2. TIPOGRAFIA

### 2.1 Famílias Tipográficas

```css
/* SERIF — Títulos editoriais, campanhas, lookbooks (luxo emocional) */
font-family: 'Cormorant Garamond', 'Libre Baskerville', Georgia, serif;

/* SANS — UI, navegação, preços, labels, botões (clareza funcional) */
font-family: 'Inter', 'Helvetica Neue', system-ui, sans-serif;

/* DISPLAY — Hero headlines grandes, logos de coleções */
font-family: 'Cormorant', serif; /* versão display weight 300-700 */

/* MONO — Preços premium, códigos de produto, números */
font-family: 'JetBrains Mono', 'OCRB', monospace;
```

**Fonte recomendada principal:** `Cormorant Garamond` (Google Fonts, gratuita) para headlines + `Inter` para UI. Se o cliente preferir pagar: `Freight Display` ou `Canela` para headlines.

### 2.2 Escala Tipográfica

```css
/* === DISPLAY (Headlines hero) === */
--text-display-2xl: clamp(4rem, 8vw, 9rem);    /* Hero principal */
--text-display-xl:  clamp(3rem, 6vw, 6.5rem);  /* Seções de destaque */
--text-display-lg:  clamp(2.5rem, 5vw, 4.5rem);

/* === HEADINGS === */
--text-h1: clamp(2rem, 4vw, 3.5rem);
--text-h2: clamp(1.75rem, 3vw, 2.75rem);
--text-h3: clamp(1.5rem, 2.5vw, 2.25rem);
--text-h4: clamp(1.25rem, 2vw, 1.75rem);
--text-h5: 1.25rem;
--text-h6: 1rem;

/* === BODY === */
--text-body-lg:  1.125rem; /* 18px — texto editorial */
--text-body-md:  1rem;     /* 16px — texto padrão */
--text-body-sm:  0.875rem; /* 14px — metadados, labels */
--text-body-xs:  0.75rem;  /* 12px — badges, footnotes */

/* === UI === */
--text-btn-lg:   0.9375rem; /* 15px uppercase */
--text-btn-md:   0.875rem;  /* 14px uppercase */
--text-label:    0.6875rem; /* 11px — labels tudo maiúsculo */
--text-price-lg: 1.5rem;    /* Preço destaque */
--text-price-md: 1.125rem;  /* Preço normal */
```

### 2.3 Letter Spacing e Line Height

```css
/* Letter spacing */
--tracking-tighter: -0.04em;  /* Display muito grande */
--tracking-tight:   -0.02em;  /* Headlines h1-h2 */
--tracking-normal:   0em;
--tracking-wide:     0.05em;  /* Subtítulos, labels */
--tracking-wider:    0.08em;  /* Botões uppercase */
--tracking-widest:   0.15em;  /* Labels uppercase pequenos */

/* Line height */
--leading-none:    1;
--leading-tight:   1.1;   /* Display headlines */
--leading-snug:    1.3;   /* Headings */
--leading-normal:  1.5;   /* Body text */
--leading-relaxed: 1.7;   /* Texto editorial longo */
```

---

## 3. ESPAÇAMENTO E GRID

### 3.1 Sistema de Espaçamento (base 4px)

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
--space-40:  160px;
--space-48:  192px;
```

### 3.2 Grid do Layout

```css
/* Container */
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1440px;
--container-max: 1600px;  /* Máximo absoluto */

/* Gutters */
--gutter-mobile:  16px;
--gutter-tablet:  24px;
--gutter-desktop: 40px;
--gutter-wide:    60px;

/* Grid colunas de produto */
--grid-products-mobile:  repeat(2, 1fr);
--grid-products-tablet:  repeat(3, 1fr);
--grid-products-desktop: repeat(4, 1fr);
--grid-products-wide:    repeat(5, 1fr);

/* Grid Bento (Homepage featured) */
--grid-bento: [full-start] 1fr [content-start] minmax(0,1440px) [content-end] 1fr [full-end];
```

### 3.3 Breakpoints

```css
/* Mobile first */
--bp-xs:  375px;   /* iPhone SE */
--bp-sm:  640px;   /* Mobile largo */
--bp-md:  768px;   /* Tablet retrato */
--bp-lg:  1024px;  /* Tablet paisagem / laptop */
--bp-xl:  1280px;  /* Desktop */
--bp-2xl: 1440px;  /* Desktop wide */
--bp-3xl: 1920px;  /* Fullscreen */
```

---

## 4. TOKENS DE DESIGN (Tailwind Config)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#0A0A0A',
          surface:   '#111111',
          elevated:  '#1A1A1A',
          gold:      '#D4AF37',
          'gold-light': '#F5D179',
          'gold-dark':  '#B8941F',
          silver:    '#A8A8A8',
          rosegold:  '#C9956C',
          text:      '#F5F5F0',
          'text-muted': '#A0A09A',
        },
      },
      fontFamily: {
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cormorant', 'Georgia', 'serif'],
        sans:    ['Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem,8vw,9rem)',   { lineHeight: '1.0', letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(3rem,6vw,6.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg':  ['clamp(2.5rem,5vw,4.5rem)',{ lineHeight: '1.1' }],
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(212,175,55,0.15)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5)',
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
};
```

---

## 5. COMPONENTES BASE

### 5.1 Botões

```
VARIANTES:
├── Primary:    fundo dourado (#D4AF37), texto preto — para CTA principal
├── Secondary:  borda 1px white/30, fundo transparente — ações secundárias
├── Ghost:      sem borda, texto branco — links de nav
├── Dark:       fundo #1A1A1A, texto branco — em fundos claros
└── Danger:     fundo #C0392B — ações destrutivas

TAMANHOS:
├── sm:  height 36px, padding 0 16px, text 13px uppercase tracking-wider
├── md:  height 44px, padding 0 24px, text 14px uppercase tracking-wider
├── lg:  height 52px, padding 0 32px, text 15px uppercase tracking-wider
└── xl:  height 60px, padding 0 48px, text 16px uppercase tracking-wider

ESTADOS:
├── default:  opacity 1
├── hover:    transform translateY(-1px), shadow dourado leve
├── active:   transform translateY(0), opacity 0.9
├── disabled: opacity 0.4, cursor not-allowed
└── loading:  spinner substituindo texto, pointer-events none

CSS VARS INTERNAS:
--btn-bg, --btn-color, --btn-border, --btn-hover-bg
```

### 5.2 Inputs

```
VARIANTES:
├── Default:    borda bottom 1px, fundo transparente (estilo editorial)
├── Outlined:   borda completa 1px, border-radius 2px
└── Filled:     fundo #1A1A1A, sem borda

ESTADOS:
├── default:  borda rgba(255,255,255,0.2)
├── focus:    borda dourada (#D4AF37), label flutua para cima (Float Label)
├── error:    borda vermelha + mensagem de erro abaixo
├── success:  borda verde + ícone check
└── disabled: opacity 0.4

COMPONENTES:
├── <Input />         — text, email, password, number
├── <Select />        — dropdown customizado (não native)
├── <Textarea />      — autosize
├── <FloatLabel />    — wrapper para label flutuante
└── <SearchInput />   — com ícone de lupa, clear button
```

### 5.3 Cards de Produto

```
ESTRUTURA:
┌──────────────────────────────┐
│  [Badge: NOVO | SALE | -20%] │
│                              │
│       [Imagem Principal]     │  aspect-ratio: 3/4
│   (hover → revela 2ª foto)   │
│                              │
│  [❤ Wishlist]  [👁 QuickView]│  aparecem no hover
├──────────────────────────────┤
│  Nome do Produto             │  font-sans, 14px, weight 500
│  Categoria                   │  font-sans, 11px, muted, uppercase
│  R$ 299,00  ~~R$ 450,00~~    │  preço + compare price riscado
└──────────────────────────────┘

HOVER STATES:
- Container: border-color rgba(255,255,255,0.15) → rgba(212,175,55,0.3)
- Imagem: scale 1 → 1.05, transition 600ms ease
- 2ª imagem: opacity 0 → 1 com crossfade
- Botões ação (wishlist/quickview): translateY(8px) → translateY(0)
- Sombra: 0px → card-hover shadow
```

### 5.4 Modais e Drawers

```
MODAL:
- Backdrop: rgba(0,0,0,0.8) com blur(4px)
- Container: background #111111, borda glass, border-radius 4px
- Entrada: scale(0.95) + opacity(0) → scale(1) + opacity(1), 300ms
- Saída: scale(0.95) + opacity(0), 200ms
- Fechamento: ESC, click fora, botão X

DRAWER (Carrinho):
- Desliza da direita: translateX(100%) → translateX(0)
- Largura: 420px (desktop), 100vw (mobile)
- Backdrop: rgba(0,0,0,0.7)
- Spring animation: stiffness 300, damping 30

DRAWER (Menu Mobile):
- Desliza da esquerda: translateX(-100%) → translateX(0)
- Largura: 85vw máximo 360px
```

### 5.5 Badges

```
VARIANTES:
├── New:   fundo #1A3A2A, texto #4CAF7D, borda #2D7A4F — "NOVO"
├── Sale:  fundo #3A1A1A, texto #E87070, borda #C0392B — "SALE"
├── Pct:   fundo dourado, texto preto — "-30%"
├── Sold:  fundo #1A1A1A, texto muted — "ESGOTADO"
└── Limit: fundo escuro, texto dourado — "ÚLTIMAS PEÇAS"

DIMENSÕES: height 22px, padding 0 8px, font 10px uppercase tracking-widest
POSIÇÃO: absolute top-3 left-3 (stack vertical se múltiplos)
```

### 5.6 Skeleton Screens

```css
/* Padrão de shimmer para loading states */
.skeleton {
  background: linear-gradient(
    90deg,
    #1A1A1A 25%,
    #242424 50%,
    #1A1A1A 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Aplicações: */
/* skeleton-card:    aspect-ratio 3/4, width completo */
/* skeleton-text:    height 14px, border-radius 2px */
/* skeleton-title:   height 28px, width 60%, border-radius 2px */
/* skeleton-price:   height 20px, width 30% */
/* skeleton-badge:   height 22px, width 48px */
```

### 5.7 Toast Notifications

```
TIPOS:
├── Success: ícone check, fundo #0D2B1A, borda esquerda #2D7A4F
├── Error:   ícone X, fundo #2B0D0D, borda esquerda #C0392B
├── Info:    ícone i, fundo #0D1F2B, borda esquerda #1A6B8A
└── Cart:    ícone bag, fundo #1A1A0D, borda esquerda #D4AF37

COMPORTAMENTO:
- Aparece top-right (desktop), top-center (mobile)
- Entrada: translateY(-100%) + opacity 0 → translateY(0) + opacity 1
- Auto-dismiss: 4 segundos
- Stack de múltiplos toasts com gap
- Click para dispensar antecipadamente
```

---

## 6. MICRO-INTERAÇÕES E ANIMAÇÕES (FRAMER MOTION)

### 6.1 Princípios de Animação

```
REGRAS FUNDAMENTAIS:
1. Animação serve a UX, não a exibição técnica
2. Duração padrão: 300–600ms (nunca > 1s em UI interativa)
3. Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) para a maioria
4. Sempre respeitar prefers-reduced-motion
5. Separar animações de scroll (IntersectionObserver) de hover (CSS/Framer)
```

### 6.2 Variants Padrão Reutilizáveis

```typescript
// lib/animations.ts

export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25,0.46,0.45,0.94] } }
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

export const scaleInVariant = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25,0.46,0.45,0.94] } }
}

export const slideFromRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25,0.46,0.45,0.94] } }
}

export const slideFromLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25,0.46,0.45,0.94] } }
}

// Para hero text split (char-by-char)
export const charVariant = {
  hidden:  { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.03, duration: 0.5, ease: [0.25,0.46,0.45,0.94] }
  })
}
```

### 6.3 Animações por Contexto

**Modo Casual (APPAREL / ACCESSORY standard):**
```
- Entrada de cards: fadeUp com stagger 0.08s
- Hover card: scale 1.03, 300ms ease
- Botão CTA: translateY(-2px), 200ms
- Filtros dropdown: height auto com AnimatePresence
- Quick view modal: scaleIn 300ms
- Cart drawer: slideFromRight, spring stiffness 400 damping 40
```

**Modo Luxury (WATCH / ACCESSORY premium):**
```
- Hero scroll: useScroll + useTransform → parallax de 30% da altura
- Texto hero: char-by-char reveal com rotateX (perspectiva 3D leve)
- Seções de storytelling: fade-in sequenciado ao scroll (IntersectionObserver)
- Imagem produto: scale muito sutil 1→1.03 em 2s (feeling imersivo, não bouncy)
- Números técnicos: counter animation (0 → valor real em 1.5s)
- Gold glow: pulse opacity 0.1 → 0.2 → 0.1, 3s infinite (ambiente)
- Page transitions: crossfade 400ms (não slide)
```

---

## 7. BREAKPOINTS E MOBILE-FIRST

### 7.1 Estratégia

Seguindo Parfois e Sacoor Brothers: **mobile-first com escalada progressiva**. O design base é para 375px e os breakpoints adicionam complexidade.

```css
/* Tailwind custom breakpoints */
screens: {
  'xs':  '375px',
  'sm':  '640px',
  'md':  '768px',
  'lg':  '1024px',
  'xl':  '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
}
```

### 7.2 Comportamentos por Breakpoint

| Elemento | Mobile (< 768px) | Tablet (768–1024px) | Desktop (> 1024px) |
|---|---|---|---|
| Header | Logo central, hamburger | Logo esq, links principais | Megamenu completo |
| Hero text | 2.5rem serif | 4rem | 7rem+ display |
| Grid produtos | 2 colunas | 3 colunas | 4 colunas |
| Cart | Page full-screen | Drawer 60vw | Drawer 420px |
| Filtros | Bottom sheet | Sidebar colapsível | Sidebar sempre aberta |
| PDP galeria | Scroll horizontal | Grid 2 col | Sticky + thumbnails |
| Footer | Accordion | 3 colunas | 5 colunas |

### 7.3 Touch e Gestos

```typescript
// Swipe em galeria de produto (mobile)
// useMotionValue + useTransform para drag responsivo
const dragX = useMotionValue(0)
const opacity = useTransform(dragX, [-100, 0, 100], [0.5, 1, 0.5])

// Swipe para fechar drawers (mobile)
// drag="x" dragConstraints={{ left: 0, right: 0 }}
// onDragEnd: if offset.x > 100 → close()
```

---

## 8. SISTEMA TIPOGRÁFICO DUAL (CASUAL vs LUXURY)

> Decisão arquitetural central: a tipografia muda conforme o `ProductType` do produto em contexto.

### 8.1 Modo Casual — Inter (APPAREL, ACCESSORY standard)

```css
/* Activado quando ProductType === 'APPAREL' ou tier === 'standard' */
--font-heading: 'Inter', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;

/* Características: */
/* - Peso: 600-700 para headings, 400 para body */
/* - Letter-spacing: -0.02em em headings grandes */
/* - Tom: moderno, limpo, acessível, conversão-focado */
/* - Estilo PLP: compacto, informação densa, ação clara */
```

### 8.2 Modo Luxury — Playfair Display (WATCH, ACCESSORY premium)

```css
/* Activado quando ProductType === 'WATCH' ou tier === 'premium' */
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Inter', system-ui, sans-serif; /* Body sempre Inter */

/* Características: */
/* - Headings em Playfair Display weight 400 (elegância natural) */
/* - Itálico para citações e subtítulos editoriais */
/* - Letter-spacing: normal (não forçar kerning em serif) */
/* - Tom: artesanal, emocional, temporal, aspiracional */
/* - Estilo PDP: espaçoso, narrativo, imersivo */
```

### 8.3 Implementação via CSS Custom Properties

```tsx
// components/shared/ThemeProvider.tsx
// O contexto do produto injeta o tema no DOM pai

<div
  data-product-type={productType}
  data-tier={tier}
  className={cn(
    productType === 'WATCH' || tier === 'premium'
      ? 'font-luxury'   // Playfair Display
      : 'font-casual'   // Inter
  )}
>
  {children}
</div>

// globals.css
[data-product-type="WATCH"] h1,
[data-product-type="WATCH"] h2,
[data-tier="premium"] h1,
[data-tier="premium"] h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 400;
}
```

---

## 9. GLASSMORPHISM — Especificação

```css
/* Card glassmorphism — usado em: destaque de produto no hero,
   overlay de quick view, badge de coleção sobre imagem */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Variante dourada — para highlight premium */
.glass-gold {
  background: rgba(212, 175, 55, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(212, 175, 55, 0.20);
  box-shadow:
    inset 0 1px 0 rgba(212, 175, 55, 0.15),
    0 0 40px rgba(212, 175, 55, 0.08);
}

/* Header blur (sticky) */
.header-glass {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px) saturate(120%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

---
