# BRAND_VOICE.md — Voz da Marca e Estratégia de Copy
# Loja de Moda Premium / Luxo

> **Posicionamento:** Aggressive Premium — a elegância de uma boutique com a velocidade de conversão de um e-commerce de alta performance.  
> **Modelo mental:** Sacoor Brothers + urgência de Zara online + precisão de copywriting de Gymshark.  
> **Nunca:** pretensioso, verboso, passivo. **Sempre:** direto, confiante, orientado à ação.

---

## 1. TOM DA MARCA — "Aggressive Premium"

### 1.1 Definição

O cliente não tem tempo a perder e tem bom gosto. A marca sabe disso e fala com ele como um igual — não como um vendedor a tentar impressioná-lo, mas como alguém que já sabe o que ele quer e o ajuda a chegar lá rapidamente.

```
PILARES DO TOM:

DIRETO:     Uma frase quando uma bastaria.
            Nunca "Descubra a nossa incrível coleção de peças cuidadosamente selecionadas."
            Sempre: "Nova Coleção. Disponível Agora."

CONFIANTE:  Não pede desculpa. Não hesita.
            Nunca "Esperamos que goste..."
            Sempre "Vai adorar."

EXCLUSIVO:  Cria desejo sem ser inacessível.
            Nunca "Produtos premium para os mais exigentes"
            Sempre "Para quem não negoceia com o próprio estilo."

URGENTE:    Subtil mas presente. Nunca fake.
            Não fabricar urgência. Usar stock real, promoções reais.
            "Últimas 3 unidades" só quando é verdade.
```

### 1.2 Persona da Marca (como falar)

Imagina que a marca é uma pessoa: 32 anos, lisboa, trabalha em consultoria ou design, veste bem sempre, compra com intenção, não persegue tendências — define o próprio estilo. Fala português claro, sem anglicismos desnecessários. Quando usa inglês, é porque não existe equivalente elegante.

### 1.3 O Que a Marca NUNCA Diz

| ❌ Proibido | ✅ Usar em vez |
|---|---|
| "Descubra" | "Veja" / "Compre" |
| "Explore a nossa coleção" | "Nova Coleção Online" |
| "Peças cuidadosamente selecionadas" | Nome do material + benefício |
| "Qualidade premium" | Especificação concreta (ex: "Linho 100% italiano") |
| "Não perca esta oportunidade" | "Últimas [n] unidades" (só se real) |
| "Clique aqui" | Verbo de ação direto no botão |
| "Algo correu mal" | "Não foi desta. Tenta novamente." |
| "Obrigado pela sua preferência" | "Pedido confirmado. Boa escolha." |

---

## 2. COPYWRITING RULES — Obrigatórias em Todo o Site

### 2.1 Headlines

```
REGRA: máximo 6 palavras. Impacto imediato. Sem pontuação desnecessária.

FORMATO PREFERIDO: [Adjetivo Poderoso] + [Substantivo] OU [Verbo Imperativo] + [Objeto]

Exemplos aprovados:
  "Nova Coleção. Agora Online."
  "O Relógio Que Define Ocasiões."
  "Veste o Teu Melhor Hoje."
  "Prata Pura. Sem Compromisso."
  "O Casaco que Fica para Sempre."
  "Correntes em Ouro 18k."

Exemplos reprovados:
  "Descubra a nossa nova coleção de outono-inverno 2026"
  "Explore as mais recentes tendências da moda premium"
```

### 2.2 Descrições de Produto — Template Obrigatório

