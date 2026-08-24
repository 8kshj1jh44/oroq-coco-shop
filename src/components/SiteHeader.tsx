'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function SiteHeader() {
  const [hidden, setHidden] = useState(false)
  const { totalQuantity, openCart } = useCart()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`header-container${hidden ? ' header-hidden' : ''}`}>
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
        <button className="header-cart" onClick={openCart} aria-label={`Open basket, ${totalQuantity} items`}>
          <span className="header-cart-icon">🛒</span>
          {totalQuantity > 0 && <span className="header-cart-count">{totalQuantity}</span>}
        </button>
      </header>
    </div>
  )
}