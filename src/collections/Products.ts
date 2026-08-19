import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'stock', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'stock', type: 'number', defaultValue: 20 },
    {
      name: 'category',
      type: 'select',
      options: ['Virgin Coconut Oil', 'Coconut Sugar', 'Cosmetics & Wellness', 'Food & Culinary', 'Gift Sets'],
      required: true,
    },
    { name: 'description', type: 'textarea' },
    { name: 'benefits', type: 'text', hasMany: true },
    { name: 'image_url', type: 'text' },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'published',
    },
  ],
}