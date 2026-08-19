'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createOrder } from '@/actions/createOrder'
import { useCart } from '@/context/CartContext'

type PaymentMethod = 'COD' | 'GCash'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()

  const [customer_name, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [payment_method, setPaymentMethod] = useState<PaymentMethod>('COD')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="container checkout-empty">
        <h1 className="section-title">Your basket is empty</h1>
        <p className="muted">Add some products before heading to checkout.</p>
        <Link href="/" className="btn-add-modern">
          Back to Shop
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = await createOrder({
      customer_name,
      phone,
      email: email || undefined,
      address,
      payment_method,
      items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
    })

    setSubmitting(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    clearCart()
    router.push(`/order-success?id=${result.id}&method=${encodeURIComponent(payment_method)}`)
  }

  return (
    <div className="container checkout">
      <h1 className="section-title">Checkout</h1>
      <p className="muted">We&apos;ll confirm your order and arrange delivery or pickup from our cooperative hub.</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="checkout-form-title">Delivery Details</h2>

          <label className="field">
            <span className="field-label">Full Name *</span>
            <input
              className="field-input"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Juan Dela Cruz"
            />
          </label>

          <label className="field">
            <span className="field-label">Phone Number *</span>
            <input
              className="field-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="09xx xxx xxxx"
              inputMode="tel"
            />
          </label>

          <label className="field">
            <span className="field-label">Email (optional)</span>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span className="field-label">Delivery Address *</span>
            <textarea
              className="field-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              placeholder="House / street / barangay / municipality, Misamis Occidental"
            />
          </label>

          <fieldset className="field">
            <legend className="field-label">Payment Method</legend>
            <div className="payment-options">
              {(['COD', 'GCash'] as PaymentMethod[]).map((method) => (
                <label key={method} className="payment-option">
                  <input
                    type="radio"
                    name="payment_method"
                    value={method}
                    checked={payment_method === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {payment_method === 'GCash' && (
            <div className="payment-info-card payment-info-gcash">
              <h3 className="payment-info-title">💚 Pay via GCash</h3>
              <p className="payment-info-row">
                <span className="payment-info-label">Account Name</span>
                <span className="payment-info-value">OroqCoco Agriculture Cooperative</span>
              </p>
              <p className="payment-info-row">
                <span className="payment-info-label">Mobile Number</span>
                <span className="payment-info-value">0966 043 8027</span>
              </p>
              <p className="payment-info-note">
                Please take a screenshot of your transfer receipt and message it to our Facebook
                page or text 0966 043 8027 with your Order ID.
              </p>
            </div>
          )}

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn-add-modern btn-block" disabled={submitting}>
            {submitting ? 'Placing Order…' : `Place Order · ₱${subtotal.toFixed(2)}`}
          </button>
        </form>

        <aside className="order-summary">
          <h2 className="checkout-form-title">Order Summary</h2>
          <ul className="summary-items">
            {items.map((item) => (
              <li key={item.id} className="summary-item">
                <span className="summary-item-name">
                  {item.name} <span className="summary-qty">× {item.quantity}</span>
                </span>
                <span className="summary-item-price">₱{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <span>Subtotal</span>
            <span className="summary-total-amount">₱{subtotal.toFixed(2)}</span>
          </div>
          <p className="muted small">
            Payment of ₱{subtotal.toFixed(2)} may be settled on delivery (COD) or via GCash as
            selected above.
          </p>
        </aside>
      </div>
    </div>
  )
}
