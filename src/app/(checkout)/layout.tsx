import Link from 'next/link'
import { ShieldCheck, RotateCcw, Lock } from 'lucide-react'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Minimal header — logo only + trust indicators */}
      <header className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-xl font-bold tracking-widest text-[#F5F5F0]">NOIR</span>
            <span className="font-display text-xl font-light tracking-widest text-[#D4AF37]">&nbsp;ELITE</span>
          </Link>
          <div className="hidden sm:flex items-center gap-4 text-[#F5F5F0]/40 text-xs">
            <span className="flex items-center gap-1.5">
              <Lock size={12} className="text-[#D4AF37]" />
              Checkout Seguro
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#D4AF37]" />
              SSL Encriptado
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5">
              <RotateCcw size={12} className="text-[#D4AF37]" />
              30 Dias Devolucao
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Minimal footer */}
      <footer className="border-t border-white/5 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F5F5F0]/20 text-xs">
            &copy; 2025 Noir Elite. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
