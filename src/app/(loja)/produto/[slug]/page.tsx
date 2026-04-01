import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, products } from '@/data/products'
import LayoutCasual from '@/components/product/LayoutCasual'
import LayoutLuxury from '@/components/product/LayoutLuxury'
import ProductGrid from '@/components/product/ProductGrid'
import { type WatchProduct, type ApparelProduct, type AccessoryProduct } from '@/types/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Produto não encontrado' }
  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: product.images[0] ?? '', alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product, 4)

  // — O Diretor —
  // WATCH → LayoutLuxury (immersive, parallax, specs table)
  // APPAREL → LayoutCasual (size selector, accordion)
  // ACCESSORY premium tier → LayoutLuxury, otherwise LayoutCasual
  const useLuxury =
    product.type === 'WATCH' ||
    (product.type === 'ACCESSORY' && product.tier === 'premium')

  return (
    <>
      {useLuxury ? (
        <LayoutLuxury product={product as WatchProduct} />
      ) : (
        <LayoutCasual product={product as ApparelProduct | AccessoryProduct} />
      )}

      {related.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F5F5F0] mb-10">
            Também pode gostar
          </h2>
          <ProductGrid products={related} columns={4} />
        </section>
      )}
    </>
  )
}
