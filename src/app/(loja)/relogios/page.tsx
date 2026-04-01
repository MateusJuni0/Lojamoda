import type { Metadata } from 'next'
import { getProductsByCategory } from '@/data/products'
import PLPClient from '@/components/plp/PLPClient'

export const metadata: Metadata = {
  title: 'Relógios',
  description: 'Alta relojoaria curada. Cronógrafos, dress watches, mergulhadores e muito mais.',
}

const filterOptions = [
  { label: 'Cronógrafo', value: 'cronografo' },
  { label: 'Dress Watch', value: 'dress-watch' },
  { label: 'Sport / Mergulho', value: 'sport' },
  { label: 'Pilot', value: 'pilot' },
  { label: 'Skeleton', value: 'skeleton' },
  { label: 'GMT', value: 'gmt' },
  { label: 'Edição Limitada', value: 'limited' },
]

export default function RelogiosPage() {
  const products = getProductsByCategory('relogios')

  return (
    <PLPClient
      products={products}
      title="Relógios"
      description="Mecanismos que transcendem o tempo. Cada peça, uma obra de engenharia e arte."
      filterOptions={filterOptions}
    />
  )
}
