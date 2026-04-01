import type { Metadata } from 'next'
import { getProductsByCategory } from '@/data/products'
import PLPClient from '@/components/plp/PLPClient'

export const metadata: Metadata = {
  title: 'Acessórios',
  description: 'Colares, pulseiras, anéis e cintos de luxo. O toque final para qualquer look.',
}

const filterOptions = [
  { label: 'Colares', value: 'colares' },
  { label: 'Pulseiras', value: 'pulseiras' },
  { label: 'Anéis', value: 'aneis' },
  { label: 'Brincos', value: 'brincos' },
  { label: 'Cintos', value: 'cintos' },
  { label: 'Ouro', value: 'ouro' },
  { label: 'Prata', value: 'prata' },
]

export default function AcessoriosPage() {
  const products = getProductsByCategory('acessorios')

  return (
    <div className="theme-editorial bg-[var(--background)]">
      <PLPClient
        products={products}
        title="Acessórios"
        description="O detalhe que define. Peças que elevam qualquer conjunto a obra de arte."
        filterOptions={filterOptions}
      />
    </div>
  )
}
