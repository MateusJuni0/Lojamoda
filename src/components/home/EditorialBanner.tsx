'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

export default function EditorialBanner() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[500px] flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent" />

        <motion.div
          variants={staggerContainerCasual}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 px-8 md:px-16 py-12 max-w-xl"
        >
          <motion.span
            variants={fadeUpVariant}
            className="inline-block text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-4 px-3 py-1.5 border border-[#D4AF37]/30 rounded-full"
          >
            Editorial · Primavera 2026
          </motion.span>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F0] leading-tight mb-4"
          >
            A Arte de
            <br />
            Vestir Bem
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/60 text-base leading-relaxed mb-8">
            Uma coleção que celebra a confiança silenciosa. Cada peça conta uma história de elegância sem esforço.
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <Link
              href="/roupas"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
            >
              Ver Coleção
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
