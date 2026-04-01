# SECTIONS_MAP.md — Mapeamento de Seções por Página
# Loja de Moda Premium / Luxo

> Cada seção é descrita com: componente, layout, conteúdo, comportamento e referência de inspiração.

---

## 1. HOMEPAGE — `/`

> **Objetivo:** Criar desejo imediato. O visitante deve sentir luxo em 3 segundos.  
> **Referências:** Omega (hero imersivo), Sacoor (editorial masculino), Parfois (paralaxe feminino), Thomas Sabo (narrativa de coleção)

---

### SEÇÃO 1: Header Global (todas as páginas)
```
COMPONENTE: <Header />
LAYOUT:
  Desktop:
    [Logo] ─────────── [Roupas] [Relógios] [Acessórios] [Coleções] ─────────── [🔍] [♡] [👜2] [👤]
    Fundo: rgba(10,10,10,0.85) + backdrop-blur(20px)
    Border-bottom: 1px rgba(255,255,255,0.06)
    Position: sticky top-0, z-index 50
    
  Mobile:
    [☰] ─── [Logo] ─── [🔍] [👜2]
    Ao scroll down: se esconde. Ao scroll up: reaparece (auto-hide pattern)

MEGAMENU (Desktop, hover em categoria):
  Layout: 4 colunas
  Col 1: Subcategorias (links de texto)
  Col 2: Subcategorias (links de texto)
  Col 3: Imagem editorial da categoria
  Col 4: "Em destaque" — produto ou campanha
  Fundo: #0F0F0F + border-top dourada 1px
  Entrada: height 0 → auto, opacity 0 → 1, 250ms ease

MOBILE NAV (Drawer esquerdo):
  Width: 85vw, max 360px
  Hierarquia expandível (accordion)
  Rodapé: redes sociais, idioma, conta
```

---

### SEÇÃO 2: Hero — Full Viewport
```
COMPONENTE: <HeroSection />
LAYOUT: 100vh, position relative, overflow hidden

CONTEÚDO:
  Background: Vídeo de fundo (autoplay, muted, loop) OU imagem editorial de alta qualidade
  Fallback: imagem estática (para mobile, por performance)
  Overlay: gradient-dark-overlay (transparente → 85% escuro na base)
  
  Texto (posição: bottom-left, padding 80px desktop / 32px mobile):
    [Tag sazonal]         "SS.26" — 11px, uppercase, letter-spacing 0.15em, dourado
    [Headline principal]  "TEMPO PARA O QUE IMPORTA" — display-2xl, Playfair Display (modo luxury)
                          OU "NOVA COLEÇÃO" — display-xl, Inter bold (modo casual)
    [Subtítulo]           "Relógios. Moda. Acessórios." — body-lg, text-secondary
    [CTA Primário]        Botão lg "VER COLEÇÃO" — fundo dourado
    [CTA Secundário]      Botão ghost "ASSISTIR CAMPANHA" — com ícone play

  Scroll indicator: chevron animado na base, opacity 1 → 0 ao scroll

HERO ALTERNADO (A/B ou por coleção ativa):
  Versão Watch: vídeo de close-up de relógio em movimento, texto "PRECISO. ETERNO."
  Versão Apparel: editorial lifestyle, texto "ESTILO SEM ESFORÇO."
  Versão Accessories: close-up joias sobre pele, texto "DETALHES QUE FALAM."

PERFORMANCE:
  - Vídeo: lazy load, não bloqueia LCP
  - Imagem hero: priority={true}, preload link no <head>
  - Texto: renderizado pelo servidor (não depende de JS)
```

---

### SEÇÃO 3: Barra de Confiança
```
COMPONENTE: <TrustBar />
LAYOUT: height 52px, fundo #111, border-top/bottom 1px rgba(255,255,255,0.06)

ITENS (4, com separadores):
  🚚 Envio Grátis acima de R$399
  ↩️ Devolução em 30 dias
  🔒 Pagamento 100% seguro
  ⭐ +5.000 clientes satisfeitos

Mobile: carrossel automático (1 item por vez, troca a cada 3s)
```

