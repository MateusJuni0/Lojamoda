'use client'

import { useEffect, useRef } from 'react'

interface Pillar {
  svgPath: string
  title: string
  desc: string
}

const pillars: Pillar[] = [
  {
    svgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: 'Pagamento 100% Seguro',
    desc: 'Visa · MC · MB Way · Stripe',
  },
  {
    svgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="13" height="8" x="9" y="11" rx="1"/><path d="M16 14v.01"/></svg>`,
    title: 'Envio Gratuito',
    desc: 'Em compras acima de €69',
  },
  {
    svgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    title: 'Devoluções Gratuitas',
    desc: '30 dias — sem perguntas',
  },
  {
    svgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    title: '4.8/5 Avaliação',
    desc: '+2.400 clientes satisfeitos',
  },
  {
    svgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: 'Suporte WhatsApp',
    desc: 'Resposta em até 2h',
  },
]

export default function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Infinite scroll horizontal no mobile via CSS animation
  // No desktop: grid estático
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // A animação é gerida pelo CSS keyframe — nada a fazer aqui
  }, [])

  return (
    <section className="border-y border-white/5 bg-[#0A0A0A] py-4 overflow-hidden">
      {/* Desktop: grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 gap-4">
          {pillars.map((p) => (
            <PillarItem key={p.title} pillar={p} />
          ))}
        </div>
      </div>

      {/* Mobile: scroll animado */}
      <div className="md:hidden relative">
        <div
          ref={trackRef}
          className="flex gap-6 animate-trust-scroll"
          style={{ width: 'max-content' }}
        >
          {/* Duplicar para loop contínuo */}
          {[...pillars, ...pillars].map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="flex items-center gap-3 px-4 flex-shrink-0"
            >
              <div
                className="text-[#D4AF37] flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: p.svgPath }}
              />
              <div>
                <p className="text-[#F5F5F0] text-xs font-semibold whitespace-nowrap">{p.title}</p>
                <p className="text-[#F5F5F0]/40 text-xs whitespace-nowrap">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarItem({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="text-[#D4AF37] flex-shrink-0"
        dangerouslySetInnerHTML={{ __html: pillar.svgPath }}
      />
      <div>
        <p className="text-[#F5F5F0] text-xs font-semibold">{pillar.title}</p>
        <p className="text-[#F5F5F0]/40 text-xs">{pillar.desc}</p>
      </div>
    </div>
  )
}
