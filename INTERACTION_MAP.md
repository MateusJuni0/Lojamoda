# INTERACTION_MAP.md — Mapa de Interações e Animações
# Loja de Moda Premium / Luxo

> Documento de referência para TODAS as animações Framer Motion, hover states, transições e estados de UI.  
> **Regra de ouro:** Modo Casual = rápido e funcional (200–350ms). Modo Luxury = lento e imersivo (400–800ms).

---

## 1. SETUP GLOBAL

```typescript
// lib/animations.ts — arquivo central de variants

import { Variants, Transition } from 'framer-motion'

// Easings
export const easing = {
  luxury:    [0.25, 0.46, 0.45, 0.94] as const,
  casual:    [0.4, 0, 0.2, 1]          as const,
  spring:    { type: 'spring', stiffness: 300, damping: 30 },
  springSnap:{ type: 'spring', stiffness: 500, damping: 40 },
  bouncy:    { type: 'spring', stiffness: 400, damping: 20 },
}

// Durations
export const duration = {
  instant: 0.15,
  fast:    0.25,
  base:    0.35,
  medium:  0.5,
  slow:    0.65,
  luxury:  0.8,
}

// Prefers reduced motion check
export function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```

---

## 2. ANIMAÇÕES DE SCROLL (IntersectionObserver + Framer Motion)

### 2.1 Componente AnimatedSection (wrapper reutilizável)
```typescript
// components/shared/AnimatedSection.tsx
// Usado em qualquer seção que precisa de reveal ao scroll

interface Props {
  children: React.ReactNode
  mode?: 'casual' | 'luxury'   // define velocidade
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

// Comportamento:
// - Usa whileInView + viewport={{ once: true, amount: 0.2 }}
// - Modo casual: translateY(16px) → 0, opacity 0→1, 0.4s
// - Modo luxury: translateY(32px) → 0, opacity 0→1, 0.7s
// - Modo luxury com direction: translateX(±40px) → 0
```

### 2.2 Stagger de Cards (Grid de Produtos)
```typescript
// Quando a grid de produtos entra no viewport:
// Cada card recebe um delay incremental

const gridContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,  // casual
      // staggerChildren: 0.12 // luxury
      delayChildren: 0.1,
    }
  }
}

const cardItemVariant: Variants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

// Uso: <motion.div variants={gridContainerVariant} whileInView="visible">
//        {products.map(p => <motion.div variants={cardItemVariant}>...)}
```

### 2.3 Reveal de Texto por Linha (Hero e Seções Luxury)
```typescript
// Quebra o texto em linhas e anima cada uma

const lineVariant: Variants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// Wrap em overflow: hidden para mascarar o y: '100%'
// Cada linha em <div style={{ overflow: 'hidden' }}>
//   <motion.span variants={lineVariant} custom={index}>
```

### 2.4 Counter Animation (LuxurySpecs)
```typescript
// Para números técnicos: "0 → 42" animado ao entrar no viewport
// Implementação: useMotionValue + useTransform + animateTo

import { useMotionValue, useTransform, animate, useInView } from 'framer-motion'

function AnimatedCounter({ to, suffix }: { to: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 1.5, ease: 'easeOut' })
    }
  }, [inView])

  return <motion.span ref={ref}>{rounded}{suffix}</motion.span>
}

// Exemplos de uso:
// <AnimatedCounter to={42} suffix="h" />   → "42h" (reserva de marcha)
// <AnimatedCounter to={100} suffix="m" />  → "100m" (resistência água)
// <AnimatedCounter to={40} suffix="mm" />  → "40mm" (diâmetro)
```

---

## 3. HOVER STATES

### 3.1 ProductCard Hover
```typescript
// Mode CASUAL:
const cardHover = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

// A imagem secundária aparece:
// CSS transition: opacity 0 → 1 em 400ms (mais suave com CSS que JS aqui)
.card-image-secondary {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 400ms ease;
}
.card:hover .card-image-secondary { opacity: 1; }

// Botões de ação (wishlist + quickview):
const actionButtonVariant = {
  rest:  { y: 8, opacity: 0 },
  hover: { y: 0, opacity: 1,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}
// stagger: wishlist delay 0, quickview delay 0.05s
```

### 3.2 Botões (Todos os tipos)
```typescript
// Primary Button (dourado):
whileHover={{ scale: 1.02, y: -1 }}
whileTap={{ scale: 0.98, y: 0 }}
transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
// + box-shadow: 0 8px 24px rgba(212,175,55,0.3) no hover (CSS)

// Secondary / Ghost Button:
whileHover={{ x: 2 }}
whileTap={{ scale: 0.97 }}

// Botão de CTA Luxury (LuxuryAddToCart):
whileHover={{ 
  boxShadow: '0 0 40px rgba(212,175,55,0.4)',
  scale: 1.01
}}
transition={{ duration: 0.3 }}
```

