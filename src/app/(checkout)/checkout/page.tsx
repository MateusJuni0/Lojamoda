'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Gift, FileText } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, label: 'Dados' },
  { id: 2, label: 'Envio' },
  { id: 3, label: 'Pagamento' },
]

const shippingOptions = [
  { id: 'standard', label: 'Standard', desc: '3-5 dias uteis', price: 8.9 },
  { id: 'express',  label: 'Expresso', desc: '1-2 dias uteis', price: 15.9 },
  { id: 'priority', label: 'Prioritario', desc: 'Dia seguinte',  price: 24.9 },
]

const paymentMethods = [
  { id: 'mbway', label: 'MB Way', desc: 'Pagamento instantaneo' },
  { id: 'card', label: 'Cartao', desc: 'Visa, Mastercard' },
  { id: 'paypal', label: 'PayPal', desc: 'Pagamento seguro' },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postal: '', country: 'Portugal',
    shipping: 'standard', paymentMethod: 'mbway',
    cardNumber: '', cardExpiry: '', cardCvc: '',
    giftWrap: false, giftNote: false, giftMessage: '',
  })
  const { items, total } = useCartStore()
  const subtotal = total()
  const shippingCost = subtotal >= 150 ? 0 : (shippingOptions.find((o) => o.id === form.shipping)?.price ?? 8.9)
  const giftWrapCost = form.giftWrap ? 8 : 0
  const grandTotal = subtotal + shippingCost + giftWrapCost

  const update = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }))
  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm'

  return (
    <div className="min-h-screen pt-8 pb-20 bg-[#0A0A0A]">
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
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Dados de Entrega</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Nome completo" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    <input className={inputCls} placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                  <input className={inputCls} placeholder="Telemovel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                  <input className={inputCls} placeholder="Morada" value={form.address} onChange={(e) => update('address', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputCls} placeholder="Cidade" value={form.city} onChange={(e) => update('city', e.target.value)} />
                    <input className={inputCls} placeholder="Codigo Postal" value={form.postal} onChange={(e) => update('postal', e.target.value)} />
                  </div>
                  <motion.button
                    onClick={() => setStep(2)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 25 }}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors mt-2"
                  >
                    Continuar para Envio
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Metodo de Envio</h2>
                  {shippingOptions.map((opt) => (
                    <button key={opt.id} onClick={() => update('shipping', opt.id)}
                      className={cn('w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left',
                        form.shipping === opt.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/10 hover:border-white/20')}>
                      <div>
                        <p className={cn('text-sm font-medium', form.shipping === opt.id ? 'text-[#D4AF37]' : 'text-[#F5F5F0]')}>{opt.label}</p>
                        <p className="text-[#F5F5F0]/40 text-xs">{opt.desc}</p>
                      </div>
                      <span className="text-[#F5F5F0]/70 text-sm">
                        {subtotal >= 150 && opt.id === 'standard' ? 'Gratis' : formatPrice(opt.price)}
                      </span>
                    </button>
                  ))}
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors">Voltar</button>
                    <motion.button
                      onClick={() => setStep(3)}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 25 }}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                      className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
                    >
                      Continuar
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6">
                  {/* Payment method selector */}
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">Pagamento</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {paymentMethods.map((pm) => (
                        <button key={pm.id} onClick={() => update('paymentMethod', pm.id)}
                          className={cn('p-3 rounded-xl border text-center transition-colors',
                            form.paymentMethod === pm.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/10 hover:border-white/20')}>
                          <p className={cn('text-sm font-medium', form.paymentMethod === pm.id ? 'text-[#D4AF37]' : 'text-[#F5F5F0]')}>{pm.label}</p>
                          <p className="text-[#F5F5F0]/30 text-[10px] mt-0.5">{pm.desc}</p>
                        </button>
                      ))}
                    </div>
                    {form.paymentMethod === 'card' && (
                      <div className="space-y-3 pt-2">
                        <input className={inputCls} placeholder="Numero do Cartao" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <input className={inputCls} placeholder="Validade MM/AA" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} />
                          <input className={inputCls} placeholder="CVV" value={form.cardCvc} onChange={(e) => update('cardCvc', e.target.value)} />
                        </div>
                      </div>
                    )}
                    {form.paymentMethod === 'mbway' && (
                      <p className="text-[#F5F5F0]/40 text-xs">Sera redirecionado para a app MB Way apos confirmar.</p>
                    )}
                    {form.paymentMethod === 'paypal' && (
                      <p className="text-[#F5F5F0]/40 text-xs">Sera redirecionado para o PayPal apos confirmar.</p>
                    )}
                  </div>

                  {/* Gifting Upsell (#5) */}
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift size={16} className="text-[#D4AF37]" />
                      <h3 className="text-[#F5F5F0] text-sm font-semibold tracking-wide">Opcoes de Presente</h3>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.giftWrap}
                        onChange={(e) => update('giftWrap', e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#D4AF37] rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[#F5F5F0]/80 text-sm group-hover:text-[#F5F5F0] transition-colors">
                            Embrulho de presente Noir Elite
                          </p>
                          <span className="text-[#D4AF37] text-xs font-semibold">+&euro;8</span>
                        </div>
                        <p className="text-[#F5F5F0]/40 text-xs mt-0.5">
                          Caixa preta mate com fita de cetim dourada
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.giftNote}
                        onChange={(e) => update('giftNote', e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#D4AF37] rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[#F5F5F0]/80 text-sm group-hover:text-[#F5F5F0] transition-colors">
                            Nota manuscrita personalizada
                          </p>
                          <span className="text-[#D4AF37]/60 text-xs">Gratis</span>
                        </div>
                        <p className="text-[#F5F5F0]/40 text-xs mt-0.5">
                          Cartao caligrafico com a sua mensagem pessoal
                        </p>
                      </div>
                    </label>

                    <AnimatePresence>
                      {(form.giftWrap || form.giftNote) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <textarea
                            value={form.giftMessage}
                            onChange={(e) => update('giftMessage', e.target.value)}
                            placeholder="A sua mensagem personalizada..."
                            className={cn(inputCls, 'min-h-[80px] resize-none')}
                            maxLength={200}
                          />
                          <p className="text-[#F5F5F0]/20 text-[10px] text-right mt-1">{form.giftMessage.length}/200</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {form.giftWrap && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
                        <FileText size={14} className="text-[#D4AF37]" />
                        <p className="text-[#F5F5F0]/50 text-xs">
                          Embalagem premium: caixa rigida preta mate, fita de cetim, papel de seda e selo Noir Elite.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors">Voltar</button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 25 }}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                      className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
                    >
                      Confirmar Encomenda
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-5 space-y-4 sticky top-8">
              <h3 className="font-display text-lg font-semibold text-[#F5F5F0]">Resumo da Encomenda</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <Image src={item.product.images[0] ?? ''} alt={item.product.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <span className="text-[#F5F5F0]/50 truncate flex-1">{item.product.name}</span>
                    <span className="text-[#F5F5F0]/70">&times;{item.quantity}</span>
                    <span className="text-[#F5F5F0]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-white/10 pt-3">
                <div className="flex justify-between text-[#F5F5F0]/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#F5F5F0]/60">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                {form.giftWrap && (
                  <div className="flex justify-between text-[#F5F5F0]/60">
                    <span>Embrulho presente</span>
                    <span>{formatPrice(giftWrapCost)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-[#F5F5F0] font-semibold">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
