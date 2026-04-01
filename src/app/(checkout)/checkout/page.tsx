'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, CreditCard, Loader2, Gift } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { calculateShipping, SUPPORTED_COUNTRIES } from '@/lib/shipping'

const steps = [
  { id: 1, label: 'Morada' },
  { id: 2, label: 'Envio' },
  { id: 3, label: 'Pagamento' },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal: '',
    country: 'PT',
    giftWrap: false,
    giftMessage: '',
  })
  const { items, total } = useCartStore()
  const subtotal = total()
  const shipping = calculateShipping(form.country, subtotal)

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm'

  const handleStripeCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.price,
            quantity: item.quantity,
            image: item.product.images[0],
            color: item.selectedColor,
            size: item.selectedSize,
          })),
          gift_wrap: form.giftWrap,
          gift_message: form.giftMessage,
          shipping_country: form.country,
        }),
      })

      const data = (await response.json()) as { success: boolean; data?: { url: string }; error?: string }

      if (!data.success || !data.data?.url) {
        setError(data.error ?? 'Erro ao criar sessão de pagamento')
        return
      }

      window.location.href = data.data.url
    } catch {
      setError('Erro de ligação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl font-bold text-[#F5F5F0] mb-10"
        >
          Checkout
        </motion.h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  step > s.id
                    ? 'bg-[#D4AF37] text-[#0A0A0A]'
                    : step === s.id
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-white/5 border border-white/15 text-[#F5F5F0]/30',
                )}
              >
                {step > s.id ? <Check size={14} /> : s.id}
              </button>
              <span
                className={cn(
                  'text-sm hidden sm:block',
                  step === s.id ? 'text-[#F5F5F0]' : 'text-[#F5F5F0]/30',
                )}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-white/20 mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4"
                >
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">
                    Morada de Entrega
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className={inputCls}
                      placeholder="Nome completo"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                    <input
                      className={inputCls}
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                  <input
                    className={inputCls}
                    placeholder="Telemóvel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="Morada"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className={inputCls}
                      placeholder="Cidade"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                    />
                    <input
                      className={inputCls}
                      placeholder="Código Postal"
                      value={form.postal}
                      onChange={(e) => update('postal', e.target.value)}
                    />
                  </div>
                  <select
                    className={inputCls}
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#0A0A0A]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors mt-2"
                  >
                    Continuar para Envio
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4"
                >
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">
                    Envio e Opções
                  </h2>

                  {/* Shipping info */}
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#F5F5F0] text-sm font-medium">
                          {shipping.label}
                        </p>
                        <p className="text-[#F5F5F0]/40 text-xs mt-1">
                          3-5 dias úteis
                        </p>
                      </div>
                      <span className="text-[#D4AF37] text-sm font-semibold">
                        {shipping.free ? 'Grátis' : formatPrice(shipping.price)}
                      </span>
                    </div>
                    {!shipping.free && (
                      <p className="text-[#F5F5F0]/30 text-xs mt-2">
                        Portes grátis a partir de{' '}
                        {formatPrice(
                          shipping.zone === 'PT_CONTINENTAL'
                            ? 150
                            : shipping.zone === 'EU' || shipping.zone === 'ES'
                              ? 200
                              : 300,
                        )}
                      </p>
                    )}
                  </div>

                  {/* Gift wrap */}
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.giftWrap}
                        onChange={(e) => update('giftWrap', e.target.checked)}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <Gift size={16} className="text-[#D4AF37]" />
                      <span className="text-[#F5F5F0] text-sm">
                        Embrulho para presente
                      </span>
                    </label>
                    {form.giftWrap && (
                      <textarea
                        className={cn(inputCls, 'mt-3 min-h-[80px]')}
                        placeholder="Mensagem de presente (opcional)"
                        value={form.giftMessage}
                        onChange={(e) => update('giftMessage', e.target.value)}
                      />
                    )}
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6 space-y-4"
                >
                  <h2 className="font-display text-xl font-semibold text-[#F5F5F0] mb-2">
                    Pagamento
                  </h2>

                  <p className="text-[#F5F5F0]/50 text-sm">
                    Será redirecionado para o Stripe para completar o pagamento de
                    forma segura. Aceitamos Cartão de Crédito/Débito e MB Way.
                  </p>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <CreditCard size={20} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-[#F5F5F0] text-sm font-medium">
                        Pagamento seguro via Stripe
                      </p>
                      <p className="text-[#F5F5F0]/40 text-xs">
                        Os seus dados de pagamento são processados de forma segura
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-white/15 text-[#F5F5F0]/60 text-sm rounded-xl hover:border-white/30 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleStripeCheckout}
                      disabled={loading || items.length === 0}
                      className="flex-1 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          A processar...
                        </>
                      ) : (
                        'Pagar com Stripe'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-5 space-y-4 sticky top-28">
              <h3 className="font-display text-lg font-semibold text-[#F5F5F0]">
                Resumo do Pedido
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <span className="text-[#F5F5F0]/50 truncate flex-1">
                      {item.product.name}
                    </span>
                    <span className="text-[#F5F5F0]/70">&times;{item.quantity}</span>
                    <span className="text-[#F5F5F0]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[#F5F5F0]/60 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#F5F5F0]/60 text-sm">
                <span>Envio ({shipping.label})</span>
                <span className={shipping.free ? 'text-emerald-400' : ''}>
                  {shipping.free ? 'Grátis' : formatPrice(shipping.price)}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-[#F5F5F0] font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
