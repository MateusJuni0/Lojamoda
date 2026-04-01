'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Share2, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { type ApparelProduct, type AccessoryProduct, type SizeVariant } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { StockBadge } from '@/components/ui/Badge'
import ScarcityBadge from '@/components/ui/ScarcityBadge'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

type CasualProduct = ApparelProduct | AccessoryProduct

interface LayoutCasualProps {
  product: CasualProduct
}

export default function LayoutCasual({ product }: LayoutCasualProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(product.colorVariants?.[0]?.name ?? '')
  const [expandedSection, setExpandedSection] = useState<string | null>('detalhes')

  const addItem = useCartStore((s) => s.addItem)
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore()
  const { addToast, openCart } = useUIStore()
  const wished = inWishlist(product.id)

  const sizes: SizeVariant[] = product.type === 'APPAREL' ? product.sizes : []

  const handleAddToCart = () => {
    if (product.type === 'APPAREL' && sizes.length > 0 && !selectedSize) {
      addToast({ type: 'error', message: 'Escolha um tamanho antes de continuar.' })
      return
    }
    addItem(product, 1, selectedColor || undefined, selectedSize ?? undefined)
    addToast({ type: 'cart', message: `${product.name} adicionado ao carrinho!` })
    openCart()
  }

  const toggleSection = (s: string) => setExpandedSection(expandedSection === s ? null : s)

  const details =
    product.type === 'APPAREL'
      ? [
          { label: 'Tecido', value: product.fabric },
          { label: 'Ajuste', value: product.fit },
          { label: 'Cuidados', value: product.care.join(', ') },
        ]
      : [
          { label: 'Material', value: product.material },
          ...(product.dimensions ? [{ label: 'Dimensões', value: product.dimensions }] : []),
          ...(product.weight ? [{ label: 'Peso', value: product.weight }] : []),
        ]

  const accordionSections = [
    { key: 'detalhes', label: 'Detalhes' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'envio', label: 'Envio e Devoluções' },
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Galeria de imagens */}
          <motion.div variants={staggerContainerCasual} initial="hidden" animate="visible" className="space-y-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 group">
              <AnimatePresence mode="wait">
                <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                  <Image src={product.images[activeImage] ?? product.images[0] ?? ''} alt={product.name} fill priority
                    sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <div className="absolute top-3 left-3"><StockBadge stock={product.stock} /></div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={cn('relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors',
                      activeImage === i ? 'border-[#D4AF37]' : 'border-transparent opacity-60 hover:opacity-100')}>
                    <Image src={img} alt={`Vista ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informação do produto */}
          <motion.div variants={staggerContainerCasual} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={fadeUpVariant}>
              <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-1">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#F5F5F0] mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-[#F5F5F0]">{formatPrice(product.price)}</span>
                {product.comparePrice && (
                  <span className="text-[#F5F5F0]/30 text-lg line-through">{formatPrice(product.comparePrice)}</span>
                )}
              </div>
            </motion.div>

            <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/60 leading-relaxed">{product.shortDesc}</motion.p>

            {/* Scarcity badge */}
            <motion.div variants={fadeUpVariant}>
              <ScarcityBadge stock={product.stock} slug={product.slug} />
            </motion.div>

            {/* Seletor de cor */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <motion.div variants={fadeUpVariant}>
                <p className="text-[#F5F5F0]/70 text-sm mb-2">Cor: <span className="text-[#F5F5F0]">{selectedColor}</span></p>
                <div className="flex gap-2">
                  {product.colorVariants.map((cv) => (
                    <button key={cv.name} onClick={() => setSelectedColor(cv.name)} title={cv.name}
                      className={cn('w-8 h-8 rounded-full border-2 transition-all',
                        selectedColor === cv.name ? 'border-[#D4AF37] scale-110' : 'border-white/20 hover:border-white/50')}
                      style={{ backgroundColor: cv.hex }} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Seletor de tamanho */}
            {sizes.length > 0 && (
              <motion.div variants={fadeUpVariant}>
                <p className="text-[#F5F5F0]/70 text-sm mb-2">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button key={size.label} onClick={() => setSelectedSize(size.label)} disabled={!size.inStock}
                      className={cn('px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                        !size.inStock ? 'border-white/5 text-white/20 cursor-not-allowed line-through' :
                        selectedSize === size.label ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' :
                        'border-white/15 text-[#F5F5F0]/60 hover:border-white/30 hover:text-[#F5F5F0]')}>
                      {size.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Ações */}
            <motion.div variants={fadeUpVariant} className="flex gap-3 pt-2">
              <button onClick={handleAddToCart} disabled={!product.inStock}
                className={cn('flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-colors',
                  product.inStock ? 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#C9A430]' : 'bg-white/10 text-white/30 cursor-not-allowed')}>
                <ShoppingBag size={16} />
                {product.inStock ? 'Adicionar ao Carrinho' : 'Esgotado'}
              </button>
              <button onClick={() => { toggleWishlist(product.id); addToast({ type: wished ? 'info' : 'success', message: wished ? 'Removido dos favoritos' : 'Adicionado aos favoritos!' }) }}
                className={cn('p-4 rounded-xl border transition-colors', wished ? 'border-red-400/50 text-red-400' : 'border-white/15 text-[#F5F5F0]/50 hover:border-white/30 hover:text-[#F5F5F0]')}
                aria-label="Favoritos">
                <Heart size={18} className={cn(wished && 'fill-red-400')} />
              </button>
              <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                className="p-4 rounded-xl border border-white/15 text-[#F5F5F0]/50 hover:border-white/30 hover:text-[#F5F5F0] transition-colors" aria-label="Partilhar">
                <Share2 size={18} />
              </button>
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
                Entrega 2–4 dias
              </span>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={13} className="text-[#D4AF37]" />
                30 dias grátis
              </span>
            </motion.div>

            {/* Accordion */}
            <motion.div variants={fadeUpVariant} className="border-t border-white/10 pt-6 space-y-3">
              {accordionSections.map((section) => (
                <div key={section.key} className="border-b border-white/10 pb-3">
                  <button onClick={() => toggleSection(section.key)}
                    className="flex items-center justify-between w-full py-2 text-[#F5F5F0]/80 hover:text-[#F5F5F0] text-sm font-medium transition-colors">
                    {section.label}
                    <ChevronDown size={16} className={cn('transition-transform', expandedSection === section.key && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {expandedSection === section.key && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="pb-3 text-[#F5F5F0]/50 text-sm space-y-1.5">
                          {section.key === 'descricao' && <p>{product.description}</p>}
                          {section.key === 'detalhes' && details.map((d) => (
                            <div key={d.label} className="flex gap-2">
                              <span className="text-[#F5F5F0]/30 w-20 flex-shrink-0 pt-0.5">{d.label}:</span>
                              <span>{d.value}</span>
                            </div>
                          ))}
                          {section.key === 'envio' && (
                            <div className="space-y-2.5">
                              <div className="flex gap-2">
                                <span className="w-4 flex-shrink-0">📦</span>
                                <div>
                                  <p className="text-[#F5F5F0]/70 font-medium">Envio Standard</p>
                                  <p className="text-[#F5F5F0]/40">2–4 dias úteis · Gratuito acima de €69 · €4,99 abaixo</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <span className="w-4 flex-shrink-0">⚡</span>
                                <div>
                                  <p className="text-[#F5F5F0]/70 font-medium">Envio Expresso</p>
                                  <p className="text-[#F5F5F0]/40">24h · €9,99</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <span className="w-4 flex-shrink-0">↩️</span>
                                <div>
                                  <p className="text-[#F5F5F0]/70 font-medium">Devoluções</p>
                                  <p className="text-[#F5F5F0]/40">30 dias · Gratuitas · Sem justificação</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <span className="w-4 flex-shrink-0">🔄</span>
                                <div>
                                  <p className="text-[#F5F5F0]/70 font-medium">Troca de Tamanho</p>
                                  <p className="text-[#F5F5F0]/40">Gratuita na primeira troca</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