```
ESTRUTURA: 2 blocos separados no PDP

BLOCO 1 — TÉCNICO (máx. 3 linhas):
  Material principal + origem + especificação técnica relevante.
  Tom: factual, preciso, como um relojoeiro ou alfaiate a descrever o trabalho.
  
  Exemplo Relógio:
  "Caixa em aço inoxidável 316L. Mostrador azul-marinho com índices dourados.
   Movimento automático com 42h de reserva de marcha. Resistência à água 100m."

  Exemplo Casaco:
  "Lã virgem italiana 80%, cashmere 20%. Forro em seda natural.
   Fecho YKK com cordão de couro genuíno. Disponível em M a XL."

  Exemplo Corrente:
  "Prata 925 com banho em ouro 18k. Elo veneziano 3mm.
   Comprimento 50cm. Fecho de lagosta. Peso 8g."

BLOCO 2 — EMOCIONAL (máx. 2 linhas):
  Como o produto vai fazer o cliente sentir-se. O contexto de uso.
  Tom: aspiracional mas real. Não poético — visual e sensorial.
  
  Exemplo Relógio:
  "Para o homem que entra numa sala e não precisa de falar para ser notado.
   O mostrador fala por ele."

  Exemplo Casaco:
  "Segunda pele de inverno. Entra no frio e sai com o mesmo ar de quem não sente."

  Exemplo Corrente:
  "No pescoço ou no pulso, a prata reflecte a luz da mesma forma que a confiança:
   quem a tem, não precisa de mostrar — aparece sozinha."
```

### 2.3 CTAs — Hierarquia Obrigatória

```
CTA PRIMÁRIO (botão dourado/escuro — ação principal):
  Produto: "Adicionar ao Carrinho"
  Checkout: "Finalizar Compra"  
  Categoria: "Ver Coleção"
  Promoção: "Aproveitar Oferta"
  Newsletter: "Quero Receber"

  REGRA: sempre verbo no infinitivo ou imperativo. Nunca "Clique aqui", nunca "Saiba Mais".

CTA SECUNDÁRIO (ghost / link):
  "Ver produto completo →"
  "Ver todos os [n] resultados"
  "Adicionar à Wishlist"
  "Ver guia de medidas"
  
CTA URGÊNCIA (badge ou texto inline — só quando real):
  "Últimas [n] unidades"
  "Entrega amanhã se pedir até 18h"
  "Frete Grátis hoje"
  "[n] pessoas estão a ver este produto" (social proof — implementação opcional)
```

### 2.4 Error Messages — Voz da Marca

```typescript
// Nunca mensagens técnicas. Sempre na voz da marca.

const errorMessages = {
  // Formulários
  required:         "Campo obrigatório.",
  invalidEmail:     "E-mail inválido. Ex: nome@dominio.com",
  passwordTooShort: "Senha muito curta. Mínimo 8 caracteres.",
  passwordMismatch: "As senhas não coincidem.",
  
  // Pagamento
  cardDeclined:     "Cartão recusado. Verifica os dados ou tenta outro método.",
  paymentFailed:    "Não foi desta. Tenta novamente ou escolhe outro método de pagamento.",
  sessionExpired:   "Sessão expirada. Inicia sessão novamente.",
  
  // Produto
  outOfStock:       "Esgotado. Activa o alerta e sê o primeiro a saber quando voltar.",
  variantUnavailable: "Esta combinação não está disponível.",
  
  // Sistema
  generic:          "Algo não correu bem. Tenta novamente.",
  networkError:     "Sem ligação. Verifica a internet e tenta outra vez.",
  notFound:         "Esta página foi descontinuada ou mudou de endereço.",
  
  // Carrinho
  cartEmpty:        "O teu carrinho está vazio. Isso tem solução.",
  maxQuantity:      "Limite de [n] unidades por pedido.",
}
```

### 2.5 Empty States — Transformar em Oportunidade de Venda

```
WISHLIST VAZIA:
  Ícone: coração vazio (outline)
  Título: "A tua lista de desejos está vazia."
  Subtítulo: "Guarda os teus favoritos e compra quando estiveres pronto."
  CTA: "Explorar Produtos" → /produtos

PESQUISA SEM RESULTADOS:
  Título: "Sem resultados para '[termo]'."
  Sugestão: "Experimenta: [termos relacionados sugeridos pelo sistema]"
  CTA: "Ver Novidades" → /produtos?sort=new

CARRINHO VAZIO:
  Ícone: sacola vazia
  Título: "O teu carrinho está vazio."
  Subtítulo: "Ainda há tempo para fazer boas escolhas."
  CTA: "Comprar Agora" → /produtos
  CTA 2: "Ver Ofertas" → /produtos?badge=sale

PEDIDOS VAZIOS (conta):
  Título: "Ainda não fizeste nenhum pedido."
  Subtítulo: "A primeira vez é sempre especial."
  CTA: "Fazer Primeira Compra" → /produtos

FILTROS SEM RESULTADO:
  Título: "Nenhum produto com estes filtros."
  Sugestão: mostrar os 4 produtos mais vendidos da mesma categoria
  CTA: "Limpar Filtros"
```

