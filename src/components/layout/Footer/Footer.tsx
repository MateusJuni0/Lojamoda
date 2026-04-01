'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

const footerLinks = {
  loja: {
    title: 'Loja',
    links: [
      { label: 'Roupas', href: '/roupas' },
      { label: 'Relógios', href: '/relogios' },
      { label: 'Acessórios', href: '/acessorios' },
      { label: 'Coleções', href: '/colecoes' },
      { label: 'Promoções', href: '/promocoes' },
    ],
  },
  conta: {
    title: 'Minha Conta',
    links: [
      { label: 'Login / Registo', href: '/login' },
      { label: 'Minha Conta', href: '/conta' },
      { label: 'Encomendas', href: '/conta/encomendas' },
      { label: 'Lista de Desejos', href: '/conta/wishlist' },
    ],
  },
  ajuda: {
    title: 'Ajuda',
    links: [
      { label: 'FAQ', href: '/ajuda/faq' },
      { label: 'Envios e Devoluções', href: '/ajuda/envios' },
      { label: 'Guia de Tamanhos', href: '/ajuda/tamanhos' },
      { label: 'Contacto', href: '/ajuda/contacto' },
    ],
  },
  empresa: {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/sobre' },
      { label: 'Sustentabilidade', href: '/sustentabilidade' },
      { label: 'Privacidade', href: '/privacidade' },
      { label: 'Termos de Uso', href: '/termos' },
    ],
  },
}

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerCasual}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={fadeUpVariant} className="text-center md:text-left">
              <h3 className="font-display text-2xl font-semibold text-[#F5F5F0] mb-2">
                Acesso Antecipado Exclusivo
              </h3>
              <p className="text-[#F5F5F0]/50 text-sm">
                Receba novas coleções e ofertas privadas antes de todos.
              </p>
            </motion.div>
            <motion.form
              variants={fadeUpVariant}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                placeholder="o seu email"
                className="flex-1 md:w-72 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#C9A430] transition-colors whitespace-nowrap"
              >
                Subscrever
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-xl font-bold tracking-widest text-[#F5F5F0]">NOIR</span>
              <span className="font-display text-xl font-light tracking-widest text-[#D4AF37]">&nbsp;ÉLITE</span>
            </Link>
            <p className="text-[#F5F5F0]/40 text-sm leading-relaxed mb-6 max-w-xs">
              Moda de luxo curada para quem não transige na qualidade.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg border border-white/10 text-[#F5F5F0]/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="text-[#F5F5F0] text-xs tracking-widest uppercase font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#F5F5F0]/40 hover:text-[#F5F5F0]/80 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5F5F0]/30 text-xs">
            © {new Date().getFullYear()} Noir Élite. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-[#F5F5F0]/20 text-xs">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>MB Way</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
