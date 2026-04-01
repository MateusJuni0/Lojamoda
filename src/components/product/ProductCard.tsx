'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { type Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { StockBadge } from '@/components/ui/Badge'
import { formatPrice, getDiscountPercentage } from '@/lib/utils'
import { cardItemVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const addItem = useCartStore((s) => s.addItem)
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore()
  const { addToast } = useUIStore()
  const wished = inWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    addToast({ type: 'cart', message: `${product.name} adicionado ao carrinho!` })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    addToast({ type: wished ? 'info' : 'success', message: wished ? 'Removido dos favoritos' : 'Adicionado aos favoritos!' })
  }

  const discount = product.comparePrice ? getDiscountPercentage(product.comparePrice, product.price) : 0

  return (
    <motion.div
      variants={cardItemVariant}
      onMouseEnter={() => { setHovered(true); setImageIndex(1) }}
      onMouseLeave={() => { setHovered(false); setImageIndex(0) }}
      className="group relative"
    >
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] rounded-none overflow-hidden bg-[var(--surface-elevated,#1A1A1A)] border border-[var(--border,transparent)] mb-3">
          <Image
            src={product.images[imageIndex] ?? product.images[0] ?? ''}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn('object-cover transition-opacity duration-700', hovered ? 'opacity-85' : 'opacity-100')}
            priority={priority}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <StockBadge stock={product.stock} />
            {product.isNew && (
              <span className="px-2 py-0.5 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold tracking-widest uppercase rounded-full">Novo</span>
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">-{discount}%</span>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors',
                product.inStock ? 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#C9A430]' : 'bg-white/10 text-white/30 cursor-not-allowed',
              )}
            >
              <ShoppingBag size={13} />
              {product.inStock ? 'Adicionar' : 'Esgotado'}
            </button>
            <Link href={`/produto/${product.slug}`} onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-lg bg-white/10 text-[#F5F5F0] hover:bg-white/20 transition-colors" aria-label="Ver produto">
              <Eye size={14} />
            </Link>
          </motion.div>

          <button onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white/70 hover:text-red-400 transition-colors"
            aria-label={wished ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
            <Heart size={15} className={cn('transition-colors', wished ? 'fill-red-400 text-red-400' : '')} />
          </button>
        </div>

        <div>
          <p className="text-[#F5F5F0]/50 text-[9px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-ui)' }}>{product.category}</p>
          <h3 className="text-[#F5F5F0] leading-snug line-clamp-2 mb-2 group-hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: 'var(--font-editorial)', fontWeight: 300, letterSpacing: '0.06em', fontSize: '0.95rem' }}>{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F0] text-sm" style={{ fontFamily: 'var(--font-ui)' }}>{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-[#F5F5F0]/30 text-sm line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
