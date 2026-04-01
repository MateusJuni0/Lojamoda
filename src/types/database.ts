export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
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
        Insert: {
          id?: string
          slug: string
          name: string
          price: number
          category: 'apparel' | 'watch' | 'accessory'
          stock?: number
          images?: string[]
          description?: string | null
          details?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          price?: number
          category?: 'apparel' | 'watch' | 'accessory'
          stock?: number
          images?: string[]
          description?: string | null
          details?: Record<string, unknown>
          updated_at?: string
        }
      }
      orders: {
        Row: {
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
        Insert: {
          id?: string
          stripe_session_id?: string | null
          customer_email: string
          customer_name: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          items: OrderItem[]
          total: number
          gift_wrap?: boolean
          gift_message?: string | null
          shipping_address?: ShippingAddress | null
          created_at?: string
        }
        Update: {
          stripe_session_id?: string | null
          customer_email?: string
          customer_name?: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          items?: OrderItem[]
          total?: number
          gift_wrap?: boolean
          gift_message?: string | null
          shipping_address?: ShippingAddress | null
        }
      }
      stock_reservations: {
        Row: {
          id: string
          product_id: string
          quantity: number
          session_id: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          quantity: number
          session_id: string
          expires_at: string
          created_at?: string
        }
        Update: {
          quantity?: number
          expires_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_slug: string
  quantity: number
  price: number
  color?: string
  size?: string
  image?: string
}

export interface ShippingAddress {
  name: string
  line1: string
  city: string
  postal_code: string
  country: string
  phone?: string
}
