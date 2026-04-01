'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'

const bentoLayout = [
  { cls: 'col-span-2 row-span-2', aspectClass: 'aspect-square' },
  { cls: 'col-span-1', aspectClass: 'aspect-square' },
  { cls: 'col-span-1', aspectClass: 'aspect-square' },
  { cls: 'col-span-1', aspectClass: 'aspect-square' },
  { cls: 'col-span-1', aspectClass: 'aspect-square' },
]

export default function AccessoriesSection() {
  const accessories = getProductsByCategory('acessorios').slice(0, 5)

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
          <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F0]">
            O Toque Final
          </motion.h2>
        </div>
        <motion.div variants={fadeUpVariant}>
          <Link
            href="/acessorios"
            className="group inline-flex items-center gap-2 text-[#F5F5F0]/50 hover:text-[#D4AF37] text-sm transition-colors"
          >
            Ver todos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 auto-rows-[200px]">
        {accessories.map((acc, i) => {
          const layout = bentoLayout[i]
          if (!layout) return null
          return (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${layout.cls}`}
            >
              <Link href={`/produto/${acc.slug}`} className="block h-full">
                <Image
                  src={acc.images[0] ?? ''}
                  alt={acc.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[#F5F5F0] text-sm font-medium line-clamp-1 mb-0.5">
                    {acc.name}
                  </h3>
                  <p className="text-[#D4AF37] text-xs font-semibold">{formatPrice(acc.price)}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
