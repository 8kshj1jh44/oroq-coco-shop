import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

type ProductSeed = {
  name: string
  slug: string
  price: number
  category:
    | 'Virgin Coconut Oil'
    | 'Coconut Sugar'
    | 'Cosmetics & Wellness'
    | 'Food & Culinary'
    | 'Gift Sets'
  stock: number
  description: string
  image_url: string
}

const products: ProductSeed[] = [
  {
    name: 'Virgin Coconut Oil (150ml)',
    slug: 'vco-150ml',
    price: 140,
    category: 'Virgin Coconut Oil',
    stock: 50,
    description: '100% Pure, cold-pressed raw virgin coconut oil.',
    image_url: '/products/vco-150ml.jpg',
  },
  {
    name: 'Virgin Coconut Oil (250ml)',
    slug: 'vco-250ml',
    price: 195,
    category: 'Virgin Coconut Oil',
    stock: 50,
    description: '100% Pure, cold-pressed raw virgin coconut oil.',
    image_url: '/products/vco-250ml.jpg',
  },
  {
    name: 'Spicy Coconut Vinegar (250ml)',
    slug: 'spicy-coconut-vinegar-250ml',
    price: 55,
    category: 'Food & Culinary',
    stock: 50,
    description: 'Naturally fermented coconut sap vinegar infused with local spices.',
    image_url: '/products/spicy-coconut-vinegar-250ml.jpg',
  },
  {
    name: 'Magnesium Therapy Oil (100ml)',
    slug: 'magnesium-therapy-oil-100ml',
    price: 160,
    category: 'Cosmetics & Wellness',
    stock: 35,
    description: 'Therapeutic mineral oil for body aches and relaxation.',
    image_url: '/products/magnesium-therapy-oil-100ml.jpg',
  },
  {
    name: 'Magnesium Spray (100ml)',
    slug: 'magnesium-spray-100ml',
    price: 299,
    category: 'Cosmetics & Wellness',
    stock: 35,
    description: 'Fast-absorbing topical magnesium mist for daily wellness.',
    image_url: '/products/magnesium-spray-100ml.jpg',
  },
  {
    name: 'Liquid Seasoning (150ml)',
    slug: 'liquid-seasoning-150ml',
    price: 135,
    category: 'Food & Culinary',
    stock: 40,
    description: 'All-natural, soy-free savory coconut seasoning.',
    image_url: '/products/liquid-seasoning-150ml.jpg',
  },
  {
    name: 'Coconut Aminos (330ml)',
    slug: 'coconut-aminos-330ml',
    price: 85,
    category: 'Food & Culinary',
    stock: 40,
    description: 'Healthy, low-glycemic, vegan alternative to soy sauce.',
    image_url: '/products/coconut-aminos-330ml.jpg',
  },
  {
    name: 'Mg Therapy Cream (60g)',
    slug: 'mg-therapy-cream-60g',
    price: 199,
    category: 'Cosmetics & Wellness',
    stock: 30,
    description: 'Infused soothing topical cream for joint and muscle relief.',
    image_url: '/products/mg-therapy-cream-60g.jpg',
  },
  {
    name: 'Super Uling (1kg Pack)',
    slug: 'super-uling-1kg',
    price: 40,
    category: 'Food & Culinary',
    stock: 100,
    description: 'Eco-friendly coconut shell charcoal briquettes (1kg pack).',
    image_url: '/products/super-uling-1kg.jpg',
  },
  {
    name: 'Super Uling (30kg Sack)',
    slug: 'super-uling-30kg',
    price: 1000,
    category: 'Food & Culinary',
    stock: 20,
    description: 'Commercial-grade eco-friendly coconut shell charcoal (30kg sack).',
    image_url: '/products/super-uling-30kg.jpg',
  },
  {
    name: 'Balsamic Vinegar (250ml)',
    slug: 'balsamic-vinegar-250ml',
    price: 130,
    category: 'Food & Culinary',
    stock: 40,
    description: 'Rich, dark artisanal vinegar crafted from pure coconut sap.',
    image_url: '/products/balsamic-vinegar-250ml.jpg',
  },
]

async function run() {
  const payload = await getPayload({ config })

  let created = 0
  let updated = 0

  for (const product of products) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: product.slug } },
      limit: 1,
    })

    const data = {
      ...product,
      status: 'published' as const,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data,
      })
      updated += 1
    } else {
      await payload.create({
        collection: 'products',
        data,
      })
      created += 1
    }
  }

  const { docs, totalDocs } = await payload.find({
    collection: 'products',
    limit: 100,
    where: { status: { equals: 'published' } },
  })

  console.log(
    `Seed complete: ${created} created, ${updated} updated. ${totalDocs} published product(s) now in the catalog.`,
  )
  console.log(
    docs.map((p) => `- ${p.name} (₱${Number(p.price).toFixed(2)})`).join('\n'),
  )

  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
