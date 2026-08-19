'use client'

import { useState } from 'react'

export default function ProductImage({
  src,
  alt,
  category,
}: {
  src?: string | null
  alt: string
  category?: string
}) {
  const [failed, setFailed] = useState(false)
  const hasSrc = Boolean(src)
  const showFallback = !hasSrc || failed
  const source = showFallback ? '/logo.png' : (src as string)

  return (
    <div className="card-img-stage">
      {category && <span className="category-pill">{category}</span>}
      <img
        src={source}
        alt={alt}
        style={{
          objectFit: 'contain',
          padding: showFallback ? '1.25rem' : '0',
        }}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