### 3.3 Navigation Links
```typescript
// Underline que cresce da esquerda (inspirado em Parfois):
// CSS-only (mais performático que JS para links):

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1px;
  background: var(--color-gold-400);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms ease;
}
.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### 3.4 Imagem de Categoria (CategoryGrid)
```typescript
// Scale zoom na imagem, não no container:
// Wrapper: overflow hidden
// Image: scale 1 → 1.08, transition 600ms luxury easing

const categoryImageHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// Overlay escurece levemente:
const overlayHover = {
  rest:  { opacity: 0.5 },
  hover: { opacity: 0.65, transition: { duration: 0.4 } }
}
```

### 3.5 WishlistButton (❤)
```typescript
// Toggle liked/unliked:
const heartVariants = {
  unliked: { scale: 1, fill: 'transparent' },
  liked: {
    scale: [1, 1.3, 1],  // bounce
    fill: '#C0392B',
    transition: { duration: 0.3, times: [0, 0.5, 1] }
  }
}

// Ao toggle: partículas de coração saindo (keyframes CSS)
// ou usar uma micro-animação Lottie (lighter)
```

---

## 4. TRANSIÇÕES DE PÁGINA

```typescript
// app/layout.tsx — Page transition wrapper

// Estratégia: crossfade entre páginas (não slide — mais elegante para luxo)
// Implementação: AnimatePresence no layout raiz

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
}

// Nota: Com App Router, usar layout animations do Framer + 
// ViewTransitions API (nativa) como fallback progressivo

// Transição especial: PLP → PDP (produto expande)
// Shared Layout Animation via layoutId:
// PLP card: <motion.div layoutId={`product-${id}`}>
// PDP hero: <motion.div layoutId={`product-${id}`}>
// Isso cria uma transição fluida do card para a página de produto
```

---

## 5. DRAWERS E MODAIS

### 5.1 Cart Drawer
```typescript
const cartDrawerVariants: Variants = {
  closed: { x: '100%', opacity: 0 },
  open:   {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 350, damping: 35 }
  }
}

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: { duration: 0.25 } }
}

// AnimatePresence para mount/unmount:
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div variants={backdropVariants} onClick={close} />
      <motion.aside variants={cartDrawerVariants} initial="closed" animate="open" exit="closed" />
    </>
  )}
</AnimatePresence>

// Mobile: swipe to dismiss
// drag="x" dragConstraints={{ left: 0, right: 0 }}
// onDragEnd: if (info.offset.x > 120) closeCart()
```

### 5.2 Mobile Navigation Drawer
```typescript
const mobileNavVariants: Variants = {
  closed: { x: '-100%' },
  open:   { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } }
}

