'use client'

import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { totalQuantity, openCart } = useCart()

  return (
    <button className="cart-fab" onClick={openCart} aria-label={`Open basket, ${totalQuantity} items`}>
      <span className="cart-fab-icon">🛒</span>
      {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
    </button>
  )
}