'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { slugify } from '@/lib/utils'

type Category = 'apparel' | 'watch' | 'accessory'

interface ProductForm {
  name: string
  slug: string
  price: string
  category: Category
  description: string
  stock: string
  imageUrls: string
}

const initialForm: ProductForm = {
  name: '',
  slug: '',
  price: '',
  category: 'apparel',
  description: '',
  stock: '',
  imageUrls: '',
}

const categoryLabels: Record<Category, string> = {
  apparel: 'Roupa',
  watch: 'Relogio',
  accessory: 'Acessorio',
}

export default function NovoProdutoPage() {
  const [form, setForm] = useState<ProductForm>(initialForm)

  function updateField<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'name') {
        next.slug = slugify(value as string)
      }
      return next
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const images = form.imageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean)

    const payload = {
      name: form.name,
      slug: form.slug,
      price: parseFloat(form.price),
      category: form.category,
      description: form.description,
      stock: parseInt(form.stock, 10),
      images,
    }

    // Temporary: will connect to Supabase
    alert(`Produto criado (mock):\n${JSON.stringify(payload, null, 2)}`)
  }

  const inputClass =
    'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/produtos"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Produtos
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Novo Produto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={inputClass}
            placeholder="Ex: Camisa Oxford Slim Fit"
          />
        </div>

        {/* Slug (auto-generated) */}
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            type="text"
            required
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            className={`${inputClass} bg-gray-50`}
            placeholder="auto-gerado a partir do nome"
          />
          <p className="mt-1 text-xs text-gray-400">
            Gerado automaticamente a partir do nome.
          </p>
        </div>

        {/* Price & Category row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className={labelClass}>
              Preco (EUR)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              required
              value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>
              Categoria
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) =>
                updateField('category', e.target.value as Category)
              }
              className={inputClass}
            >
              {(Object.keys(categoryLabels) as Category[]).map((key) => (
                <option key={key} value={key}>
                  {categoryLabels[key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Descricao
          </label>
          <textarea
            id="description"
            rows={4}
            required
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className={inputClass}
            placeholder="Descricao detalhada do produto..."
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className={labelClass}>
            Stock
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={(e) => updateField('stock', e.target.value)}
            className={inputClass}
            placeholder="0"
          />
        </div>

        {/* Image URLs */}
        <div>
          <label htmlFor="imageUrls" className={labelClass}>
            URLs das Imagens
          </label>
          <textarea
            id="imageUrls"
            rows={3}
            value={form.imageUrls}
            onChange={(e) => updateField('imageUrls', e.target.value)}
            className={inputClass}
            placeholder={'https://exemplo.com/imagem1.jpg\nhttps://exemplo.com/imagem2.jpg'}
          />
          <p className="mt-1 text-xs text-gray-400">
            Uma URL por linha.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Criar Produto
          </button>
        </div>
      </form>
    </>
  )
}
