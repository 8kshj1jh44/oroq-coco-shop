'use client'

import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { totalQuantity, openCart } = useCart()

  return (
    <button className="cart-pill-btn" onClick={openCart} aria-label={`Open basket, ${totalQuantity} items`}>
      <span>🛒 Basket</span>
      {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
    </button>
  )
}
