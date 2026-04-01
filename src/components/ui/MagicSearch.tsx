'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'
import { backdropVariants, fadeUpVariant } from '@/lib/animations'
import type { Product } from '@/types/product'

const filterCategories = [
  { key: 'all', label: 'Tudo' },
  { key: 'APPAREL', label: 'Roupas' },
  { key: 'WATCH', label: 'Relogios' },
  { key: 'ACCESSORY', label: 'Acessorios' },
] as const

type FilterKey = (typeof filterCategories)[number]['key']

export default function MagicSearch() {
  const { searchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterKey>('all')
  const inputRef = useRef<HTMLInputElement>(null)

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        useUIStore.getState().openSearch()
      }
      if (e.key === 'Escape') {
        closeSearch()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeSearch])

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setFilter('all')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [searchOpen])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter((p: Product) => {
      const matchesQuery =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      const matchesFilter = filter === 'all' || p.type === filter
      return matchesQuery && matchesFilter
    }).slice(0, 8)
  }, [query, filter])

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center"
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch() }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-2xl px-4 pt-24 md:pt-32"
          >
            {/* Close button */}
            <button
              onClick={() => closeSearch()}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Fechar pesquisa"
            >
              <X size={24} />
            </button>

            {/* Search input */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que procura?"
                className="w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] pl-8 pr-4 py-4 text-[#F5F5F0] text-2xl md:text-3xl placeholder:text-white/20 focus:outline-none transition-colors"
                style={{ fontFamily: 'var(--font-editorial)' }}
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 mb-8">
              {filterCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-colors ${
                    filter === cat.key
                      ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                      : 'border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {query.trim() && (
                <motion.div
                  key={query + filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 max-h-[50vh] overflow-y-auto"
                >
                  {results.length === 0 ? (
                    <p className="text-white/30 text-sm text-center py-8">
                      Nenhum resultado para &quot;{query}&quot;
                    </p>
                  ) : (
                    results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/produto/${product.slug}`}
                        onClick={() => closeSearch()}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                          <Image
                            src={product.images[0] ?? ''}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#F5F5F0] text-sm font-medium truncate group-hover:text-[#D4AF37] transition-colors">
                            {product.name}
                          </p>
                          <p className="text-white/30 text-xs">{product.category}</p>
                        </div>
                        <span className="text-[#D4AF37] text-sm font-semibold flex-shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            {!query.trim() && (
              <motion.p variants={fadeUpVariant} className="text-white/20 text-xs text-center mt-8">
                Escreva para pesquisar entre {products.length} produtos exclusivos
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
