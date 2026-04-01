'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Heart, User, Settings, LogOut, ArrowRight } from 'lucide-react'
import { staggerContainerCasual, fadeUpVariant } from '@/lib/animations'
import { useWishlistStore } from '@/store/wishlistStore'

const sections = [
  { icon: Package, label: 'Encomendas', desc: 'Veja o estado das suas encomendas', href: '/conta/encomendas' },
  { icon: Heart, label: 'Lista de Desejos', desc: 'Os seus produtos favoritos', href: '/conta/wishlist' },
  { icon: User, label: 'Perfil', desc: 'Dados pessoais e moradas', href: '/conta/perfil' },
  { icon: Settings, label: 'Definições', desc: 'Segurança e preferências', href: '/conta/definicoes' },
]

export default function ContaPage() {
  const wishlistCount = useWishlistStore((s) => s.items.length)

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerCasual}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={fadeUpVariant} className="mb-12">
            <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-2">Bem-vindo</p>
            <h1 className="font-display text-4xl font-bold text-[#F5F5F0]">Minha Conta</h1>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Encomendas', value: '0' },
              { label: 'Favoritos', value: wishlistCount.toString() },
              { label: 'Pontos', value: '0' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-[#D4AF37] mb-1">{stat.value}</p>
                <p className="text-[#F5F5F0]/40 text-xs tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Sections grid */}
          <motion.div variants={staggerContainerCasual} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {sections.map(({ icon: Icon, label, desc, href }) => (
              <motion.div key={label} variants={fadeUpVariant}>
                <Link
                  href={href}
                  className="group flex items-center gap-4 p-5 glass-card rounded-2xl hover:border-[#D4AF37]/20 border border-transparent transition-colors"
                >
                  <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex-shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#F5F5F0] font-medium mb-0.5">{label}</p>
                    <p className="text-[#F5F5F0]/40 text-xs">{desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#F5F5F0]/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Sign out */}
          <motion.div variants={fadeUpVariant}>
            <button className="flex items-center gap-2 text-[#F5F5F0]/30 hover:text-red-400 transition-colors text-sm">
              <LogOut size={15} />
              Terminar Sessão
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
