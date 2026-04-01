import type { Product } from './product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
  price: number
}

export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  total: () => number
  itemCount: () => number
}

export interface WishlistStore {
  items: string[]
  add: (id: string) => void
  remove: (id: string) => void
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'cart'
  message: string
  description?: string
}

export interface UIStore {
  cartOpen: boolean
  searchOpen: boolean
  mobileNavOpen: boolean
  toasts: Toast[]
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openSearch: () => void
  closeSearch: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  toggleMobileNav: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}
