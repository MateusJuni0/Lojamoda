'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartStore, CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

function buildItemId(productId: string, color?: string, size?: string): string {
  return [productId, color, size].filter(Boolean).join('_')
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1, color?: string, size?: string) => {
        const id = buildItemId(product.id, color, size)
        const existing = get().items.find((i) => i.id === id)
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          }))
        } else {
          const item: CartItem = { id, product, quantity, selectedColor: color, selectedSize: size, price: product.price }
          set((state) => ({ items: [...state.items, item] }))
        }
      },

      removeItem: (id: string) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) { get().removeItem(id); return }
        set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)) }))
      },

      clearCart: () => set({ items: [] }),
      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'loja-moda-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
