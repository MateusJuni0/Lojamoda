'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal } from 'lucide-react'
import { filterPanelVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface FilterOption { label: string; value: string; count?: number }

interface FilterSidebarProps {
  open: boolean
  onClose: () => void
  sortBy: string
  onSortChange: (v: string) => void
  priceRange: [number, number]
  onPriceChange: (v: [number, number]) => void
  activeFilters: string[]
  onFilterToggle: (v: string) => void
  filterOptions: FilterOption[]
  total: number
}

const sortOptions = [
  { label: 'Relevância', value: 'relevance' },
  { label: 'Preço: Menor', value: 'price-asc' },
  { label: 'Preço: Maior', value: 'price-desc' },
  { label: 'Mais Recentes', value: 'newest' },
]

export default function FilterSidebar({
  open, onClose, sortBy, onSortChange,
  priceRange, onPriceChange,
  activeFilters, onFilterToggle,
  filterOptions, total,
}: FilterSidebarProps) {
  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-[#F5F5F0]">
          <SlidersHorizontal size={16} className="text-[#D4AF37]" />
          <span className="text-sm font-semibold tracking-wider">{total} produtos</span>
        </div>
        <button onClick={onClose} className="p-1.5 text-[#F5F5F0]/50 hover:text-[#F5F5F0] lg:hidden">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        {/* Sort */}
        <div>
          <h4 className="text-[#F5F5F0] text-xs tracking-widest uppercase font-semibold mb-3">Ordenar</h4>
          <div className="space-y-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  'w-full text-left py-2 px-3 rounded-lg text-sm transition-colors',
                  sortBy === opt.value
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:bg-white/5',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-[#F5F5F0] text-xs tracking-widest uppercase font-semibold mb-3">
            Preço: €{priceRange[0]} – €{priceRange[1]}
          </h4>
          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-[#D4AF37]"
          />
        </div>

        {/* Filters */}
        {filterOptions.length > 0 && (
          <div>
            <h4 className="text-[#F5F5F0] text-xs tracking-widest uppercase font-semibold mb-3">Filtros</h4>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onFilterToggle(opt.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs border transition-colors',
                    activeFilters.includes(opt.value)
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'border-white/15 text-[#F5F5F0]/50 hover:border-white/30 hover:text-[#F5F5F0]',
                  )}
                >
                  {opt.label} {opt.count !== undefined && `(${opt.count})`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop: always-visible sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 glass-card rounded-2xl h-fit sticky top-24">
        {content}
      </div>

      {/* Mobile: sliding panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.div
              variants={filterPanelVariants}
              initial="hidden" animate="visible" exit="exit"
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0D0D0D] border-r border-white/10 lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
