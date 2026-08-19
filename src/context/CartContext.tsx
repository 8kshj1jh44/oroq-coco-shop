'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image_url?: string
  category?: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  totalQuantity: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'oroqcoco-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setItems(JSON.parse(raw) as CartItem[])
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch {
        // storage unavailable
      }
    }
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const increment = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)))
  }, [])

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const totalQuantity = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      increment,
      decrement,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      increment,
      decrement,
      clearCart,
      openCart,
      closeCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
