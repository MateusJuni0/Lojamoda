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
      { label: 'Relogios', href: '/relogios' },
      { label: 'Acessorios', href: '/acessorios' },
      { label: 'Colecoes', href: '/colecoes' },
      { label: 'Privilegios', href: '/privilegios' },
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
      { label: 'Envios e Devolucoes', href: '/ajuda/envios' },
      { label: 'Guia de Tamanhos', href: '/ajuda/tamanhos' },
      { label: 'Contacto', href: '/ajuda/contacto' },
    ],
  },
  empresa: {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nos', href: '/sobre' },
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

function VisaLogo() {
  return (
    <svg viewBox="0 0 48 16" width="38" height="13" aria-label="Visa" className="opacity-50 hover:opacity-80 transition-opacity">
      <rect width="48" height="16" rx="3" fill="#1A1F71"/>
      <text x="24" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">VISA</text>
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" width="32" height="20" aria-label="Mastercard" className="opacity-50 hover:opacity-80 transition-opacity">
      <circle cx="14" cy="12" r="10" fill="#EB001B"/>
      <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
      <path d="M19 5.5a10 10 0 0 1 0 13A10 10 0 0 1 19 5.5z" fill="#FF5F00"/>
    </svg>
  )
}

function MBWayLogo() {
  return (
    <svg viewBox="0 0 52 16" width="42" height="13" aria-label="MB Way" className="opacity-50 hover:opacity-80 transition-opacity">
      <rect width="52" height="16" rx="3" fill="#0B2265"/>
      <text x="26" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">MB WAY</text>
    </svg>
  )
}

function PayPalLogo() {
  return (
    <svg viewBox="0 0 52 16" width="42" height="13" aria-label="PayPal" className="opacity-50 hover:opacity-80 transition-opacity">
      <rect width="52" height="16" rx="3" fill="#003087"/>
      <text x="26" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">PayPal</text>
    </svg>
  )
}

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 52 16" width="42" height="13" aria-label="Apple Pay" className="opacity-50 hover:opacity-80 transition-opacity">
      <rect width="52" height="16" rx="3" fill="#1C1C1E"/>
      <text x="26" y="11.5" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600" fontFamily="-apple-system,sans-serif"> Pay</text>
    </svg>
  )
}

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
                Receba novas colecoes e ofertas privadas antes de todos.
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
              <span className="font-display text-xl font-light tracking-widest text-[#D4AF37]">&nbsp;ELITE</span>
            </Link>
            <p className="text-[#F5F5F0]/40 text-sm leading-relaxed mb-6 max-w-xs">
              Moda de luxo curada para quem nao transige na qualidade.
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

      {/* Trust seals */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <VisaLogo />
            <MastercardLogo />
            <MBWayLogo />
            <PayPalLogo />
            <ApplePayLogo />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-2.5 py-1">
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1.5 3.5v4C1.5 10.5 4 12.5 7 13c3-0.5 5.5-2.5 5.5-5.5v-4L7 1z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[#F5F5F0]/40 text-xs">SSL Seguro</span>
            </div>
            <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-2.5 py-1">
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="2" width="12" height="10" rx="2" stroke="#D4AF37" strokeWidth="1.2"/>
                <path d="M5 7h4M7 5v4" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-[#F5F5F0]/40 text-xs">RGPD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-[#F5F5F0]/25 text-xs text-center">
            &copy; 2025 Noir Elite. Todos os direitos reservados. NIF: 123456789
          </p>
        </div>
      </div>
    </footer>
  )
}