---

### SEÇÃO 4: Categorias em Destaque
```
COMPONENTE: <CategoryGrid />
LAYOUT: Grid 3 colunas (desktop), 2 col (tablet), 1 col (mobile)
Altura cards: 60vh (desktop), 50vw aspect ratio (mobile)

CARDS (3 principais):
  [ROUPAS]      — imagem editorial masculino/feminino, overlay texto, CTA "Explorar"
  [RELÓGIOS]    — close-up de relógio, luz dourada, CTA "Ver Coleção"
  [ACESSÓRIOS]  — flatlay de correntes/pulseiras, CTA "Descobrir"

HOVER:
  Imagem: scale 1 → 1.08, 600ms ease
  Overlay: opacity aumenta levemente
  Texto CTA: underline se expande da esquerda

ANIMAÇÃO DE ENTRADA:
  Cada card: fadeUp com stagger 0.15s (trigger: IntersectionObserver)
```

---

### SEÇÃO 5: Produtos em Destaque / Novidades
```
COMPONENTE: <FeaturedProducts />
LAYOUT: Título + grid 4 colunas (desktop) / 2 col (mobile)

CABEÇALHO:
  Label: "NOVIDADES" — 11px, dourado, uppercase
  Título: "Recém Chegados" — h2, Playfair Display 400
  CTA: "Ver Todos" — ghost link com seta →

PRODUTOS: 8 cards <ProductCard /> em grid
  (ver especificação completa de ProductCard no DESIGN_SYSTEM.md)
  
TABS (opcional para filtrar):
  [Todos] [Roupas] [Relógios] [Acessórios]
  Troca com AnimatePresence (fade in/out dos produtos)

Inspiração: Sacoor Brothers (organização por categoria), Thomas Sabo (grid limpo)
```

---

### SEÇÃO 6: Banner Editorial / Lookbook
```
COMPONENTE: <EditorialBanner />
LAYOUT: Full-width, 70vh altura (desktop), aspect-ratio 3:4 (mobile)

VARIANTE A — Imagem Dividida (50/50):
  [Imagem editorial esquerda] | [Texto direito: título, descrição, CTA]
  
VARIANTE B — Full bleed com overlay:
  Imagem de campanha 100% largura
  Texto sobreposto com glassmorphism card
  
VARIANTE C — Editorial vertical (Parfois style):
  Imagem com texto sticky que transita de sticky para absolute conforme scroll
  
CONTEÚDO TIPO:
  "A COLEÇÃO PRIMAVERA"
  "Peças pensadas para quem não abre mão de estilo."
  [VER LOOKBOOK]
  
Gerenciado pelo Sanity CMS (facilmente editável pelo cliente)
```

---

### SEÇÃO 7: Bestsellers
```
COMPONENTE: <BestSellers />
LAYOUT: Carrossel horizontal (desktop: 4 visíveis, tablet: 3, mobile: 1.5)

CABEÇALHO:
  Label: "OS MAIS VENDIDOS"
  Título: "Favoritos da Temporada"
  Setas de navegação: esquerda/direita (só desktop)
  
CARDS: <ProductCard /> com badge "BESTSELLER" dourado
Drag para arrastar no mobile (Framer Motion drag)

Inspiração: Parfois (bestsellers no homepage), Sacoor (destaque de peças key)
```

---

