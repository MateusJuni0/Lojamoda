'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'

export default function AccessoriesSection() {
  const accessories = getProductsByCategory('acessorios').slice(0, 6)

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainerCasual}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-end justify-between mb-12 flex-wrap gap-4"
      >
        <div>
          <motion.p variants={fadeUpVariant} className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">
            Acessórios
          </motion.p>
          <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary,#1A1A1A)]">
            O Toque Final
          </motion.h2>
        </div>
        <motion.div variants={fadeUpVariant}>
          <Link
            href="/acessorios"
            className="group inline-flex items-center gap-2 text-[var(--text-secondary,#555)] hover:text-[#D4AF37] text-sm transition-colors"
          >
            Ver todos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Product grid — 2 cols mobile, 3 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {accessories.map((acc, i) => (
          <motion.div
            key={acc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group"
          >
            <Link href={`/produto/${acc.slug}`} className="block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--surface,#fff)] mb-3">
                <Image
                  src={acc.images[0] ?? ''}
                  alt={acc.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-[var(--text-primary,#1A1A1A)] text-sm font-medium line-clamp-1 mb-0.5 group-hover:text-[#D4AF37] transition-colors">
                {acc.name}
              </h3>
              <p className="text-[#D4AF37] text-sm font-semibold">{formatPrice(acc.price)}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
