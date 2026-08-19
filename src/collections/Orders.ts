import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer_name', 'phone', 'total_amount', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
  },
  fields: [
    { name: 'customer_name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'textarea', required: true },
    {
      name: 'payment_method',
      type: 'select',
      options: ['COD', 'GCash'],
      defaultValue: 'COD',
    },
    { name: 'total_amount', type: 'number', required: true },
    { name: 'items', type: 'json', required: true },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
      defaultValue: 'pending',
    },
  ],
}