'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#F5F5F0] mb-4">
          Encomenda Confirmada
        </h1>

        <p className="text-[#F5F5F0]/60 text-lg mb-2">
          Obrigado pela sua compra. A sua encomenda foi processada com sucesso.
        </p>

        {sessionId && (
          <p className="text-[#F5F5F0]/30 text-sm mb-8 font-mono">
            Ref: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-[#F5F5F0] font-semibold">Próximos passos</h2>
          </div>
          <ul className="space-y-3 text-[#F5F5F0]/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-0.5">1.</span>
              <span>Receberá um email de confirmação com os detalhes da encomenda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-0.5">2.</span>
              <span>A sua encomenda será preparada e enviada em 1-2 dias úteis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-0.5">3.</span>
              <span>Receberá o código de tracking por email quando for expedida</span>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#C9A430] transition-colors"
        >
          Continuar a Comprar
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
          <div className="text-[#F5F5F0]/40">A carregar...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