// Sub-menus (accordion):
const subMenuVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded:  {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}
// AnimatePresence + layout="position" para suave expand/collapse
```

### 5.3 Quick View Modal
```typescript
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible:{
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit:   {
    opacity: 0, scale: 0.97, y: 5,
    transition: { duration: 0.2 }
  }
}
```

### 5.4 Filter Dropdown (PLP)
```typescript
const filterPanelVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible:{
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit:   {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25 }
  }
}
```

---

## 6. LOADING STATES

### 6.1 Skeleton Screens
```typescript
// Shimmer animado (CSS puro — mais performático):
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(90deg,
    #1A1A1A 25%, #252525 50%, #1A1A1A 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

// Componentes de skeleton:
// <SkeletonCard />     — aspect-ratio 3:4, simula ProductCard
// <SkeletonText />     — height variável, simula linha de texto
// <SkeletonAvatar />   — circular
// <SkeletonBanner />   — height 400px, simula hero
```

### 6.2 Page Loading (Route transitions)
```typescript
// next/navigation: useRouter com loading state

// Barra de progresso no topo da página:
// Biblioteca: nprogress OU implementação própria com Framer Motion

const progressBarVariants: Variants = {
  start:    { scaleX: 0, transformOrigin: 'left' },
  loading:  { scaleX: 0.7, transition: { duration: 1.5, ease: 'easeInOut' } },
  complete: { scaleX: 1, transition: { duration: 0.2 } },
  exit:     { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
}

// Cor: linear-gradient dourado, height 2px, fixed top 0
```

### 6.3 Button Loading State
```typescript
// Quando botão está em loading (ex: "Adicionar ao Carrinho"):
// Texto → spinner → texto de sucesso

const buttonContent = {
  idle:    { opacity: 1, y: 0 },
  loading: { opacity: 0, y: -8 },
}
const spinnerContent = {
  idle:    { opacity: 0, y: 8 },
  loading: { opacity: 1, y: 0 },
}

// Após sucesso: checkmark com scale bounce
// AnimatePresence para trocar entre estados
```

---

## 7. TOAST NOTIFICATIONS

```typescript
// components/ui/Toast.tsx
// Usando Framer Motion para entrada/saída fluida

const toastVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible:{
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 35 }
  },
  exit:   {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

// Stack de toasts: cada novo toast empurra os anteriores
// useReducer para gerenciar fila de toasts
// Auto-dismiss: setTimeout 4000ms + progress bar interno

// Casos de uso específicos:
// ✓ Produto adicionado ao carrinho → toast com imagem do produto + "Adicionado!"
// ✓ Produto adicionado à wishlist  → toast "Salvo na sua lista de desejos"
// ✓ Cupom aplicado                 → toast verde "Desconto de 15% aplicado!"
// ✓ Erro de pagamento              → toast vermelho "Pagamento recusado. Tente novamente."
// ✓ Newsletter                     → toast "Obrigado! Verifique seu e-mail."
```

---

## 8. PARALLAX E SCROLL EFFECTS

```typescript
// Parallax na HeroSection:
import { useScroll, useTransform } from 'framer-motion'

function HeroParallax() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  // Imagem se move 30% mais devagar que o scroll

  return (
    <motion.div style={{ y }} className="will-change-transform">
      <Image ... />
    </motion.div>
  )
}

// Parallax na WatchSection (imagem sticky):
function WatchParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  // Movimento sutil: 10% em ambas direções
}

// Opacity fade ao scroll (elementos de detalhe):
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
// Elementos aparecem e desaparecem conforme o scroll
```

---

## 9. ANIMAÇÃO DO CARRINHO

```typescript
// Quando produto é adicionado ao carrinho:

// 1. Imagem do produto "voa" para o ícone do carrinho (efeito fly-to-cart)
//    Implementação: clone do elemento, animate com layoutId ou FLIP
//    Duração: 500ms, arco parabólico

// 2. Ícone do carrinho "pulsa":
const cartIconPulse = {
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.4, times: [0, 0.5, 1] }
  }
}

// 3. Badge de contagem atualiza com scale bounce:
const badgeUpdate = {
  animate: {
    scale: [1, 1.5, 1],
    transition: { duration: 0.3, type: 'spring' }
  }
}

// 4. Cart drawer abre automaticamente (após 300ms delay)
```

---

## 10. ANIMAÇÕES ESPECÍFICAS POR MODO

### Modo CASUAL — Resumo
```
Velocidade média: 200–350ms
Easing: [0.4, 0, 0.2, 1] (Material Design)
Stagger: 70ms entre cards
Hover: rápido (150–200ms)
Page transition: fade simples 300ms
Skeleton: shimmer 1.8s loop
Foco: não atrapalhar a jornada de compra
```

### Modo LUXURY — Resumo
```
Velocidade média: 500–800ms
Easing: [0.25, 0.46, 0.45, 0.94] (custom luxury)
Stagger: 120ms entre elementos
Hover: lento e sensual (400–600ms)
Page transition: fade 500ms ou shared layout
Scroll parallax: ativo em hero e seção de watches
Text reveal: por linha, char, com perspectiva 3D leve
Gold glow: pulse ambient 3s infinite
Counter: 1.5s easeOut para specs técnicas
Foco: criar experiência emocional, tempo no site
```

---

## 11. ACESSIBILIDADE

```
REGRAS OBRIGATÓRIAS:

1. prefers-reduced-motion:
   if (prefersReducedMotion) {
     → Remover parallax
     → Reduzir stagger a 0
     → Trocar spring por easing simples
     → Manter fadeIn mas sem y/scale transforms
   }

2. Focus visible:
   Todos elementos interativos com :focus-visible ring dourado
   ring: 2px solid #D4AF37, offset: 2px
   NUNCA outline: none sem alternativa

3. Animações não-essenciais:
   Gold glow pulse → display: none com reduced-motion
   Counter animation → mostrar valor final imediatamente

4. ARIA live regions:
   Toast: role="status" aria-live="polite"
   Cart count: aria-label="3 itens no carrinho"
   Loading: aria-busy="true"
```

---
