'use client'

import { motion } from 'framer-motion'
import { type Product } from '@/types/product'
import ProductCard from './ProductCard'
import { SkeletonProductGrid } from '@/components/ui/Skeleton'
import { staggerContainerCasual } from '@/lib/animations'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  columns?: 2 | 3 | 4
  priority?: boolean
}

const colClasses: Record<NonNullable<ProductGridProps['columns']>, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export default function ProductGrid({
  products,
  loading = false,
  columns = 3,
  priority = false,
}: ProductGridProps) {
  if (loading) return <SkeletonProductGrid count={columns === 4 ? 8 : 6} />

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-[#F5F5F0]/30 text-lg mb-2">Nenhum produto encontrado.</p>
        <p className="text-[#F5F5F0]/20 text-sm">Tente outros filtros.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainerCasual}
      initial="hidden"
      animate="visible"
      className={`grid ${colClasses[columns]} gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10`}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={priority && i < 4} />
      ))}
    </motion.div>
  )
}
