'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

type AddToCartButtonProps = {
  id: string
  name: string
  price: number
  image_url?: string
  category?: string
  stock?: number
}

export default function AddToCartButton({
  id,
  name,
  price,
  image_url,
  category,
  stock,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)

  const outOfStock = typeof stock === 'number' && stock <= 0

  function handleAdd() {
    addItem({ id, name, price, image_url, category })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
    openCart()
  }

  if (outOfStock) {
    return (
      <button className="btn-add-modern btn-disabled" disabled>
        Out of Stock
      </button>
    )
  }

  return (
    <button className="btn-add-modern" onClick={handleAdd}>
      {added ? 'Added ✓' : 'Add to Cart'}
    </button>
  )
}