### SEÇÃO 8: Seção Imersiva de Relógios (Watches)
```
COMPONENTE: <WatchesSection />
FILOSOFIA: Mini-Omega experience dentro da homepage
LAYOUT: 100vh, fundo #0A0A0A, ouro como acento

ESTRUTURA:
  Parte 1 (lado esquerdo sticky):
    Close-up artístico do relógio (imagem de alta qualidade)
    Gold glow ambiental (radial gradient pulsante)
    
  Parte 2 (lado direito scrollável):
    [Tag] "COLEÇÃO DE RELÓGIOS"
    [Título] "Cada Segundo Conta." — Playfair Display, 3rem
    [Subtítulo] texto curto sobre a coleção
    
    [Spec item 1] ⏱ "Movimento Automático"
    [Spec item 2] 💎 "Cristal de Safira"
    [Spec item 3] 💧 "100m Resistência à Água"
    (cada spec aparece ao scroll com counter animation)
    
    [3 cards de relógio em mini-grid]
    [CTA] "EXPLORAR RELÓGIOS" — botão dourado
    
SCROLL BEHAVIOR:
  Imagem: parallax leve (useScroll + useTransform, -20% a +20%)
  Specs: fadeUp em sequência ao entrar no viewport
  
Inspiração: Omega watches (storytelling técnico + emocional por produto)
```

---

### SEÇÃO 9: Seção de Acessórios
```
COMPONENTE: <AccessoriesSection />
LAYOUT: Bento grid assimétrico (inspirado em Thomas Sabo / Tiffany)

GRID DESKTOP:
  ┌──────────────┬──────┬──────┐
  │  Correntes   │Pulse.│Anéis │  Linha 1: altura 280px
  │  (2 cols)    │      │      │
  ├──────┬───────┴──────┴──────┤
  │Cintos│   Banner Editorial  │  Linha 2: altura 200px
  └──────┴─────────────────────┘

MOBILE: coluna única, cards aspect-ratio 1:1

CADA CARD DE CATEGORIA:
  Imagem flatlay ou closeup em fundo neutro escuro
  Título da categoria
  CTA hover: "Ver tudo →"
  
Animação: fadeUp com stagger ao entrar no viewport
```

---

### SEÇÃO 10: Newsletter / CTA Final
```
COMPONENTE: <NewsletterCTA />
LAYOUT: Padding vertical 120px, fundo #0F0F0F, borda superior sutil

CONTEÚDO:
  [Ícone envelope decorativo — SVG dourado]
  [Título] "Seja o Primeiro a Saber" — display-lg, Playfair
  [Subtítulo] "Novidades exclusivas, lançamentos e ofertas para assinantes."
  
  [Input Email] ──── [ASSINAR] ← botão dourado
  
  [Fine print] "Sem spam. Cancele quando quiser."
  
ESTADOS:
  - Idle: formulário normal
  - Loading: botão com spinner
  - Sucesso: formulário some, mensagem "Obrigado! Verifique seu e-mail." + confetti leve
  - Erro: mensagem de erro inline
```

---

### SEÇÃO 11: Footer Global (todas as páginas)
```
COMPONENTE: <Footer />
LAYOUT: 5 colunas (desktop), accordion (mobile)
Fundo: #0A0A0A, border-top: 1px rgba(255,255,255,0.08)

COLUNA 1 — Marca:
  Logo
  Tagline curta
  Ícones redes sociais (Instagram, TikTok, Pinterest, YouTube)
  
COLUNA 2 — Navegação:
  Roupas, Relógios, Acessórios, Coleções, Novidades, Sale

COLUNA 3 — Ajuda:
  Minha Conta, Rastrear Pedido, Devolução, FAQ, Contato

COLUNA 4 — Empresa:
  Sobre Nós, Sustentabilidade, Carreiras, Imprensa

COLUNA 5 — Pagamento & Segurança:
  Logos: Visa, Mastercard, PIX, Boleto, Apple Pay
  Selos: SSL, Compra Segura

RODAPÉ DO FOOTER:
  © 2026 [Nome da Marca]. Todos os direitos reservados.
  [Termos] [Privacidade] [Cookies]
```

---

---

## 2. PLP — PRODUCT LISTING PAGE (ex: `/roupas`, `/relogios`, `/acessorios`)

---

### SEÇÃO 1: Hero de Categoria
```
COMPONENTE: <PLPHero />
LAYOUT: altura 280px (desktop), 180px (mobile)
Fundo: imagem editorial da categoria com overlay escuro

CONTEÚDO:
  [Breadcrumb] Home > Roupas > Camisas  — 12px, text-muted
  [Título] "CAMISAS" — display-lg, uppercase, letra espaçada
  [Contagem] "142 produtos" — text-secondary, 14px

Inspiração: Sacoor Brothers (hero limpo nas listagens)
```

