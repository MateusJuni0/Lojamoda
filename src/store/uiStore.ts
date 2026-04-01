'use client'

import { create } from 'zustand'
import type { UIStore, Toast } from '@/types/cart'

export const useUIStore = create<UIStore>()((set, get) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  toasts: [],

  openCart:        () => set({ cartOpen: true }),
  closeCart:       () => set({ cartOpen: false }),
  toggleCart:      () => set((state) => ({ cartOpen: !state.cartOpen })),
  openSearch:      () => set({ searchOpen: true }),
  closeSearch:     () => set({ searchOpen: false }),
  openMobileNav:   () => set({ mobileNavOpen: true }),
  closeMobileNav:  () => set({ mobileNavOpen: false }),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => get().removeToast(id), 4000)
  },

  removeToast: (id: string) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
