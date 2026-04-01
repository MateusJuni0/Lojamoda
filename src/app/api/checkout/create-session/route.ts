import { NextResponse } from 'next/server'
import { requireStripe } from '@/lib/stripe-server'

interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  color?: string
  size?: string
}

interface CheckoutBody {
  items: CheckoutItem[]
  gift_wrap?: boolean
  gift_message?: string
  shipping_country?: string
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const stripe = requireStripe()
    const body = (await request.json()) as CheckoutBody
    const { items, gift_wrap, gift_message } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 },
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
          metadata: {
            product_id: item.id,
            color: item.color ?? '',
            size: item.size ?? '',
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      metadata: {
        gift_wrap: gift_wrap ? 'true' : 'false',
        gift_message: gift_message ?? '',
        items_json: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            name: i.name,
            qty: i.quantity,
            price: i.price,
            color: i.color,
            size: i.size,
          })),
        ),
      },
      shipping_address_collection: {
        allowed_countries: ['PT', 'ES', 'FR', 'DE', 'GB'],
      },
      success_url: `${appUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
    })

    return NextResponse.json({ success: true, data: { url: session.url } })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Checkout failed'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    )
  }
}
