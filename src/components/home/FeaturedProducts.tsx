'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import { formatPrice, getDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { fadeUpVariant, staggerContainerLuxury } from '@/lib/animations'
import { type Product } from '@/types/product'
import { cn } from '@/lib/utils'

type CardSize = 'large' | 'medium' | 'small'

function EditorialCard({
  product,
  size = 'medium',
  priority = false,
}: {
  product: Product
  size?: CardSize
  priority?: boolean
}) {
  const addItem = useCartStore((s) => s.addItem)
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore()
  const { addToast } = useUIStore()
  const wished = inWishlist(product.id)
  const discount = product.comparePrice
    ? getDiscountPercentage(product.comparePrice, product.price)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    addToast({ type: 'cart', message: `${product.name} adicionado ao cesto!` })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    addToast({
      type: wished ? 'info' : 'success',
      message: wished ? 'Removido dos favoritos' : 'Adicionado aos favoritos!',
    })
  }

  const aspectRatio = size === 'large' ? '2/3' : '3/4'
  const nameSize = size === 'large' ? '1.15rem' : '0.875rem'

  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div
        className="relative overflow-hidden bg-[var(--surface-elevated,#F0EDE6)]"
        style={{ aspectRatio }}
      >
        <Image
          src={product.images[0] ?? ''}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-opacity duration-700 group-hover:opacity-[0.85]"
          priority={priority}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-ui)' }}>
              Novo
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-white text-[#1A1A1A] text-[9px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-ui)' }}>
              −{discount}%
            </span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#1A1A1A] text-white text-[9px] tracking-[0.2em] uppercase disabled:opacity-40 transition-colors hover:bg-[#333]"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            <ShoppingBag size={11} />
            {product.inStock ? 'Adquirir' : 'Esgotado'}
          </button>
          <button
            onClick={handleWishlist}
            className="p-2.5 bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            aria-label="Favoritos"
          >
            <Heart size={13} className={cn(wished && 'fill-current')} />
          </button>
        </div>
      </div>

      {/* Card text */}
      <div className="pt-3">
        <p className="text-[var(--text-secondary,#6B6B6B)] text-[9px] tracking-[0.2em] uppercase mb-1"
          style={{ fontFamily: 'var(--font-ui)' }}>
          {product.category}
        </p>
        <h3
          className="text-[var(--text-primary,#1A1A1A)] leading-snug mb-1.5 group-hover:text-[var(--accent-gold,#8B6914)] transition-colors line-clamp-2"
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            fontSize: nameSize,
          }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className="text-[var(--text-primary,#1A1A1A)] text-sm"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span
              className="text-[var(--text-secondary,#6B6B6B)] text-xs line-through"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedProducts() {
  const products = getFeaturedProducts(7)

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="flex items-end justify-between mb-14 flex-wrap gap-4"
      >
        <div>
          <p
            className="text-[var(--accent-gold,#8B6914)] text-[9px] tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Seleção
          </p>
          <h2
            className="text-[var(--text-primary,#1A1A1A)]"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              fontSize: 'var(--font-size-display)',
              lineHeight: 0.95,
            }}
          >
            Destaques<br />da Semana
          </h2>
        </div>
        <Link
          href="/roupas"
          className="group inline-flex items-center gap-2 text-[var(--text-secondary,#6B6B6B)] hover:text-[var(--accent-gold,#8B6914)] text-[10px] tracking-[0.2em] uppercase transition-colors"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Ver todos
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Editorial asymmetric grid — 4 columns */}
      {/* Linha 1: 1 grande (col-span-2) + 2 pequenos */}
      {/* Linha 2: 3 médios + 1 grande                */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainerLuxury}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5"
      >
        {/* Linha 1 */}
        <motion.div variants={fadeUpVariant} className="col-span-2">
          {products[0] && <EditorialCard product={products[0]} size="large" priority />}
        </motion.div>
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[1] && <EditorialCard product={products[1]} size="small" priority />}
        </motion.div>
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[2] && <EditorialCard product={products[2]} size="small" />}
        </motion.div>

        {/* Linha 2 */}
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[3] && <EditorialCard product={products[3]} size="medium" />}
        </motion.div>
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[4] && <EditorialCard product={products[4]} size="medium" />}
        </motion.div>
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[5] && <EditorialCard product={products[5]} size="medium" />}
        </motion.div>
        <motion.div variants={fadeUpVariant} className="col-span-1">
          {products[6] && <EditorialCard product={products[6]} size="large" />}
        </motion.div>
      </motion.div>
    </section>
  )
}