---

## 3. MECÂNICAS DE LUXO POR CATEGORIA

### 3.1 WATCH — Storytelling Técnico + Macro-Detail

```
FILOSOFIA: Um relógio é a única joia socialmente aceite para homens.
Cada detalhe técnico é um argumento de venda. Cada especificação justifica o preço.

MECÂNICA MACRO-DETAIL (componente LuxuryMacroDetail):
  - Scroll-triggered zoom progressivo no mostrador
  - useScroll + useTransform do Framer Motion
  - Scale: 1.0 → 2.0 ao longo de 400px de scroll
  - Parallax simultâneo no fundo (move mais devagar)
  - Reveal de specs técnicas à medida que o zoom aumenta:
    → Scale 1.0: visão geral do relógio
    → Scale 1.3: ponteiros e índices ficam visíveis no detalhe
    → Scale 1.6: textura do mostrador
    → Scale 2.0: logótipo do movimento gravado na traseira

SPECS A DESTACAR (sempre visíveis no PDP):
  ┌──────────────────────────────────────────────────────┐
  │  ⏱ Movimento    │  📏 Diâmetro   │  💎 Cristal     │
  │  Automático SW  │  42mm          │  Safira AR      │
  ├──────────────────────────────────────────────────────┤
  │  💧 Resistência  │  ⚙️ Reserva   │  🏷 Referência  │
  │  100m / 10 ATM  │  42 horas      │  LM-2026-001    │
  └──────────────────────────────────────────────────────┘
  (animação: cada célula faz counter animation ao entrar no viewport)

CROSS-SELL DE WATCH:
  "Combine com:" → correntes + pulseiras de couro compatíveis
  "Da mesma coleção:" → outros relógios da linha
```

### 3.2 APPAREL — Grade Densa + Complete the Look

```
FILOSOFIA: O cliente compra uma peça mas sonha com o look completo.
Complete the Look vende 2-3 peças onde o cliente veio comprar 1.

COMPLETE THE LOOK (componente CompleteTheLook):
  Layout: faixa horizontal sticky no fundo do PDP
  "Complete o Look" → 3 produtos complementares:
  Se a peça é um casaco → sugere camisa + calça + cinto
  Se é uma camisa → sugere calça + sapatos + relógio
  Se é uma calça → sugere camisa + cinto + sapato
  
  Cada produto tem: foto pequena + nome + preço + botão "Adicionar"
  "Adicionar todos" → adiciona os 3 ao carrinho de uma vez (upsell máximo)

GRADE PLP APPAREL:
  Hover: revela segunda foto do produto (pessoa a usar, não apenas flatlay)
  Badge de tamanho: "P M G ✓ GG" — tamanhos disponíveis visíveis no card sem hover
  Badge de cor: dots de cor visíveis no card
  
SIZING UX:
  Guia de medidas: modal com imagem de como medir + tabela de conversão BR/EU/US
  Size recommendation: "Baseado nas tuas medidas, recomendamos M" (se o cliente estiver logado)
```

### 3.3 ACCESSORY — Contexto Visual + Foto "Sendo Usado"

