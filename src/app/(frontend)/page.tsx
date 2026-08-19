import { getPayload } from 'payload'
import config from '@payload-config'
import CartButton from '@/components/CartButton'
import ProductGrid from '@/components/ProductGrid'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 100,
    where: {
      status: { equals: 'published' },
    },
  })

  return (
    <div>
      {/* Top Header */}
      <div className="header-container">
        <header className="site-header">
          <a href="/" className="brand-wrapper">
            <img src="/logo.png" alt="OroqCoco logo" className="brand-logo-img" />
            <div>
              <span className="brand-name">
                Oroq<span>Coco</span>
              </span>
              <span className="brand-tagline">Oroquieta City Agricultural Cooperative</span>
            </div>
          </a>
          <div className="nav-right">
            <a href="/admin" className="nav-admin-link">
              Admin Portal
            </a>
            <CartButton />
          </div>
        </header>
      </div>

      {/* Hero Banner */}
      <section className="hero-wrapper">
        <div className="hero-box">
          <span className="hero-badge">🌿 Farm-Fresh · Vegan · Non-GMO</span>
          <h1 className="hero-title">
            All Natural Coconut Products, <span>Straight from Oroquieta Farmers</span>
          </h1>
          <p className="hero-desc">
            Proudly handcrafted by local coconut farmers and the women of rural barangays in
            Oroquieta City, Misamis Occidental.
          </p>
          <div className="hero-tags">
            <span className="tag-chip">100% Pure Coconut</span>
            <span className="tag-chip">Organic & Sustainable</span>
            <span className="tag-chip">Empowering Rural Farmers</span>
            <span className="tag-chip">OCAC Certified</span>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <main className="container">
        <div className="section-header">
          <h2 className="section-headline">Our Organic Selection</h2>
          <p className="section-subtext">
            Direct from our cooperative processing facility in Purok 2, Oroquieta City
          </p>
        </div>

        {products.length === 0 ? (
          <div className="filter-empty">
            <h3>No products listed yet</h3>
            <p style={{ marginTop: '0.5rem' }}>
              Head into the <a href="/admin" className="nav-admin-link">Admin Panel</a> to add your
              first published products.
            </p>
          </div>
        ) : (
          <>
            <ProductGrid products={products} />
          </>
        )}

        {/* Customer Reviews & Testimonials */}
        <section className="reviews-section">
          <h2 className="section-headline">What Our Community Says</h2>
          <p className="section-subtext" style={{ marginBottom: '2.5rem' }}>
            Verified feedback from valued customers and advocates of local produce
          </p>

          <div className="reviews-grid">
            <article className="review-card">
              <div className="review-stars">⭐⭐⭐⭐⭐</div>
              <p className="review-quote">
                &ldquo;Their Coco liquid seasoning was good!&rdquo;
              </p>
              <footer>
                <span className="review-author">Gunārs Lapiņš</span>
                <span className="review-date"> · December 4, 2023</span>
              </footer>
            </article>

            <article className="review-card">
              <div className="review-stars">⭐⭐⭐⭐⭐</div>
              <p className="review-quote">
                &ldquo;Amid this pandemic that we, the people of Oroquieta, are currently
                experiencing, today is the most opportune time to start patronizing our own local
                produce! Help boost our local economy! Patronize our very own products!&rdquo;
              </p>
              <footer>
                <span className="review-author">Rona Morala Campil</span>
                <span className="review-date"> · April 1, 2020</span>
              </footer>
            </article>
          </div>
        </section>

        {/* Reseller Directory & Cooperative Contact Info */}
        <section className="directory-card">
          <h2 className="section-headline">Official Physical Resellers & Cooperative Hub</h2>
          <p className="section-subtext">
            You can purchase directly at our central cooperative office or visit verified partner
            retail outlets:
          </p>

          <div className="directory-grid">
            <div className="directory-box">
              <h4>🏪 Oroquieta City Outlets</h4>
              <ul>
                <li>CP Pharma</li>
                <li>Skin911 Oroquieta</li>
                <li>NsPasalubong Minimart</li>
                <li>FARMACIA JESSICA</li>
                <li>Payling's Restaurant</li>
                <li>MOELCI</li>
                <li>MTJ COFFEE SHOP (Brgy Lamac)</li>
                <li>SHELL Station (Talairon Highway)</li>
              </ul>
            </div>

            <div className="directory-box">
              <h4>🏙️ Jimenez & Tangub City</h4>
              <ul>
                <li>
                  <strong>Jimenez:</strong> J-Mart SuperMarket
                </li>
                <li>
                  <strong>Tangub:</strong> LIKEfoodhouse (0917 108 0720)
                </li>
                <li>
                  <strong>Tangub:</strong> Asenso Global Gardens
                </li>
              </ul>
            </div>

            <div className="directory-box">
              <h4>🏢 Central Office & Inquiries</h4>
              <p className="directory-address">
                Behind Poligrates, Deloso street, Purok 2, Oroquieta City, Misamis Occidental
              </p>
              <p className="directory-pluscode">Plus Code: FRR2+M3</p>
              <a
                className="maps-link"
                href="https://www.google.com/maps/search/?api=1&query=Behind%20Poligrates%2C%20Deloso%20street%2C%20Purok%202%2C%20Oroquieta%20City%2C%20Misamis%20Occidental"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Get Directions
              </a>
              <p className="directory-phone">📞 0966 043 8027 / 0946 267 2903</p>
              <p className="directory-cta">
                Interested in earning as an OroqCoco reseller? Contact us!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div>
            <img src="/logo.png" alt="OroqCoco logo" className="footer-logo" />
            <p className="footer-text">
              OroqCoco — Oroquieta City Agricultural Cooperative (OCAC).
            </p>
          </div>
          <div>
            <h4 className="footer-title">Visit Us</h4>
            <p className="footer-text">Deloso st. P-2, Loboc Upper, Oroquieta City, Mis. Occ</p>
            <p className="footer-text">
              🌐 Globe Hotline:{' '}
              <a href="tel:+639660438027" className="footer-link">
                +63 966 043 8027
              </a>
            </p>
          </div>
          <div>
            <h4 className="footer-title">Accreditations</h4>
            <p className="footer-text">DTI Registered</p>
            <p className="footer-text">FDA Approved</p>
            <p className="footer-text">PROUT</p>
          </div>
        </div>
        <p className="footer-bottom">© 2026 OroqCoco - Oroquieta City Agricultural Cooperative (OCAC). All rights reserved.</p>
      </footer>

      {/* Sticky Chat / Call */}
      <div className="float-actions">
        <a
          className="float-btn float-call"
          href="tel:+639660438027"
          aria-label="Call OroqCoco at 0966 043 8027"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
        <a
          className="float-btn float-chat"
          href="https://www.facebook.com/OroqCoco"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with OroqCoco Cooperative on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
