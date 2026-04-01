'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistStore } from '@/types/cart'

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (id: string) => {
        if (!get().has(id)) {
          set(state => ({ items: [...state.items, id] }))
        }
      },

      remove: (id: string) => {
        set(state => ({ items: state.items.filter(i => i !== id) }))
      },

      toggle: (id: string) => {
        if (get().has(id)) {
          get().remove(id)
        } else {
          get().add(id)
        }
      },

      has: (id: string) => get().items.includes(id),
    }),
    { name: 'loja-moda-wishlist' }
  )
)
