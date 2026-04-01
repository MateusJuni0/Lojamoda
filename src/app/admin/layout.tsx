'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Store,
  LogOut,
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: typeof LayoutDashboard
  exact?: boolean
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/produtos', label: 'Produtos', icon: Box },
  { href: '/admin/encomendas', label: 'Encomendas', icon: ClipboardList },
  { href: '/', label: 'Voltar à Loja', icon: Store },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <div className="font-sans">{children}</div>
  }

  return (
    <div className="font-sans flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-lg font-semibold tracking-tight text-gray-900">
            Noir Élite Admin
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href) && href !== '/'
            const isExternal = href === '/'

            return (
              <Link
                key={href}
                href={href}
                target={isExternal ? '_blank' : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            type="button"
            onClick={() => {
              document.cookie =
                'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
              window.location.href = '/admin/login'
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
