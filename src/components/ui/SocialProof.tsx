'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface Notification {
  id: number
  name: string
  city: string
  action: string
  product: string
  emoji: string
}

const NAMES = [
  { name: 'Miguel', city: 'Lisboa' },
  { name: 'Ana', city: 'Porto' },
  { name: 'João', city: 'Braga' },
  { name: 'Mariana', city: 'Coimbra' },
  { name: 'Ricardo', city: 'Setúbal' },
  { name: 'Sofia', city: 'Faro' },
  { name: 'Tiago', city: 'Aveiro' },
  { name: 'Inês', city: 'Guimarães' },
  { name: 'Rui', city: 'Viseu' },
  { name: 'Catarina', city: 'Évora' },
  { name: 'Pedro', city: 'Leiria' },
  { name: 'Beatriz', city: 'Funchal' },
  { name: 'Carlos', city: 'Cascais' },
  { name: 'Sara', city: 'Almada' },
  { name: 'Nuno', city: 'Sintra' },
]

const EVENTS = [
  { action: 'acabou de comprar', emoji: '👤' },
  { action: 'adicionou ao carrinho', emoji: '👤' },
  { action: 'acabou de comprar', emoji: '👤' },
]

const PRODUCTS = [
  'Relógio Minimalista Preto',
  'Blazer Casual Premium',
  'Relógio Dourado Clássico',
  'Camisa Oxford Branca',
  'Corrente de Prata 50cm',
  'Relógio Cronógrafo Azul',
  'Calças Cargo Premium',
  'Pulseira de Couro',
  'Casaco de Lã Premium',
  'Anel de Prata 925',
  'Relógio Automático Preto',
  'Blazer Slim Fit Cinzento',
  'Corrente de Ouro 18K',
  'Camisa Linho Bege',
]

let notifId = 0

function buildNotification(): Notification {
  const person = NAMES[Math.floor(Math.random() * NAMES.length)]!
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)]!
  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]!
  return {
    id: notifId++,
    name: person.name,
    city: person.city,
    action: event.action,
    product,
    emoji: event.emoji,
  }
}

export default function SocialProof() {
  const pathname = usePathname()
  const [notification, setNotification] = useState<Notification | null>(null)
  const [visible, setVisible] = useState(false)

  const isDesktop =
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false

  // Mostrar apenas em homepage e páginas de produto
  const isRelevantPage =
    pathname === '/' || pathname.startsWith('/produto/')

  const showNext = useCallback(() => {
    const notif = buildNotification()
    setNotification(notif)
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)
    return timer
  }, [])

  useEffect(() => {
    if (!isRelevantPage) return

    // Primeira notificação após 4s
    const initial = setTimeout(() => {
      const hideTimer = showNext()
      return () => clearTimeout(hideTimer)
    }, 4000)

    // Loop a cada 8s
    const loop = setInterval(() => {
      const hideTimer = showNext()
      return () => clearTimeout(hideTimer)
    }, 8000)

    return () => {
      clearTimeout(initial)
      clearInterval(loop)
    }
  }, [isRelevantPage, showNext])

  if (!isRelevantPage || !notification) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden lg:block pointer-events-none">
      <div
        className="transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-110%)',
        }}
      >
        <div className="bg-[#111] border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-base">
            {notification.emoji}
          </div>
          <div>
            <p className="text-[#F5F5F0] text-xs font-semibold">
              {notification.name}{' '}
              <span className="text-[#F5F5F0]/50 font-normal">de {notification.city}</span>
            </p>
            <p className="text-[#F5F5F0]/60 text-xs mt-0.5">
              {notification.action}{' '}
              <span className="text-[#D4AF37] font-medium">{notification.product}</span>
            </p>
            <p className="text-[#F5F5F0]/25 text-xs mt-1">Agora mesmo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
