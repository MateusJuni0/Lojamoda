import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://noirelite.pt'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/roupas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/relogios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/acessorios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/produto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
