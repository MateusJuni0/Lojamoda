import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import EditorialBanner from '@/components/home/EditorialBanner'
import WatchesSection from '@/components/home/WatchesSection'
import AccessoriesSection from '@/components/home/AccessoriesSection'
import NewsletterCTA from '@/components/home/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Noir Élite — Moda de Luxo',
  description:
    'Descubra roupas, relógios e acessórios de luxo curados para quem exige o melhor. Nova coleção Primavera 2026.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <EditorialBanner />
      <WatchesSection />
      <AccessoriesSection />
      <NewsletterCTA />
    </>
  )
}
