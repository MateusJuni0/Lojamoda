'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=85)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <motion.div
          variants={staggerContainerCasual}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium mb-6"
          >
            Nova Coleção · Primavera 2026
          </motion.p>

          <motion.h1
            variants={fadeUpVariant}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F5F0] leading-[0.95] mb-6"
          >
            Veste o
            <br />
            <span className="text-[#D4AF37]">Extraordinário</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-[#F5F5F0]/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Roupas, relógios e acessórios de luxo. Curados com rigor para quem não transige na excelência.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
            <Link
              href="/roupas"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
            >
              Explorar Coleção
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/relogios"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-[#F5F5F0] text-sm font-medium tracking-wider rounded-xl hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
            >
              Ver Relógios
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F5F5F0]/30 z-10"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
