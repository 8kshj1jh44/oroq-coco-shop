import './globals.css'
import React from 'react'
import StorefrontProviders from '@/components/StorefrontProviders'

export const metadata = {
  title: 'OroqCoco - Authentic Organic Coconut Products',
  description: 'Pure, vegan, non-GMO coconut products from Oroquieta City Agricultural Cooperative (OCAC)',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StorefrontProviders>{children}</StorefrontProviders>
      </body>
    </html>
  )
}