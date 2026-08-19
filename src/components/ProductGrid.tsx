'use client'

import { useMemo, useState } from 'react'
import AddToCartButton from '@/components/AddToCartButton'
import ProductImage from '@/components/ProductImage'

type Product = {
  id: number
  name: string
  slug: string
  price: number
  category: string
  description?: string | null
  stock?: number | null
  image_url?: string | null
}

const CATEGORIES = ['All', 'Virgin Coconut Oil', 'Food & Culinary', 'Cosmetics & Wellness']

export default function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return products
    return products.filter((p) => p.category === active)
  }, [products, active])

  return (
    <>
      <div className="filter-tabs" role="tablist" aria-label="Filter products by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`tab-btn${active === cat ? ' active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="filter-empty">
          <p>No products in this category yet.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((item) => (
            <div key={item.id} className="modern-product-card">
              <ProductImage src={item.image_url} alt={item.name} category={item.category} />
              <h3 className="product-info-title">{item.name}</h3>
              <p className="product-info-desc">{item.description}</p>
              <div className="card-bottom-action">
                <span className="price-currency">₱{item.price.toFixed(2)}</span>
                <AddToCartButton
                  id={String(item.id)}
                  name={item.name}
                  price={Number(item.price)}
                  image_url={item.image_url ?? undefined}
                  category={item.category}
                  stock={Number(item.stock)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
