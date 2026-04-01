'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import ProductGrid from '@/components/product/ProductGrid'
import { fadeUpVariant } from '@/lib/animations'

export default function FeaturedProducts() {
  const products = getFeaturedProducts(6)

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="flex items-end justify-between mb-12 flex-wrap gap-4"
      >
        <div>
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Seleção</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F0]">
            Destaques da Semana
          </h2>
        </div>
        <Link
          href="/roupas"
          className="group inline-flex items-center gap-2 text-[#F5F5F0]/50 hover:text-[#D4AF37] text-sm transition-colors"
        >
          Ver todos
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <ProductGrid products={products} columns={3} priority />
    </section>
  )
}
