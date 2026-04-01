'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerContainerCasual, cardItemVariant } from '@/lib/animations'

const categories = [
  {
    label: 'Roupas',
    href: '/roupas',
    desc: 'Do casual ao formal — tecidos premium, cortes impecáveis.',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    label: 'Relógios',
    href: '/relogios',
    desc: 'Cronométricas obras de arte. Cada detalhe, uma declaração.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    span: 'md:col-span-1',
  },
  {
    label: 'Acessórios',
    href: '/acessorios',
    desc: 'O toque final que eleva qualquer look a obra de arte.',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    span: 'md:col-span-1',
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Categorias</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F0]">
          Explore o Universo
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainerCasual}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-2 auto-rows-[260px]"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            variants={cardItemVariant}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer ${cat.span}`}
          >
            <Link href={cat.href} className="block h-full">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F0] mb-1">
                  {cat.label}
                </h3>
                <p className="text-[#F5F5F0]/60 text-sm mb-3 hidden md:block">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#D4AF37] text-xs tracking-widest uppercase font-semibold group-hover:gap-2 transition-all">
                  Explorar <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