---

### SEÇÃO 2: Barra de Filtros (Desktop)
```
COMPONENTE: <FilterTopBar />
LAYOUT: sticky, abaixo do header. Fundo #0A0A0A, border-bottom sutil

ESQUERDA:
  [Filtros ▼] dropdown com contagem de ativos: "Filtros (3)"
  
CENTRO:
  Active filters pills: [Azul ×] [M ×] [< R$500 ×] [Limpar tudo]

DIREITA:
  [Ordenar ▼]: Relevância, Menor Preço, Maior Preço, Mais Recente, Mais Vendido
  [Grid view] ⊞ ⊟ — toggle entre 3 e 4 colunas

DROPDOWN DE FILTROS (Desktop — painel expandível):
  Layout: painel full-width com colunas de filtros
  Grupos:
    Categoria    → checkboxes
    Cor          → dots visuais coloridos (não texto)
    Tamanho      → pills clicáveis (P M G GG 36 38 40 42...)
    Preço        → range slider dual-handle
    Material     → checkboxes
    Novidade     → toggle switch
    Promoção     → toggle switch
```

---

### SEÇÃO 3: Sidebar de Filtros (Mobile)
```
COMPONENTE: <FilterDrawer />
LAYOUT: Bottom sheet (desliza de baixo para cima), height 85vh

ESTRUTURA:
  [Handle bar] ─── header fixo
  [Grupos de filtros accordion]
  [Rodapé fixo]: [LIMPAR] ─── [VER 142 PRODUTOS]
  
Abre ao clicar em "Filtros" na barra superior
```

---

### SEÇÃO 4: Grid de Produtos
```
COMPONENTE: <ProductGrid />
LAYOUT: CSS Grid responsivo (ver tokens em DESIGN_SYSTEM.md)

MODOS:
  3 colunas: cards maiores, mais imponente
  4 colunas: mais produtos visíveis, padrão

PRODUTOS: <ProductCard /> para APPAREL/ACCESSORY
           Card especial para WATCH: aspect-ratio diferente, sem badge de tamanho

ESTADOS DE LOADING:
  Skeleton grid com mesmo número de colunas e proporção de cards

EMPTY STATE:
  Ícone + "Nenhum produto encontrado com esses filtros."
  CTA: "Limpar filtros" ou "Ver todos os produtos"

INFINITE SCROLL vs PAGINAÇÃO:
  → Decisão: Infinite scroll com "Carregar mais" button (melhor para SEO que infinite puro)
  → A cada 24 produtos, mostrar botão "Ver mais 24 produtos"
  → URL atualiza com ?page=2 para deep linking
```

---

### SEÇÃO 5: Quick View Modal
```
COMPONENTE: <QuickView />
TRIGGER: botão 👁 que aparece no hover do card

LAYOUT MODAL:
  ┌─────────────────────────────────────────┐
  │  [Galeria pequena: 3 thumbs + main]     │
  │  ─────────────────────────────────────  │
  │  Nome do produto                        │
  │  R$ 299,00   ~~R$ 450,00~~              │
  │  [Cor: ● ● ●]  [Tamanho: P M G GG]     │
  │  [ADICIONAR AO CARRINHO ─────────────]  │
  │  [Ver produto completo →]               │
  └─────────────────────────────────────────┘

NÃO tem: storytelling, specs técnicas, reviews
(essas ficam na PDP completa)
```

---

## 3. PDP — PRODUCT DETAIL PAGE — MODO CASUAL (APPAREL / ACCESSORY standard)

> **Componentes:** `forge/casual/LayoutCasual`  
> **Tipografia:** Inter  
> **Filosofia:** Informação clara, conversão rápida, sem fricção

---