```
FILOSOFIA: Acessórios vendem quando o cliente consegue imaginar-se com eles.
Foto sobre fundo branco não vende. Foto no corpo, em contexto, vende.

PROTOCOLO DE IMAGEM OBRIGATÓRIO PARA ACESSÓRIOS:
  Foto 1: Produto isolado (fundo neutro cinza escuro) — main image
  Foto 2: Produto no corpo (pulso/pescoço/mão) — a foto mais importante
  Foto 3: Detalhe close-up (textura do material, fecho, gravação)
  Foto 4: Packshot (caixa de apresentação, lifestyle)

PDP ACESSÓRIO:
  Carousel com as 4 fotos (a foto no corpo é sempre a 2ª, em destaque)
  "Como usar" — bloco curto com 2-3 sugestões de combinação
  "Do mesmo material" → cross-sell de peças em prata 925 / ouro 18k / couro

AGRUPAMENTO NO PLP:
  Tags de material visíveis nos cards: [Prata 925] [Ouro 18k] [Couro]
  Filtro especial: "Metal" vs "Couro" vs "Tecido"
  Ordenação por gênero: Masculino / Feminino / Unissex
```

---

## 4. PERFORMANCE = LUXO

> Lentidão destrói a experiência de luxo mais do que qualquer erro de design. Um site de luxo que demora 4 segundos a carregar é uma contradição nos termos.

### 4.1 Targets Internos (mais agressivos que os do Google)

| Métrica | Target Google | Target Interno | Como Atingir |
|---|---|---|---|
| LCP | < 2.5s | **< 1.5s** | priority + CDN + preload |
| CLS | < 0.1 | **< 0.05** | dimensões explícitas, fonts preloaded |
| INP | < 200ms | **< 100ms** | debounce, transitions, no blocking JS |
| TTFB | < 800ms | **< 300ms** | Edge cache Vercel, ISR |
| Total Blocking Time | < 200ms | **< 50ms** | code splitting, defer 3rd party |

### 4.2 Prefetching Strategy

```typescript
// next/link com prefetch inteligente (não prefetch tudo — caro em bandwidth)

// Estratégia:
// 1. Links na navegação principal: prefetch={true} (sempre, alta probabilidade)
// 2. Cards de produto no viewport: prefetch via IntersectionObserver
// 3. Cards fora do viewport: prefetch={false}
// 4. Checkout steps: prefetch do próximo step quando o atual carrega

// Componente PrefetchOnView:
function PrefetchOnView({ href, children }) {
  const ref = useRef(null)
  const router = useRouter()
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        router.prefetch(href)
        observer.disconnect()
      }
    }, { rootMargin: '200px' }) // prefetch 200px antes de entrar no viewport
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [href])
  
  return <div ref={ref}>{children}</div>
}
```

### 4.3 Font Loading Strategy

```html
<!-- No <head> do layout.tsx — OBRIGATÓRIO -->

<!-- Preconnect ao Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

<!-- Preload das variantes críticas -->
<link rel="preload" 
  href="https://fonts.gstatic.com/s/cormorantgaramond/v22/..."
  as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload"
  href="https://fonts.gstatic.com/s/inter/v12/..."
  as="font" type="font/woff2" crossOrigin="anonymous" />

<!-- font-display: swap em globals.css -->
/* Garante que texto renderiza com font de sistema enquanto carrega a custom font */
/* Elimina CLS de font */
```

### 4.4 Image Loading Strategy

```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/avif', 'image/webp'],  // AVIF primeiro (menor), fallback WebP
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [80, 160, 240, 320, 480],   // para thumbnails e cards pequenos
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/[cloud_name]/image/fetch/',
  }
}

// Blur placeholder em todas as imagens:
// 1. Gerar blurDataURL via cloudinary (w_20,e_blur:800) durante build
// 2. Passar como placeholder="blur" no next/image
// 3. Remove o "flash" de branco ao carregar — mantém a sensação premium

// Hero: priority={true} — carrega antes de tudo
// Above fold: priority={true} nas primeiras 3-4 imagens visíveis
// Below fold: loading="lazy" (default do next/image)
```

---

## 5. MECÂNICAS DE CONVERSÃO OBRIGATÓRIAS

### 5.1 Exit Intent Popup

