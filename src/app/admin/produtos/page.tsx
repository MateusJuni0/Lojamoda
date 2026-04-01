import Link from 'next/link'
import { Plus } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice, getStockStatus } from '@/lib/utils'

const stockBadge: Record<
  ReturnType<typeof getStockStatus>,
  { label: string; className: string }
> = {
  ok: {
    label: 'OK',
    className: 'bg-green-100 text-green-800',
  },
  low: {
    label: 'Baixo',
    className: 'bg-yellow-100 text-yellow-800',
  },
  critical: {
    label: 'Critico',
    className: 'bg-red-100 text-red-800',
  },
  out: {
    label: 'Esgotado',
    className: 'bg-gray-100 text-gray-800',
  },
}

export default function ProdutosPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Preco</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const status = getStockStatus(product.stock)
              const { label, className } = stockBadge[status]

              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
                    >
                      {label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
