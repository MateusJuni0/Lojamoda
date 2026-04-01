import Stripe from 'stripe'

function createStripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key === 'sk_test_placeholder') {
    return null
  }
  return new Stripe(key)
}

let stripeInstance: Stripe | null | undefined

export function getStripeServer(): Stripe | null {
  if (stripeInstance === undefined) {
    stripeInstance = createStripeClient()
  }
  return stripeInstance
}

export function requireStripe(): Stripe {
  const stripe = getStripeServer()
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local')
  }
  return stripe
}
