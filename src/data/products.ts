import type { Product } from '../types/product'

const img = (photoId: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

/** Pre-launch: five-piece Roots Remain drop only */
export const products: Product[] = [
  {
    id: 'p1',
    slug: 'california-pune-hoodie',
    name: 'CALIFORNIA → PUNE Hoodie',
    subtitle: 'Heavy fleece · twin skylines',
    price: 68,
    compareAtPrice: 78,
    category: 'hoodies',
    shopTags: ['hoodies', 'best-sellers'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'CALIFORNIA → PUNE',
    description:
      'West-coast light, Pune roots — heavyweight graphic hoodie in the Elsewhere voice.',
    taglines: [
      'Vintage collegiate typography meets diaspora identity.',
      'Wear the route you carry between two homes.',
    ],
    image: img('photo-1576566588028-4147f3842f27'),
    gallery: [
      img('photo-1576566588028-4147f3842f27'),
      img('photo-1556821840-3a63f95609a7'),
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. 400gsm.',
    fit: 'Relaxed drop shoulder. True to size; size up for an oversized look.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold inside out. Lay flat to dry.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'first_drop',
  },
  {
    id: 'p2',
    slug: 'nyc-mumbai-hoodie',
    name: 'NYC → MUMBAI Hoodie',
    subtitle: 'Two skylines, one thread',
    price: 68,
    category: 'hoodies',
    shopTags: ['hoodies', 'best-sellers'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'NYC → MUMBAI',
    description:
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    taglines: [
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    ],
    image: img('photo-1556821840-3a63f95609a7'),
    gallery: [
      img('photo-1556821840-3a63f95609a7'),
      img('photo-1576566588028-4147f3842f27'),
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. 400gsm.',
    fit: 'Relaxed drop shoulder. True to size.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold inside out. Lay flat to dry.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'first_drop',
  },
  {
    id: 'p3',
    slug: 'miami-goa-tee',
    name: 'MIAMI → GOA Tee',
    subtitle: 'Coastal drift, cotton-soft',
    price: 42,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'MIAMI → GOA',
    description: 'A relaxed graphic tee inspired by coastal nostalgia.',
    taglines: ['A relaxed graphic tee inspired by coastal nostalgia.'],
    image: img('photo-1521572163474-6864f9cf17ab'),
    gallery: [img('photo-1521572163474-6864f9cf17ab')],
    colors: [
      { id: 'white', label: 'White', hex: '#f7f7f5' },
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '220gsm combed cotton. Pre-shrunk.',
    fit: 'Classic tee block with a slightly boxy drape.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold. Do not iron print.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'new',
  },
  {
    id: 'p4',
    slug: 'brooklyn-thane-tee',
    name: 'BROOKLYN → THANE Tee',
    subtitle: 'Bridge lines, two boroughs',
    price: 42,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'BROOKLYN → THANE',
    description:
      'Graphic tee for the in-between — quiet type, loud roots.',
    taglines: ['Graphic tee for the in-between — quiet type, loud roots.'],
    image: img('photo-1618354691373-d851c5c3a990'),
    gallery: [img('photo-1618354691373-d851c5c3a990')],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'white', label: 'White', hex: '#f7f7f5' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '220gsm combed cotton. Pre-shrunk.',
    fit: 'Classic tee block with a slightly boxy drape.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold. Do not iron print.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'first_drop',
  },
  {
    id: 'p5',
    slug: 'boston-bangalore-tee',
    name: 'BOSTON → BANGALORE Tee',
    subtitle: 'Winter light, monsoon memory',
    price: 42,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'BOSTON → BANGALORE',
    description:
      'East-coast grit meets garden-city calm — same Elsewhere graphic language.',
    taglines: ['East-coast grit meets garden-city calm.'],
    image: img('photo-1620799140408-ed5341f2e09e'),
    gallery: [img('photo-1620799140408-ed5341f2e09e')],
    colors: [
      { id: 'navy', label: 'Navy', hex: '#1e2a38' },
      { id: 'white', label: 'White', hex: '#f7f7f5' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '220gsm combed cotton. Pre-shrunk.',
    fit: 'Classic tee block with a slightly boxy drape.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold. Do not iron print.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'first_drop',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFirstDropProducts(): Product[] {
  return [...products].sort((a, b) => {
    const rank = (c: Product['category']) => (c === 'hoodies' ? 0 : 1)
    const d = rank(a.category) - rank(b.category)
    if (d !== 0) return d
    return a.name.localeCompare(b.name)
  })
}
