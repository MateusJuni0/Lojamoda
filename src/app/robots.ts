import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/conta', '/carrinho'],
      },
    ],
    sitemap: 'https://noirelite.pt/sitemap.xml',
  }
}
