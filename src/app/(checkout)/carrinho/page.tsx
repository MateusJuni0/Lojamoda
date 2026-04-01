'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCartStore()
  const isEmpty = items.length === 0
  const subtotal = total()
  const shipping = subtotal >= 150 ? 0 : 8.9

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUpVariant}
          className="font-display text-4xl font-bold text-[#F5F5F0] mb-10">
          Cesto
        </motion.h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <ShoppingBag size={64} className="text-white/10" />
            <p className="text-[#F5F5F0]/30 text-xl">O seu cesto esta vazio.</p>
            <Link href="/roupas"
              className="px-8 py-3 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors">
              Continuar a Explorar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={staggerContainerCasual} initial="hidden" animate="visible" className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div key={item.id} layout variants={fadeUpVariant} className="flex gap-4 p-4 glass-card rounded-2xl">
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <Image src={item.product.images[0] ?? ''} alt={item.product.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#F5F5F0] font-medium mb-1">{item.product.name}</h3>
                    {item.selectedSize && <p className="text-[#F5F5F0]/40 text-xs">Tamanho: {item.selectedSize}</p>}
                    {item.selectedColor && <p className="text-[#F5F5F0]/40 text-xs">Cor: {item.selectedColor}</p>}
                    <p className="text-[#D4AF37] font-semibold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center text-[#F5F5F0]/60 hover:text-[#F5F5F0] transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-[#F5F5F0] text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center text-[#F5F5F0]/60 hover:text-[#F5F5F0] transition-colors">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-red-400/60 hover:text-red-400 transition-colors p-1">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button onClick={() => clearCart()} className="text-[#F5F5F0]/30 hover:text-red-400 text-xs transition-colors mt-2">
                Limpar cesto
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 h-fit sticky top-28">
              <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-6">Resumo</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#F5F5F0]/60 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#F5F5F0]/60 text-sm">
                  <span>Envio</span>
                  <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-[#F5F5F0] font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>
              <Link href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors">
                Finalizar Encomenda <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