### LAYOUT DESKTOP (50/50 sticky)
```
┌─────────────────────┬──────────────────────┐
│                     │ [Breadcrumb]          │
│   [Galeria]         │ [Badge: NOVO]         │
│                     │ [Nome do Produto]     │
│   sticky, scroll    │ [Categoria]           │
│   com thumbnails    │ [R$ 299,00] ~~R$450~~ │
│   verticais         │ [Avaliações ⭐⭐⭐⭐⭐]  │
│   à esquerda        │ [Seletor de Cor]      │
│                     │ [Seletor de Tamanho]  │
│                     │ [Guia de medidas →]   │
│                     │ [QTD] [ADD AO CART]   │
│                     │ [♡ Adicionar wishlist]│
│                     │                       │
│                     │ [Descrição acordeão]  │
│                     │ [Composição acordeão] │
│                     │ [Cuidados acordeão]   │
│                     │ [Entrega acordeão]    │
└─────────────────────┴──────────────────────┘
[─────────── PRODUTOS RELACIONADOS ──────────]
[─────────── AVALIAÇÕES ─────────────────────]
```

### GALERIA CASUAL
```
COMPONENTE: <CasualGallery />
Desktop:
  - Thumbnails verticais à esquerda (4-6 miniaturas)
  - Imagem principal com zoom ao hover (cursor loupe)
  - Zoom: cursor move → área ampliada aparece sobreposta
  
Mobile:
  - Carrossel swipeable
  - Dots indicator na base
  - Tap para lightbox fullscreen
```

### SELETOR DE VARIANTES
```
COR:
  Dots circulares (24px) com cor real + tooltip com nome
  Dot ativo: borda dourada 2px + scale 1.2
  Dot esgotado: linha diagonal (crossed out)

TAMANHO:
  Pills de texto (40px height)
  Ativo: fundo branco, texto preto
  Esgotado: opacity 0.3, cursor not-allowed
  [Guia de Medidas] — link que abre modal com tabela
```

---

## 4. PDP — PRODUCT DETAIL PAGE — MODO LUXURY (WATCH / ACCESSORY premium)

> **Componentes:** `forge/luxury/LayoutLuxury`  
> **Tipografia:** Playfair Display (headings) + Inter (UI)  
> **Filosofia:** Imersão, desejo, justificativa do preço, artesania

---

### ESTRUTURA GERAL (scroll narrativo)
```
[SEÇÃO 1] Hero full-viewport — nome + imagem principal ambiente
[SEÇÃO 2] Galeria imersiva (sticky, parallax)
[SEÇÃO 3] Info e CTA
[SEÇÃO 4] Storytelling editorial
[SEÇÃO 5] Especificações técnicas (animadas)
[SEÇÃO 6] Materiais e craftmanship
[SEÇÃO 7] Atmosfera / Lifestyle
[SEÇÃO 8] Produtos relacionados (carousel luxury)
```

### SEÇÃO 1: Hero Luxury
```
COMPONENTE: <LuxuryHero />
Layout: 100vh, imagem ou vídeo ambiente do produto
  - Fundo: #0A0A0A, imagem produto com iluminação artística
  - Texto sobreposto: nome do produto em Playfair Display 2rem, dourado tênue
  - Scroll indicator: "Role para descobrir ↓" com bounce animation
  - Gold glow radial no produto
```

### SEÇÃO 2: Galeria Imersiva
```
COMPONENTE: <LuxuryGallery />
Desktop: galeria full-width com:
  - Imagem principal 70vw
  - Thumbnails panel à direita
  - Zoom: click → lightbox fullscreen com zoom 3x
  - 360°: se disponível, carrossel de 36 fotos simulando rotação
  - Vídeo: tab opcional "Ver em movimento"

Mobile: swipe gallery com zoom de pinch
```

