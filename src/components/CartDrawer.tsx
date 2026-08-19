'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, subtotal, totalQuantity } =
    useCart()

  if (!isOpen) return null

  return (
    <div className="drawer-overlay" onClick={closeCart}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2 className="drawer-title">Your Basket ({totalQuantity})</h2>
          <button className="drawer-close" onClick={closeCart} aria-label="Close basket">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <p className="drawer-empty-title">Your basket is empty</p>
              <p className="drawer-empty-sub">Browse our organic selection to get started.</p>
              <button className="btn-add-modern" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="drawer-items">
              {items.map((item) => (
                <li key={item.id} className="drawer-item">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="drawer-item-img" />
                  ) : (
                    <img src="/logo.png" alt={item.name} className="drawer-item-img" />
                  )}
                  <div className="drawer-item-info">
                    <p className="drawer-item-name">{item.name}</p>
                    <p className="drawer-item-price">₱{(item.price * item.quantity).toFixed(2)}</p>
                    <div className="drawer-qty">
                      <button
                        className="qty-btn"
                        onClick={() => decrement(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increment(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="drawer-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from basket`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <span className="drawer-subtotal-amount">₱{subtotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn-add-modern btn-block" onClick={closeCart}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
