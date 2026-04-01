'use client'

import { motion } from 'framer-motion'
import { Truck, RefreshCw, Shield, Star } from 'lucide-react'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'

const trusts = [
  { icon: Truck, title: 'Envio Grátis', desc: 'Em compras acima de €150' },
  { icon: RefreshCw, title: 'Devolução 30 dias', desc: 'Sem perguntas' },
  { icon: Shield, title: 'Pagamento Seguro', desc: 'Encriptação SSL 256-bit' },
  { icon: Star, title: '4.9 / 5 estrelas', desc: '+2 400 avaliações' },
]

export default function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-[#0D0D0D] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerCasual}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {trusts.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpVariant}
              className="flex items-center gap-3"
            >
              <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex-shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[#F5F5F0] text-sm font-semibold">{title}</p>
                <p className="text-[#F5F5F0]/40 text-xs">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