### SEÇÃO 3: Info e CTA Luxury
```
COMPONENTE: <LuxuryProductInfo />
Layout: container 50% largura, centrado no texto

  [Referência do produto]  ex: "REF. OM-001-B"  — mono, 11px, gold
  [Nome]                   "Constellation 40mm" — Playfair Display, h1
  [Preço]                  "R$ 12.900,00"       — Inter, 1.5rem
  [Parcelamento]           "ou 10x de R$1.290"  — text-muted, 14px
  
  [Seletor de Variante] → para acessórios premium: cor/material
  [Tamanho pulseira] → se aplicável
  
  [CTA: ADICIONAR AO CARRINHO] — botão dourado xl, gold glow no hover
  [♡ Adicionar à Wishlist]      — ghost button
  [🔒 Compra segura certificada]
  [📦 Envio em caixa premium]
```

### SEÇÃO 4: Storytelling Editorial
```
COMPONENTE: <LuxuryStoryTelling />
Layout: seções alternadas texto/imagem (split 50/50)

PARA RELÓGIOS:
  "A História Por Trás" — bloco de texto narrativo (da Sanity CMS)
  "A Herança" — linha do tempo visual da coleção
  "A Tecnologia" — ícones técnicos + texto

PARA ACESSÓRIOS PREMIUM:
  "Artesania" — close-up do processo de fabricação
  "Materiais" — origem dos materiais (prata 925, ouro 18k)
  "Significado" — história/inspiração da peça

Animação: cada bloco aparece ao entrar no viewport (fadeUp)
```

### SEÇÃO 5: Especificações Técnicas
```
COMPONENTE: <LuxurySpecs /> — APENAS PARA WATCHES
Layout: grid 2x3 com ícones

  [⏱] Movimento: Automático Swiss Made
  [📏] Diâmetro: 42mm
  [💎] Cristal: Safira anti-reflexo
  [💧] Resistência: 100m / 10 ATM
  [⚙️] Reserva: 42 horas
  [🏷] Referência: OM-2025-001

Animação: número/texto aparece com counter (0→valor) + fadeIn ao scroll
```

---

## 5. CARRINHO — `/carrinho`

```
COMPONENTE: <CartDrawer /> (drawer) + <CartPage /> (página completa)

DRAWER (abre ao adicionar produto ou clicar no ícone):
  Header: "Meu Carrinho (3 itens)" + botão fechar
  
  LISTA DE ITENS:
    Para cada item:
      [Imagem 80x80] | [Nome, Variante, Preço] | [QTD -/+] | [🗑]
    
  SEPARADOR
  
  CUPOM:
    [Input "Código de desconto"] [APLICAR]
    Se válido: desconto aparece em verde
    
  UPSELL BLOCK:
    "Complete o look:" — 2 produtos relacionados em mini-cards
    (Baseado nos itens do carrinho — cross-sell)
  
  RESUMO:
    Subtotal: R$ 899,00
    Frete:    Calculado no checkout
    ─────────────────
    Total:    R$ 899,00
    
  [FINALIZAR COMPRA ─────────────] ← botão dourado xl
  [Continuar comprando]             ← ghost link

PÁGINA FULL (mobile ou se carrinho vazio):
  Empty state: ícone sacola + "Seu carrinho está vazio"
  CTA: "Explorar produtos" → volta ao PLP
```

---

## 6. CHECKOUT — Multi-step

### Step 1: Endereço — `/checkout`
```
COMPONENTE: <CheckoutAddress />
Layout: 2 colunas (form | resumo pedido)

FORM:
  Dados Pessoais: Nome completo, E-mail, Telefone
  Endereço:       CEP (com auto-complete via ViaCEP API)
                  Rua, Número, Complemento, Bairro, Cidade, Estado
  [Salvar endereço para próximas compras] — checkbox

RESUMO (sticky right):
  Lista de itens (compact)
  Subtotal, Frete (TBD), Total
  [CONTINUAR → ENVIO]

PROGRESS BAR: [Endereço ●] ─── [Envio ○] ─── [Pagamento ○]
```

