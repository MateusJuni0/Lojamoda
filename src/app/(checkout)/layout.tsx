import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Noir Élite',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
