'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, label: 'Morada' },
  { id: 2, label: 'Envio' },
  { id: 3, label: 'Pagamento' },
]

const shippingOptions = [
  { id: 'standard', label: 'Standard', desc: '3–5 dias úteis', price: 8.9 },
  { id: 'express',  label: 'Expresso', desc: '1–2 dias úteis', price: 15.9 },
  { id: 'priority', label: 'Prioritário', desc: 'Dia seguinte',  price: 24.9 },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postal: '', country: 'Portugal',
    shipping: 'standard', cardNumber: '', cardExpiry: '', cardCvc: '',
  })
  const { items, total } = useCartStore()
  const subtotal = total()
  const shippingCost = subtotal >= 150 ? 0 : (shippingOptions.find((o) => o.id === form.shipping)?.price ?? 8.9)

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))
  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm'

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 variants={fadeUpVariant} initial="hidden" animate="visible"
          className="font-display text-4xl font-bold text-[#F5F5F0] mb-10">
          Checkout
        </motion.h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button onClick={() => s.id < step && setStep(s.id)}
                className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  step > s.id ? 'bg-[#D4AF37] text-[#0A0A0A]' :
                  step === s.id ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]' :
                  'bg-white/5 border border-white/15 text-[#F5F5F0]/30')}>
                {step > s.id ? <Check size={14} /> : s.id}
              </button>
              <span className={cn('text-sm hidden sm:block', step === s.id ? 'text-[#F5F5F0]' : 'text-[#F5F5F0]/30')}>
                {s.label}
              </span>
              {i < steps.length - 1 && <ChevronRight size={14} className="text-white/20 mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Morada de Entrega</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Nome completo" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    <input className={inputCls} placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                  <input className={inputCls} placeholder="Telemóvel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                  <input className={inputCls} placeholder="Morada" value={form.address} onChange={(e) => update('address', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Cidade" value={form.city} onChange={(e) => update('city', e.target.value)} />
                    <input className={inputCls} placeholder="Código Postal" value={form.postal} onChange={(e) => update('postal', e.target.value)} />
                  </div>
                  <button onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors mt-2">
                    Continuar para Envio
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Método de Envio</h2>
                  {shippingOptions.map((opt) => (
                    <button key={opt.id} onClick={() => update('shipping', opt.id)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left',
                        form.shipping === opt.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/10 hover:border-white/20')}>
                      <div>
                        <p className={cn('text-sm font-medium', form.shipping === opt.id ? 'text-[#D4AF37]' : 'text-[#F5F5F0]')}>{opt.label}</p>
                        <p className="text-[#F5F5F0]/40 text-xs">{opt.desc}</p>
                      </div>
                      <span className="text-[#F5F5F0]/70 text-sm">
                        {subtotal >= 150 && opt.id === 'standard' ? 'Grátis' : formatPrice(opt.price)}
                      </span>
                    </button>
                  ))}
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors">Voltar</button>
                    <button onClick={() => setStep(3)} className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors">Continuar</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Pagamento</h2>
                  <input className={inputCls} placeholder="Número do Cartão" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Validade MM/AA" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} />
                    <input className={inputCls} placeholder="CVV" value={form.cardCvc} onChange={(e) => update('cardCvc', e.target.value)} />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors">Voltar</button>
                    <button className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors">Confirmar Pedido</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-5 space-y-4 sticky top-28">
              <h3 className="font-display text-lg font-semibold text-[#F5F5F0]">Resumo do Pedido</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <span className="text-[#F5F5F0]/50 truncate flex-1">{item.product.name}</span>
                    <span className="text-[#F5F5F0]/70">×{item.quantity}</span>
                    <span className="text-[#F5F5F0]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[#F5F5F0]/60 text-sm">
                <span>Envio</span>
                <span>{shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-[#F5F5F0] font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal + shippingCost)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
