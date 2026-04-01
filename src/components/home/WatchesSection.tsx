'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'

export default function WatchesSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const watches = getProductsByCategory('relogios').slice(0, 4)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Dark background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1800&q=80)' }}
        />
        <div className="absolute inset-0 bg-[#080808]" style={{ mixBlendMode: 'multiply' }} />
      </motion.div>
      <div className="absolute inset-0 bg-[#080808]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerCasual}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUpVariant} className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-ui)' }}>
            Alta Relojoaria
          </motion.p>
          <motion.h2 variants={fadeUpVariant} className="text-[#F5F5F0] mb-6"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              letterSpacing: '0.02em',
              lineHeight: 0.9,
            }}>
            Tempo Elevado<br />
            <em>à Arte</em>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/40 max-w-lg mx-auto tracking-widest"
            style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            Cada mecanismo, uma sinfonia. Cada mostrador, uma tela. Peças que transcendem gerações.
          </motion.p>
        </motion.div>

        {/* Watch cards — horizontal scroll on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {watches.map((watch, i) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group"
            >
              <Link href={`/produto/${watch.slug}`} className="block">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111] mb-3 glass-gold border border-[#D4AF37]/10">
                  <Image
                    src={watch.images[0] ?? ''}
                    alt={watch.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
                </div>
                <p className="text-[#F5F5F0]/50 text-[10px] tracking-widest uppercase mb-0.5">Relógio</p>
                <h3 className="text-[#F5F5F0] text-sm font-medium line-clamp-2 mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {watch.name}
                </h3>
                <p className="text-[#D4AF37] font-semibold text-sm">{formatPrice(watch.price)}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/relogios"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
          >
            Ver Todos os Relógios
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
