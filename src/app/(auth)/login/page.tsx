'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { fadeUpVariant, staggerContainerCasual } from '@/lib/animations'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm'

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainerCasual}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={fadeUpVariant} className="text-center mb-10">
          <Link href="/">
            <span className="font-display text-2xl font-bold tracking-widest text-[#F5F5F0]">NOIR</span>
            <span className="font-display text-2xl font-light tracking-widest text-[#D4AF37]">&nbsp;ÉLITE</span>
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="glass-card rounded-2xl p-8">
          {/* Toggle */}
          <div className="flex rounded-xl border border-white/10 p-1 mb-8">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  mode === m ? 'bg-[#D4AF37] text-[#0A0A0A]' : 'text-[#F5F5F0]/50 hover:text-[#F5F5F0]'
                }`}
              >
                {m === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {mode === 'register' && (
              <input className={inputCls} placeholder="Nome completo" value={form.name} onChange={(e) => update('name', e.target.value)} />
            )}
            <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <div className="relative">
              <input
                className={inputCls}
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5F5F0]/40 hover:text-[#F5F5F0]"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-[#D4AF37] text-xs hover:underline">
                  Esqueceu a password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
            >
              {mode === 'login' ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <p className="text-center text-[#F5F5F0]/30 text-xs mt-6">
            Ao continuar, aceita os nossos{' '}
            <Link href="/termos" className="text-[#D4AF37] hover:underline">Termos de Uso</Link>
            {' '}e{' '}
            <Link href="/privacidade" className="text-[#D4AF37] hover:underline">Política de Privacidade</Link>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
