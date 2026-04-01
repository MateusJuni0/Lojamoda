import { getSupabaseAdmin } from './supabase'
import type { OrderItem, ShippingAddress } from '@/types/database'

// ============================================================
// ROW TYPES (match Supabase schema)
// ============================================================

export interface ProductRow {
  id: string
  slug: string
  name: string
  price: number
  category: 'apparel' | 'watch' | 'accessory'
  stock: number
  images: string[]
  description: string | null
  details: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface OrderRow {
  id: string
  stripe_session_id: string | null
  customer_email: string
  customer_name: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: number
  gift_wrap: boolean
  gift_message: string | null
  shipping_address: ShippingAddress | null
  created_at: string
}

// ============================================================
// PRODUCTS
// ============================================================

export async function getProducts(): Promise<ProductRow[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch products: ${error.message}`)
  return (data as ProductRow[]) ?? []
}

export async function getProduct(slug: string): Promise<ProductRow | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as ProductRow
}

export async function decrementStock(productId: string, qty: number): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { data: product } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .single()

  if (product) {
    const row = product as { stock: number }
    const newStock = Math.max(0, row.stock - qty)
    await supabase
      .from('products')
      .update({ stock: newStock, updated_at: new Date().toISOString() })
      .eq('id', productId)
  }
}

export async function getLowStockProducts(threshold = 3): Promise<ProductRow[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lt('stock', threshold)
    .order('stock', { ascending: true })

  if (error) return []
  return (data as ProductRow[]) ?? []
}

// ============================================================
// ORDERS
// ============================================================

interface CreateOrderData {
  stripe_session_id: string
  customer_email: string
  customer_name: string
  items: OrderItem[]
  total: number
  gift_wrap?: boolean
  gift_message?: string
  shipping_address?: ShippingAddress
}

export async function createOrder(data: CreateOrderData): Promise<OrderRow | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      stripe_session_id: data.stripe_session_id,
      customer_email: data.customer_email,
      customer_name: data.customer_name,
      items: data.items,
      total: data.total,
      gift_wrap: data.gift_wrap ?? false,
      gift_message: data.gift_message ?? null,
      shipping_address: data.shipping_address ?? null,
      status: 'paid',
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create order: ${error.message}`)
  return order as OrderRow
}

export async function getOrder(stripeSessionId: string): Promise<OrderRow | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('stripe_session_id', stripeSessionId)
    .single()

  if (error) return null
  return data as OrderRow
}

export async function getOrders(): Promise<OrderRow[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return (data as OrderRow[]) ?? []
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderRow['status'],
): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
}

export async function getOrderStats(): Promise<{
  totalOrders: number
  totalRevenue: number
  lowStockCount: number
}> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { totalOrders: 0, totalRevenue: 0, lowStockCount: 0 }
  }

  const [ordersResult, lowStockResult] = await Promise.all([
    supabase.from('orders').select('total'),
    supabase.from('products').select('id').lt('stock', 3),
  ])

  const orders = (ordersResult.data as Array<{ total: number }>) ?? []
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0)
  const lowStockCount = lowStockResult.data?.length ?? 0

  return { totalOrders, totalRevenue, lowStockCount }
}
