import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import CartDrawer from '@/components/layout/CartDrawer/CartDrawer'
import { ToastContainer } from '@/components/ui/Toast'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://noirelite.pt'),
  title: {
    default: 'Noir Élite — Moda de Luxo',
    template: '%s | Noir Élite',
  },
  description:
    'Descubra roupas, relógios e acessórios de luxo curados para quem exige o melhor. Noir Élite — onde o estilo encontra a excelência.',
  keywords: ['moda luxo', 'roupas premium', 'relógios de luxo', 'acessórios', 'moda portuguesa'],
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://noirelite.pt',
    siteName: 'Noir Élite',
    title: 'Noir Élite — Moda de Luxo',
    description: 'Roupas, relógios e acessórios de luxo curados com rigor.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Noir Élite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noir Élite — Moda de Luxo',
    description: 'Roupas, relógios e acessórios de luxo curados com rigor.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F5F5F0] font-sans antialiased">
        <Header />
        <CartDrawer />
        <ToastContainer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
