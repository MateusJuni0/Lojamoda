'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { cartDrawerVariants, backdropVariants } from '@/lib/animations'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { cartOpen, openCart: _openCart, closeCart } = useUIStore()
  const { items, updateQuantity, removeItem, total } = useCartStore()
  const dragControls = useDragControls()
  const overlayRef = useRef<HTMLDivElement>(null)
  const isEmpty = items.length === 0

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div ref={overlayRef} variants={backdropVariants} initial="hidden" animate="visible" exit="exit"
            onClick={() => closeCart()} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

          <motion.aside
            variants={cartDrawerVariants} initial="hidden" animate="visible" exit="exit"
            drag="x" dragControls={dragControls} dragConstraints={{ left: 0, right: 400 }} dragElastic={0.1}
            onDragEnd={(_, info) => { if (info.offset.x > 150) closeCart() }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col bg-[#0D0D0D] border-l border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg font-semibold text-[#F5F5F0]">Carrinho ({items.length})</h2>
              </div>
              <button onClick={() => closeCart()} className="p-2 text-[#F5F5F0]/50 hover:text-[#F5F5F0] transition-colors rounded-lg hover:bg-white/5" aria-label="Fechar carrinho">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-white/10" />
                  <p className="text-[#F5F5F0]/40 text-sm">O seu carrinho está vazio.</p>
                  <button onClick={() => closeCart()} className="text-[#D4AF37] text-sm hover:underline">Continuar a comprar</button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-xl bg-white/3 border border-white/5">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <Image src={item.product.images[0] ?? ''} alt={item.product.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F0] text-sm font-medium truncate">{item.product.name}</p>
                      {item.selectedSize && <p className="text-[#F5F5F0]/40 text-xs mt-0.5">Tamanho: {item.selectedSize}</p>}
                      {item.selectedColor && <p className="text-[#F5F5F0]/40 text-xs">Cor: {item.selectedColor}</p>}
                      <p className="text-[#D4AF37] text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:border-white/40 transition-colors">
                          <Minus size={10} />
                        </button>
                        <span className="text-[#F5F5F0] text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:border-white/40 transition-colors">
                          <Plus size={10} />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-red-400/60 hover:text-red-400 transition-colors" aria-label="Remover">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {!isEmpty && (
              <div className="px-6 py-5 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#F5F5F0]/60 text-sm">Subtotal</span>
                  <span className="text-[#F5F5F0] font-semibold">{formatPrice(total())}</span>
                </div>
                <p className="text-[#F5F5F0]/30 text-xs">Envio e impostos calculados no checkout.</p>
                <Link href="/checkout" onClick={() => closeCart()}
                  className="block w-full py-3.5 bg-[#D4AF37] text-[#0A0A0A] text-center text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors">
                  Finalizar Compra
                </Link>
                <Link href="/carrinho" onClick={() => closeCart()}
                  className="block w-full py-3 border border-white/20 text-[#F5F5F0]/70 text-center text-sm tracking-wide rounded-xl hover:border-white/40 hover:text-[#F5F5F0] transition-colors">
                  Ver Carrinho
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
