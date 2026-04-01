'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { mobileNavVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface MegaMenuData {
  label: string
  href: string
  sub: string[]
  editorial?: { image: string; title: string; cta: string }
  extra?: { label: string; href: string; highlight?: boolean }
}

const navLinks: MegaMenuData[] = [
  {
    label: 'Roupas',
    href: '/roupas',
    sub: ['Camisas', 'Blazers', 'Casacos', 'Calcas', 'Vestidos'],
    editorial: {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
      title: 'Colecao Primavera 2026',
      cta: 'Descobrir',
    },
  },
  {
    label: 'Relogios',
    href: '/relogios',
    sub: ['Cronografos', 'Dress Watch', 'Sport', 'Skeleton', 'GMT'],
    editorial: {
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
      title: 'Alta Relojoaria',
      cta: 'Explorar',
    },
    extra: { label: 'Consultor de Relogios', href: 'https://wa.me/351000000000?text=Ola,%20gostaria%20de%20falar%20com%20um%20consultor%20de%20relogios', highlight: true },
  },
  {
    label: 'Acessorios',
    href: '/acessorios',
    sub: ['Colares', 'Pulseiras', 'Aneis', 'Brincos', 'Cintos'],
    editorial: {
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      title: 'Detalhes que Definem',
      cta: 'Ver Colecao',
    },
  },
  { label: 'Colecoes', href: '/colecoes', sub: [] },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.97])

  const itemCount = useCartStore((s) => s.itemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const { toggleCart, mobileNavOpen, toggleMobileNav, openSearch } = useUIStore()

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 20))
    return () => unsub()
  }, [scrollY])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200)
  }

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'header-glass shadow-lg' : 'bg-transparent',
      )}
    >
      <div className="border-b border-white/5 py-1.5 text-center text-xs tracking-widest text-white/50 hidden md:block">
        ENVIO GRATUITO EM COMPRAS ACIMA DE &euro;150 &middot; DEVOLUCAO GRATUITA EM 30 DIAS
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0 group">
            <span className="font-display text-xl md:text-2xl font-bold tracking-widest text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors duration-300">NOIR</span>
            <span className="font-display text-xl md:text-2xl font-light tracking-widest text-[#D4AF37]">&nbsp;ELITE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => handleMouseEnter(link.label)} onMouseLeave={handleMouseLeave}>
                <Link
                  href={link.href}
                  className={cn('nav-link flex items-center gap-1 text-sm tracking-widest uppercase font-medium transition-colors duration-200',
                    activeDropdown === link.label ? 'text-[#D4AF37]' : 'text-[#F5F5F0]/80 hover:text-[#F5F5F0]')}
                >
                  {link.label}
                  {link.sub.length > 0 && (
                    <ChevronDown size={14} className={cn('transition-transform duration-200', activeDropdown === link.label && 'rotate-180')} />
                  )}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === link.label && link.sub.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] header-glass rounded-2xl p-0 overflow-hidden border border-white/10 shadow-2xl"
                    >
                      <div className="flex">
                        {/* Left: Editorial image */}
                        {link.editorial && (
                          <div className="w-[40%] relative overflow-hidden">
                            <Image
                              src={link.editorial.image}
                              alt={link.editorial.title}
                              fill
                              className="object-cover"
                              sizes="260px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-1">{link.label}</p>
                              <p className="text-white font-display text-lg font-semibold leading-tight mb-2">{link.editorial.title}</p>
                              <Link
                                href={link.href}
                                className="text-white/80 text-xs tracking-widest uppercase hover:text-[#D4AF37] transition-colors"
                              >
                                {link.editorial.cta} &rarr;
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* Right: Category links */}
                        <div className={cn('flex-1 p-6', link.editorial ? 'w-[60%]' : 'w-full')}>
                          <p className="text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase mb-4">Categorias</p>
                          <div className="space-y-1">
                            {link.sub.map((sub) => (
                              <Link
                                key={sub}
                                href={`${link.href}?categoria=${sub.toLowerCase()}`}
                                className="block py-2 px-3 text-sm text-[#F5F5F0]/70 hover:text-[#D4AF37] hover:bg-white/5 transition-colors rounded-lg"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                          {link.extra && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <a
                                href={link.extra.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  'flex items-center gap-2 py-2 px-3 text-sm rounded-lg transition-colors',
                                  link.extra.highlight
                                    ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10'
                                    : 'text-[#F5F5F0]/70 hover:text-[#F5F5F0]'
                                )}
                              >
                                <MessageCircle size={14} />
                                {link.extra.label}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => openSearch()} className="p-2 text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors" aria-label="Pesquisar">
              <Search size={20} />
            </button>
            <Link href="/conta/wishlist" className="relative p-2 text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors hidden sm:flex" aria-label="Lista de desejos">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={() => toggleCart()} className="relative p-2 text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors" aria-label="Cesto">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span key={itemCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
            <button onClick={() => toggleMobileNav()} className="md:hidden p-2 text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors" aria-label="Menu">
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div variants={mobileNavVariants} initial="hidden" animate="visible" exit="exit" className="md:hidden header-glass border-t border-white/10">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => toggleMobileNav()}
                  className="block py-3 text-[#F5F5F0]/80 hover:text-[#D4AF37] text-sm tracking-widest uppercase font-medium transition-colors border-b border-white/5">
                  {link.label}
                </Link>
              ))}
              <Link href="/conta" onClick={() => toggleMobileNav()} className="block py-3 text-[#F5F5F0]/50 hover:text-[#F5F5F0] text-sm tracking-widest uppercase">
                Minha Conta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