```typescript
// Dispara quando: cursor vai para acima do viewport (desktop) ou
// back button detectado (mobile)
// Só dispara 1x por sessão. Não dispara se já fez checkout.

CONTEÚDO DO POPUP:
  Opção A (primeira visita):
    Título: "Espera. Tens 10% de desconto à espera."
    Subtítulo: "Introduz o e-mail e recebe o código agora."
    [Input e-mail] + [QUERO O DESCONTO]
    Link: "Não, obrigado. Prefiro pagar mais."  ← copy psicológico
    
  Opção B (carrinho abandonado):
    Título: "O teu carrinho sente a tua falta."
    Subtítulo: "Frete Grátis na tua próxima hora. Usa o código: VOLTA"
    [VOLTAR AO CARRINHO]
    
TIMING:
  Delay mínimo após chegar na página: 30 segundos
  Não disparar em páginas de checkout
  Não disparar em mobile (usar banner fixo no fundo como alternativa)
```

### 5.2 Componente StockBadge

```typescript
// components/product/StockBadge.tsx

interface Props {
  stock: number
  threshold?: number  // default: 5
}

// Lógica:
// stock === 0:         "Esgotado" — badge cinza, botão desativado
// stock >= 1 && <= 3:  "Última unidade" ou "Últimas [n] unidades" — badge vermelho
// stock >= 4 && <= 10: "Poucas unidades" — badge laranja
// stock > 10:          sem badge (não mostrar stock alto — elimina urgência)

// Animação: pulse suave (opacity 0.7 → 1 → 0.7, 2s infinite)
// Posição: badge sobre a imagem no card (top-right) ou inline na info do PDP
```

### 5.3 Componente DeliveryBadge

```typescript
// components/product/DeliveryBadge.tsx

// Lógica de horário (Portuguese timezone):
// Antes das 16h:  "🚚 Entrega amanhã se pedir até 18h"    — verde
// 16h–18h:        "⏰ Ainda dá! Entrega amanhã até 18h"   — laranja
// Depois das 18h: "📦 Entrega em 2-3 dias úteis"          — neutro
// Fim de semana:  "📦 Entrega segunda-feira"               — neutro

// Calcula dinamicamente no servidor (Server Component)
// Re-valida a cada hora via ISR ou via client-side timer
```

### 5.4 Social Proof Inline

```typescript
// Opcional mas recomendado para produtos de maior preço

// "🔥 12 pessoas compraram este produto nas últimas 24h"
// "👁 8 pessoas estão a ver este produto agora"

// REGRAS DE IMPLEMENTAÇÃO:
// - Só mostrar se dados são reais (contar de DB)
// - Threshold mínimo: 3 para "pessoas vendo", 5 para "compraram"
// - Não fabricar dados — destrói confiança
// - Fonte de dados: analytics ou DB de pedidos
```

---

## 6. MOBILE-FIRST TÁTIL

```
PRINCÍPIOS TÁTEIS:

1. Swipe Gestures:
   - Cart Drawer: swipe right → fechar (threshold: 120px)
   - Product Gallery: swipe left/right entre fotos (nativo do Framer)
   - Filtros: bottom sheet com drag-to-dismiss
   - Checkout steps: swipe entre steps (opcional, com confirmação)

2. Touch Targets:
   - Mínimo 44x44px para qualquer elemento interactivo
   - Botões de quantidade (+ e -): 40px mínimo
   - Fechar modais: sempre no canto top-right OU gesto swipe

3. Bottom Navigation (mobile):
   Se implementado: [Home] [Categorias] [🔍] [♡] [👤]
   Fixed bottom, 60px height, safe area bottom (iPhone)

4. Pull to Refresh:
   No /conta/pedidos e /conta/wishlist
   Visual: spinner dourado no topo

5. Haptic Feedback (PWA):
   navigator.vibrate(10) ao adicionar ao carrinho (se suportado)
   navigator.vibrate([10, 50, 10]) ao completar pedido

6. Bottom Sheet (em vez de Modal):
   Size Guide → Bottom Sheet em mobile
   Quick View → Bottom Sheet em mobile (não modal centrado)
   Filter → Bottom Sheet
   Cart → Full-screen drawer (não bottom sheet — muito conteúdo)
```

---
