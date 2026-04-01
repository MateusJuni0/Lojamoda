'use client'

import { motion } from 'framer-motion'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'

export default function NewsletterCTA() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainerCasual}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 text-center glass-gold border border-[#D4AF37]/15"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full" />

        <motion.p variants={fadeUpVariant} className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-4 relative">
          Acesso Privado
        </motion.p>
        <motion.h2 variants={fadeUpVariant} className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F0] mb-4 relative">
          Entre no Círculo Exclusivo
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/50 text-lg max-w-md mx-auto mb-10 relative">
          Acesso antecipado a novas coleções, ofertas privadas e edições limitadas.
        </motion.p>
        <motion.form
          variants={fadeUpVariant}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative"
        >
          <input
            type="email"
            placeholder="o seu email"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors whitespace-nowrap"
          >
            Subscrever
          </button>
        </motion.form>
        <motion.p variants={fadeUpVariant} className="text-[#F5F5F0]/20 text-xs mt-4 relative">
          Sem spam. Cancele quando quiser.
        </motion.p>
      </motion.div>
    </section>
  )
}
