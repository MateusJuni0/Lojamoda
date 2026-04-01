'use client'

import { useEffect, useState } from 'react'

interface ScarcityBadgeProps {
  stock: number
  slug: string
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getViewerCount(slug: string, offset: number = 0): number {
  // Hash simples do slug para consistência entre renders
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i)
    hash |= 0
  }
  const base = 8 + Math.floor(seededRandom(Math.abs(hash) + offset) * 16)
  return base // 8–23
}

export default function ScarcityBadge({ stock, slug }: ScarcityBadgeProps) {
  const [viewers, setViewers] = useState<number>(0)
  const [tick, setTick] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setViewers(getViewerCount(slug, 0))
  }, [slug])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setTick((t) => {
        const next = t + 1
        setViewers(getViewerCount(slug, next))
        return next
      })
    }, 30_000)
    return () => clearInterval(interval)
  }, [mounted, slug])

  if (!mounted) return null

  // Stock crítico: últimas unidades
  if (stock > 0 && stock <= 5) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
        </span>
        <span className="text-red-400 text-xs font-semibold">
          ⚡ Últimas {stock} unidade{stock === 1 ? '' : 's'}
        </span>
      </div>
    )
  }

  // Em stock com entrega — mostrar viewers
  if (stock > 5) {
    return (
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
          </span>
          <span className="text-[#D4AF37] text-xs font-medium">
            🔥 {viewers} pessoas estão a ver isto agora
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
          <span className="text-emerald-400 text-xs font-medium">
            ✅ Em stock — Entrega amanhã se pedir até às 18h
          </span>
        </div>
      </div>
    )
  }

  return null
}
