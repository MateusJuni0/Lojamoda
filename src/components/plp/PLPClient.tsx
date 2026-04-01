'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { type Product } from '@/types/product'
import ProductGrid from '@/components/product/ProductGrid'
import FilterSidebar from './FilterSidebar'
import { fadeUpVariant } from '@/lib/animations'

interface PLPClientProps {
  products: Product[]
  title: string
  description: string
  filterOptions: { label: string; value: string; count?: number }[]
}

export default function PLPClient({ products, title, description, filterOptions }: PLPClientProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (v: string) => {
    setActiveFilters((prev) => prev.includes(v) ? prev.filter((f) => f !== v) : [...prev, v])
  }

  const filtered = useMemo(() => {
    let result = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    )
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sortBy === 'newest') result = [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew))
    return result
  }, [products, sortBy, priceRange])

  return (
    <div className="min-h-screen pt-24">
      {/* Hero banner */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="max-w-xl"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Coleção</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F5F0] mb-4">{title}</h1>
          <p className="text-[#F5F5F0]/50 text-lg">{description}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex gap-8">
          <FilterSidebar
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            activeFilters={activeFilters}
            onFilterToggle={toggleFilter}
            filterOptions={filterOptions}
            total={filtered.length}
          />

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-sm text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filtros
              </button>
              <p className="text-[#F5F5F0]/30 text-sm ml-auto">
                {filtered.length} produtos
              </p>
            </div>

            <ProductGrid products={filtered} columns={3} priority />
          </div>
        </div>
      </div>
    </div>
  )
}
