'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Share2, Award, Clock, ShieldCheck, Truck, RotateCcw, ChevronDown, BadgeCheck, MessageCircle, CalendarCheck, Package, Gift, FileText } from 'lucide-react'
import { type WatchProduct } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { StockBadge } from '@/components/ui/Badge'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { fadeUpVariant, staggerContainerLuxury } from '@/lib/animations'

interface LayoutLuxuryProps {
  product: WatchProduct
}

export default function LayoutLuxury({ product }: LayoutLuxuryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colorVariants?.[0]?.name ?? '')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])

  const addItem = useCartStore((s) => s.addItem)
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore()
  const { addToast, openCart } = useUIStore()
  const wished = inWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, 1, selectedColor || undefined)
    addToast({ type: 'cart', message: `${product.name} adicionado ao cesto!` })
    openCart()
  }

  const toggleSection = (s: string) => setExpandedSection(expandedSection === s ? null : s)

  const specs = [
    { label: 'Referencia', value: product.reference },
    { label: 'Movimento', value: product.movement },
    { label: 'Caixa', value: `${product.caseMaterial} \u00b7 ${product.caseDiameter}mm` },
    { label: 'Mostrador', value: product.dialColor },
    { label: 'Bracelete', value: product.strapMaterial },
    { label: 'Cristal', value: product.crystalType },
    { label: 'Resistencia', value: product.waterResistance },
    ...(product.powerReserve ? [{ label: 'Reserva de Marcha', value: product.powerReserve }] : []),
  ]

  const whatsappUrl = `https://wa.me/351000000000?text=Ola,%20tenho%20interesse%20no%20relogio%20${encodeURIComponent(product.name)}`

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero com parallax */}
      <div ref={heroRef} className="relative h-[70vh] md:h-screen overflow-hidden pt-20">
        <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0">
          <Image src={product.images[0] ?? ''} alt={product.name} fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]" />
        </motion.div>
        <motion.div variants={staggerContainerLuxury} initial="hidden" animate="visible"
          className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p variants={fadeUpVariant} className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-3">
            Alta Relojoaria &middot; Ref. {product.reference}
          </motion.p>
          <motion.h1 variants={fadeUpVariant} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F5F5F0] leading-tight mb-4">
            {product.name}
          </motion.h1>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4">
            <span className="text-3xl font-light text-[#D4AF37]">{formatPrice(product.price)}</span>
            <StockBadge stock={product.stock} />
          </motion.div>
        </motion.div>
      </div>

      {/* Conteudo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Galeria + historia */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainerLuxury} className="space-y-8">
            <motion.div variants={fadeUpVariant} className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={cn('relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all',
                    activeImage === i ? 'border-[#D4AF37]' : 'border-transparent opacity-50 hover:opacity-80')}>
                  <Image src={img} alt={`Vista ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-[#111] glass-gold">
                <Image src={product.images[activeImage] ?? product.images[0] ?? ''} alt={product.name} fill
                  sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>

            {product.story && (
              <motion.div variants={fadeUpVariant} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs tracking-widest uppercase">A Historia</span>
                </div>
                <p className="text-[#F5F5F0]/60 leading-relaxed text-sm italic">&quot;{product.story}&quot;</p>
              </motion.div>
            )}
          </motion.div>

          {/* Painel de compra */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainerLuxury} className="space-y-8">
            <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/60 leading-relaxed text-lg">{product.shortDesc}</motion.p>

            {/* Scarcity badge */}
            <motion.div variants={fadeUpVariant}>
              <ScarcityBadge stock={product.stock} slug={product.slug} />
            </motion.div>

            {product.colorVariants && product.colorVariants.length > 0 && (
              <motion.div variants={fadeUpVariant}>
                <p className="text-[#F5F5F0]/50 text-xs tracking-widest uppercase mb-3">
                  Variante: <span className="text-[#F5F5F0]">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colorVariants.map((cv) => (
                    <button key={cv.name} onClick={() => setSelectedColor(cv.name)} title={cv.name}
                      className={cn('w-9 h-9 rounded-full border-2 transition-all',
                        selectedColor === cv.name ? 'border-[#D4AF37] scale-110' : 'border-white/20 hover:border-white/50')}
                      style={{ backgroundColor: cv.hex }} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Acoes */}
            <motion.div variants={fadeUpVariant} className="space-y-3">
              <div className="flex gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  whileTap={product.inStock ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 25 }}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={cn('flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-colors',
                    product.inStock ? 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#C9A430]' : 'bg-white/10 text-white/30 cursor-not-allowed')}
                >
                  <ShoppingBag size={16} />
                  {product.inStock ? 'Reservar' : 'Esgotado'}
                </motion.button>
                <button onClick={() => { toggleWishlist(product.id); addToast({ type: wished ? 'info' : 'success', message: wished ? 'Removido' : 'Adicionado aos favoritos!' }) }}
                  className={cn('p-4 rounded-xl border transition-colors', wished ? 'border-red-400/50 text-red-400' : 'border-white/20 text-[#F5F5F0]/50 hover:border-white/40')}
                  aria-label="Favoritos">
                  <Heart size={18} className={cn(wished && 'fill-red-400')} />
                </button>
                <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                  className="p-4 rounded-xl border border-white/20 text-[#F5F5F0]/50 hover:border-white/40 transition-colors" aria-label="Partilhar">
                  <Share2 size={18} />
                </button>
              </div>

              {/* Concierge CTA — exclusivo relogios (#2) */}
              <div className="flex gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-[#F5F5F0]/70 text-xs tracking-widest uppercase hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors"
                >
                  <MessageCircle size={14} />
                  Falar com Consultor
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-[#F5F5F0]/70 text-xs tracking-widest uppercase hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors"
                >
                  <CalendarCheck size={14} />
                  Agendar Visita Privada
                </a>
              </div>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeUpVariant}
              className="flex items-center justify-between gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#F5F5F0]/50 text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#D4AF37]" />
                Compra Segura
              </span>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-1.5">
                <Truck size={13} className="text-[#D4AF37]" />
                Entrega 2-4 dias
              </span>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={13} className="text-[#D4AF37]" />
                30 dias gratis
              </span>
            </motion.div>

            {/* Unboxing Promise (#11) */}
            <motion.div variants={fadeUpVariant}
              className="flex items-start gap-4 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                <Package size={16} className="text-[#D4AF37]" />
                <Gift size={14} className="text-[#D4AF37]/60" />
                <FileText size={14} className="text-[#D4AF37]/60" />
              </div>
              <div>
                <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-1">Embalagem Noir Elite</p>
                <p className="text-[#F5F5F0]/50 text-xs leading-relaxed">
                  Cada peca e embalada a mao em caixa preta mate com fita de cetim e cartao personalizado.
                </p>
              </div>
            </motion.div>

            {/* Tactile Proof — Acabamento (#12) */}
            <motion.div variants={fadeUpVariant} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Acabamento</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <p className="text-[#F5F5F0]/30 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Caixa</p>
                  <p className="text-[#F5F5F0]/70 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>
                    {product.caseMaterial} {product.caseDiameter}mm
                  </p>
                </div>
                <span className="hidden md:block text-white/10">&bull;</span>
                <div className="flex-1">
                  <p className="text-[#F5F5F0]/30 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Cristal</p>
                  <p className="text-[#F5F5F0]/70 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>
                    {product.crystalType}
                  </p>
                </div>
                <span className="hidden md:block text-white/10">&bull;</span>
                <div className="flex-1">
                  <p className="text-[#F5F5F0]/30 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Resistencia</p>
                  <p className="text-[#F5F5F0]/70 text-sm" style={{ fontFamily: 'var(--font-editorial)' }}>
                    {product.waterResistance}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Editorial Proof */}
            <motion.div variants={fadeUpVariant} className="glass-card rounded-2xl p-6 border border-[#D4AF37]/15">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck size={16} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Garantia de Qualidade</span>
              </div>
              <p className="text-[#F5F5F0]/60 text-sm leading-relaxed">
                Cada relogio passa por inspecao de qualidade de 48h antes de ser enviado.
                Garantia de 2 anos incluida. Certificado de autenticidade digital.
              </p>
            </motion.div>

            {/* Especificacoes */}
            <motion.div variants={fadeUpVariant} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-widest uppercase">Especificacoes</span>
              </div>
              <div className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-4 py-2 border-b border-white/5 last:border-0">
                    <span className="text-[#F5F5F0]/30 text-xs w-28 flex-shrink-0 pt-0.5">{spec.label}</span>
                    <span className="text-[#F5F5F0]/70 text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <p className="text-[#F5F5F0]/40 leading-relaxed text-sm">{product.description}</p>
            </motion.div>

            {/* Accordion Envio e Devolucoes */}
            <motion.div variants={fadeUpVariant} className="border-t border-white/10 pt-6">
              <div className="border-b border-white/10 pb-3">
                <button onClick={() => toggleSection('envio')}
                  className="flex items-center justify-between w-full py-2 text-[#F5F5F0]/80 hover:text-[#F5F5F0] text-sm font-medium transition-colors">
                  Envio e Devolucoes
                  <ChevronDown size={16} className={cn('transition-transform', expandedSection === 'envio' && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {expandedSection === 'envio' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="pb-3 text-[#F5F5F0]/50 text-sm space-y-2.5">
                        <div className="flex gap-2">
                          <span className="w-4 flex-shrink-0">&#128230;</span>
                          <div>
                            <p className="text-[#F5F5F0]/70 font-medium">Envio Standard</p>
                            <p className="text-[#F5F5F0]/40">2-4 dias uteis &middot; Gratuito acima de &euro;69 &middot; &euro;4,99 abaixo</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-4 flex-shrink-0">&#9889;</span>
                          <div>
                            <p className="text-[#F5F5F0]/70 font-medium">Envio Expresso</p>
                            <p className="text-[#F5F5F0]/40">24h &middot; &euro;9,99</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-4 flex-shrink-0">&#8617;&#65039;</span>
                          <div>
                            <p className="text-[#F5F5F0]/70 font-medium">Devolucoes</p>
                            <p className="text-[#F5F5F0]/40">30 dias &middot; Gratuitas &middot; Sem justificacao</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-4 flex-shrink-0">&#128260;</span>
                          <div>
                            <p className="text-[#F5F5F0]/70 font-medium">Troca de Tamanho</p>
                            <p className="text-[#F5F5F0]/40">Gratuita na primeira troca</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
