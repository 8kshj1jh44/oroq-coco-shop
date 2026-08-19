import Link from 'next/link'

type PaymentMethod = 'COD' | 'GCash'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; method?: string }>
}) {
  const { id, method } = await searchParams
  const orderId = id ?? 'your order'
  const payment = (method ?? 'COD') as PaymentMethod

  return (
    <div className="container order-success">
      <div className="success-card">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h1 className="section-title">Order Confirmed!</h1>
        <p className="muted">
          Thank you for your order with <strong>OroqCoco</strong> — Oroquieta City Agricultural
          Cooperative (OCAC).
        </p>
        <p className="muted">
          Your order <strong>#{orderId}</strong> has been received and is now{' '}
          <strong>pending</strong>. Our team will contact you shortly to confirm delivery or pickup.
        </p>

        {payment === 'GCash' && (
          <div className="payment-info-card payment-info-gcash success-payment">
            <h3 className="payment-info-title">💚 Complete your GCash Payment</h3>
            <p className="payment-info-row">
              <span className="payment-info-label">Account Name</span>
              <span className="payment-info-value">OroqCoco Agriculture Cooperative</span>
            </p>
            <p className="payment-info-row">
              <span className="payment-info-label">Mobile Number</span>
              <span className="payment-info-value">0966 043 8027</span>
            </p>
            <p className="payment-info-row">
              <span className="payment-info-label">Reference Code</span>
              <span className="payment-info-value payment-ref">#{orderId}</span>
            </p>
            <p className="payment-info-note">
              Please take a screenshot of your transfer receipt and message it to our Facebook page
              or text 0966 043 8027 with your Order ID (#{orderId}).
            </p>
          </div>
        )}

        {payment === 'COD' && (
          <p className="muted small">
            Payment will be settled on delivery (COD). Our team will contact you to confirm.
          </p>
        )}

        <p className="muted small">
          For questions, reach us at 0966 043 8027 / 0946 267 2903, or visit our cooperative hub at
          Deloso st. P-2, Loboc Upper, Oroquieta City, Mis. Occ.
        </p>
        <Link href="/" className="btn-add-modern btn-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
