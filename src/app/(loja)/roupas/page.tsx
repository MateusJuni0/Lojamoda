import type { Metadata } from 'next'
import { getProductsByCategory } from '@/data/products'
import PLPClient from '@/components/plp/PLPClient'

export const metadata: Metadata = {
  title: 'Roupas',
  description: 'Explore a nossa coleção de roupas premium. Camisas, blazers, casacos e muito mais.',
}

const filterOptions = [
  { label: 'Camisas', value: 'camisas' },
  { label: 'Blazers', value: 'blazers' },
  { label: 'Casacos', value: 'casacos' },
  { label: 'Calças', value: 'calcas' },
  { label: 'Vestidos', value: 'vestidos' },
  { label: 'Em Saldo', value: 'sale' },
  { label: 'Novidades', value: 'new' },
]

export default function RoupasPage() {
  const products = getProductsByCategory('roupas')

  return (
    <PLPClient
      products={products}
      title="Roupas"
      description="Do casual refinado ao formal impecável — tecidos que falam por si."
      filterOptions={filterOptions}
    />
  )
}
