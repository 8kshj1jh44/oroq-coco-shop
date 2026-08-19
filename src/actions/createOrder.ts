'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type OrderInputItem = {
  id: string
  quantity: number
}

export type CreateOrderInput = {
  customer_name: string
  phone: string
  email?: string
  address: string
  payment_method: 'COD' | 'GCash'
  items: OrderInputItem[]
}

export type CreateOrderResult =
  | { success: true; id: string; total: number }
  | { success: false; error: string }

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { customer_name, phone, email, address, payment_method, items } = input

  if (!customer_name?.trim() || !phone?.trim() || !address?.trim()) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { success: false, error: 'Your basket is empty.' }
  }

  const payload = await getPayload({ config })

  const resolved: { id: string; name: string; price: number; quantity: number }[] = []
  let total = 0

  for (const line of items) {
    const qty = Number.isFinite(line.quantity) && line.quantity > 0 ? Math.floor(line.quantity) : 0
    if (qty === 0) continue

    try {
      const product = await payload.findByID({ collection: 'products', id: line.id })
      if (!product || product.status !== 'published') {
        return { success: false, error: 'One of the items in your basket is no longer available.' }
      }
      const price = Number(product.price)
      if (Number.isNaN(price) || price < 0) {
        return { success: false, error: 'Invalid product pricing.' }
      }
      resolved.push({ id: String(product.id), name: product.name, price, quantity: qty })
      total += price * qty
    } catch {
      return { success: false, error: 'One of the items in your basket could not be found.' }
    }
  }

  if (resolved.length === 0) {
    return { success: false, error: 'Your basket contains no valid items.' }
  }

  const doc = await payload.create({
    collection: 'orders',
    data: {
      customer_name,
      phone,
      email,
      address,
      payment_method,
      total_amount: total,
      items: resolved,
      status: 'pending',
    },
  })

  return { success: true, id: String(doc.id), total }
}
