'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

interface StockData {
  stock: number
  loading: boolean
}

export function useProductStock(productId: string): StockData {
  const [stock, setStock] = useState<number>(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }

    // Initial fetch
    supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single()
      .then(({ data }) => {
        const row = data as { stock: number } | null
        if (row) setStock(row.stock)
        setLoading(false)
      })

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`stock-${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${productId}`,
        },
        (payload) => {
          const newRecord = payload.new as { stock: number }
          setStock(newRecord.stock)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [productId])

  return { stock, loading }
}
