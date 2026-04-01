import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { createOrder, decrementStock } from '@/lib/db'
import { sendOrderConfirmation } from '@/lib/email'
import type { OrderItem } from '@/types/database'

export async function POST(request: Request): Promise<NextResponse> {
  const stripe = getStripeServer()
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret || webhookSecret === 'whsec_placeholder') {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const metadata = session.metadata ?? {}

      // Parse items from metadata
      let items: OrderItem[] = []
      try {
        const parsed = JSON.parse(metadata.items_json ?? '[]') as Array<{
          id: string
          name: string
          qty: number
          price: number
          color?: string
          size?: string
        }>
        items = parsed.map((i) => ({
          product_id: i.id,
          product_name: i.name,
          product_slug: '',
          quantity: i.qty,
          price: i.price,
          color: i.color,
          size: i.size,
        }))
      } catch {
        // ignore parse error
      }

      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? 'unknown@email.com'
      const customerName = session.customer_details?.name ?? 'Cliente'

      const sessionAny = session as unknown as Record<string, unknown>
      const shippingDetails = sessionAny.shipping_details as {
        name?: string
        address?: { line1?: string; city?: string; postal_code?: string; country?: string }
      } | null
      const shippingAddress = shippingDetails?.address
        ? {
            name: shippingDetails.name ?? customerName,
            line1: shippingDetails.address.line1 ?? '',
            city: shippingDetails.address.city ?? '',
            postal_code: shippingDetails.address.postal_code ?? '',
            country: shippingDetails.address.country ?? '',
          }
        : undefined

      // Create order in Supabase
      const order = await createOrder({
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        items,
        total: (session.amount_total ?? 0) / 100,
        gift_wrap: metadata.gift_wrap === 'true',
        gift_message: metadata.gift_message || undefined,
        shipping_address: shippingAddress,
      })

      // Decrement stock
      for (const item of items) {
        await decrementStock(item.product_id, item.quantity)
      }

      // Send confirmation email
      if (order) {
        await sendOrderConfirmation({
          customer_email: customerEmail,
          customer_name: customerName,
          order_id: order.id,
          items,
          total: (session.amount_total ?? 0) / 100,
          shipping_address: shippingAddress,
        })
      }

      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      const errorMessage =
        paymentIntent.last_payment_error?.message ?? 'Unknown payment error'
      // Log is intentional for webhook debugging in server logs
      console.error(`[Stripe] Payment failed for ${paymentIntent.id}: ${errorMessage}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