### Step 2: Envio — `/checkout/envio`
```
COMPONENTE: <CheckoutShipping />
Options:
  ◉ Sedex — 2 dias úteis — R$ 28,00
  ○ PAC — 7 dias úteis — R$ 12,00
  ○ Transportadora — 5 dias úteis — R$ 18,00
  ○ Retirada na loja — Grátis (se disponível)

Cada opção: radio button estilizado + ícone + nome + prazo + preço
[CONTINUAR → PAGAMENTO]
```

### Step 3: Pagamento — `/checkout/pagamento`
```
COMPONENTE: <CheckoutPayment />

TABS DE MÉTODO:
  [💳 Cartão] [PIX] [Boleto]
  
TAB CARTÃO (Stripe Elements):
  Input número, nome, validade, CVV
  Opção de parcelamento: "em até 12x"
  [Pagar R$ 927,00]
  
TAB PIX (MercadoPago):
  QR Code gerado instantaneamente
  "Código copia e cola"
  Timer: "Válido por 30 minutos"
  Auto-polling: verifica confirmação a cada 3s
  
TAB BOLETO:
  Gera boleto + mostra código de barras
  "Vencimento em 3 dias úteis"
  Botão: "Copiar código" + "Baixar boleto PDF"
  
SECURITY BADGES: 🔒 SSL + logos de pagamento
```

### Confirmação — `/confirmacao/[orderId]`
```
COMPONENTE: <OrderConfirmation />
Layout: centrado, max-width 600px

  [✓ Animação check verde — Lottie ou CSS]
  "Pedido Confirmado!"
  "Pedido #ORD-2026-00123"
  "Você receberá um e-mail com os detalhes."
  
  RESUMO DO PEDIDO (accordion)
  ENDEREÇO DE ENTREGA
  MÉTODO DE PAGAMENTO
  ESTIMATIVA DE ENTREGA: "2–4 dias úteis"
  
  [RASTREAR PEDIDO] [CONTINUAR COMPRANDO]
```

---

## 7. AUTENTICAÇÃO

### Login — `/login`
```
Layout: centrado, max-width 420px, fundo escuro com imagem lateral (desktop)

  [Logo]
  "Bem-vindo de volta"
  [E-mail Input]
  [Senha Input] + [👁 mostrar senha]
  [Esqueci minha senha →]
  [ENTRAR]
  ─── ou ───
  [G Entrar com Google]
  "Não tem conta? Criar conta →"
```

### Cadastro — `/cadastro`
```
  [Nome completo]
  [E-mail]
  [Senha] + [Confirmar senha]
  [☐ Aceito os Termos de Uso]
  [☐ Quero receber novidades]
  [CRIAR CONTA]
  ─── ou ───
  [G Entrar com Google]
  "Já tenho conta? Entrar →"
```

### Conta — `/conta`
```
SIDEBAR (desktop) / Tabs (mobile):
  [📦 Meus Pedidos]
  [📍 Endereços]
  [♡ Wishlist]
  [👤 Dados Pessoais]
  [🚪 Sair]

MEUS PEDIDOS:
  Tabela: Pedido # | Data | Status (badge colorido) | Total | [Ver Detalhes]

WISHLIST:
  Grid de produtos salvos (igual PLP) + botão "Mover para Carrinho"
  
DADOS PESSOAIS:
  Form editável com nome, e-mail, telefone, senha
```

---

## 8. OUTRAS PÁGINAS

### Sobre — `/sobre`
```
[Hero editorial: imagem da marca]
[Nossa História: texto + imagem split]
[Nossos Valores: 3 pilares com ícones]
[Equipe: fotos + nomes (opcional)]
[CTA: "Conheça Nossa Coleção"]
```

### FAQ — `/faq`
```
Categorias: Pedidos, Pagamento, Envio, Devolução, Produtos
Accordion por pergunta
Busca interna: [🔍 Buscar dúvidas]
CTA no rodapé: "Não encontrou? Fale conosco →"
```

### Contato — `/contato`
```
[Form: Nome, E-mail, Assunto (dropdown), Mensagem]
[Informações: WhatsApp, E-mail, Horário de atendimento]
[Mapa (opcional — para loja física)]
```

---
