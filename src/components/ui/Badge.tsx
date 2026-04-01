import { cn } from '@/lib/utils'

type BadgeVariant = 'new' | 'sale' | 'percent' | 'sold' | 'limit' | 'bestseller'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  new:        'bg-[#1A3A2A] text-[#4CAF7D] border border-[#2D7A4F]',
  sale:       'bg-[#3A1A1A] text-[#E87070] border border-[#C0392B]',
  percent:    'bg-[#D4AF37] text-black font-semibold',
  sold:       'bg-[#1A1A1A] text-[#5A5A56] border border-white/10',
  limit:      'bg-[#1A1A0A] text-[#D4AF37] border border-[#D4AF37]/30 animate-pulse',
  bestseller: 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30',
}

export function Badge({ variant, label, className }: BadgeProps) {
  const defaultLabels: Record<BadgeVariant, string> = {
    new:        'NOVO',
    sale:       'ARQUIVO',
    percent:    '',
    sold:       'ESGOTADO',
    limit:      'ÚLTIMAS PEÇAS',
    bestseller: 'BESTSELLER',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5',
        'text-[10px] uppercase tracking-widest font-medium',
        'rounded-sm whitespace-nowrap',
        variantClasses[variant],
        className
      )}
    >
      {label ?? defaultLabels[variant]}
    </span>
  )
}

interface StockBadgeProps {
  stock: number
  className?: string
}

export function StockBadge({ stock, className }: StockBadgeProps) {
  if (stock > 10) return null
  if (stock === 0) return <Badge variant="sold" className={className} />
  if (stock <= 3)  return <Badge variant="limit" label={stock === 1 ? 'ÚLTIMA UNIDADE' : `ÚLTIMAS ${stock} UN.`} className={className} />
  return <Badge variant="limit" label="POUCAS UNIDADES" className={cn('border-orange-500/30 text-orange-400', className)} />
}
