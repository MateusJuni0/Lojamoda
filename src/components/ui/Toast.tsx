'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, ShoppingBag } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { toastVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'
import type { Toast as ToastType } from '@/types/cart'

const toastConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-[#0D2B1A]',
    border: 'border-l-[#2D7A4F]',
    iconColor: 'text-[#4CAF7D]',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-[#2B0D0D]',
    border: 'border-l-[#C0392B]',
    iconColor: 'text-[#E87070]',
  },
  info: {
    icon: Info,
    bg: 'bg-[#0D1F2B]',
    border: 'border-l-[#1A6B8A]',
    iconColor: 'text-[#5AB4D4]',
  },
  cart: {
    icon: ShoppingBag,
    bg: 'bg-[#1A1A0D]',
    border: 'border-l-[#D4AF37]',
    iconColor: 'text-[#D4AF37]',
  },
}

function ToastItem({ toast }: { toast: ToastType }) {
  const { removeToast } = useUIStore()
  const config = toastConfig[toast.type]
  const Icon = config.icon

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'flex items-start gap-3 p-4 rounded-sm border-l-4 min-w-[300px] max-w-sm',
        'shadow-xl cursor-pointer',
        config.bg,
        config.border,
        'border border-white/5'
      )}
      onClick={() => removeToast(toast.id)}
    >
      <Icon size={18} className={cn('shrink-0 mt-0.5', config.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium">{toast.message}</p>
        {toast.description && (
          <p className="text-xs text-white/60 mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={e => { e.stopPropagation(); removeToast(toast.id) }}
        className="text-white/40 hover:text-white/80 transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts } = useUIStore()

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
