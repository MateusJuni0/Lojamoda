import { formatPrice } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data (will be replaced with Supabase queries)
// ---------------------------------------------------------------------------

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

interface MockOrder {
  id: string
  customer: string
  email: string
  total: number
  status: OrderStatus
  date: string
}

const mockOrders: MockOrder[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    customer: 'Maria Silva',
    email: 'maria@exemplo.pt',
    total: 249.9,
    status: 'paid',
    date: '2026-03-30',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    customer: 'Joao Santos',
    email: 'joao@exemplo.pt',
    total: 589.0,
    status: 'shipped',
    date: '2026-03-29',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    customer: 'Ana Ferreira',
    email: 'ana@exemplo.pt',
    total: 129.9,
    status: 'pending',
    date: '2026-03-31',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    customer: 'Pedro Costa',
    email: 'pedro@exemplo.pt',
    total: 1290.0,
    status: 'delivered',
    date: '2026-03-28',
  },
]

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800',
  },
  paid: {
    label: 'Pago',
    className: 'bg-green-100 text-green-800',
  },
  shipped: {
    label: 'Enviado',
    className: 'bg-blue-100 text-blue-800',
  },
  delivered: {
    label: 'Entregue',
    className: 'bg-gray-100 text-gray-800',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
  },
}

export default function EncomendasPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Encomendas
      </h1>

      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockOrders.map((order) => {
              const { label, className } = statusConfig[order.status]
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-500">
                    {order.id.slice(0, 8)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {order.customer}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    {order.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
                    >
                      {label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    {order.date}
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
