'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger'
type Size    = 'sm' | 'md' | 'lg' | 'xl' | 'icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[#D4AF37] text-black hover:bg-[#F5D179] border border-[#D4AF37]',
  secondary: 'bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/5',
  ghost:     'bg-transparent text-white border-transparent hover:text-[#D4AF37]',
  dark:      'bg-[#1A1A1A] text-white border border-white/10 hover:bg-[#252525]',
  danger:    'bg-[#C0392B] text-white border border-[#C0392B] hover:bg-[#E74C3C]',
}

const sizeClasses: Record<Size, string> = {
  sm:   'h-9  px-4  text-xs  tracking-widest',
  md:   'h-11 px-6  text-sm  tracking-widest',
  lg:   'h-13 px-8  text-sm  tracking-widest',
  xl:   'h-15 px-12 text-base tracking-widest',
  icon: 'h-10 w-10 p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98, y: 0 } : {}}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center uppercase font-medium',
          'transition-all duration-200 cursor-pointer',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            A processar...
          </span>
        ) : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
