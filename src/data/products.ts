import type { Product } from '../types/product'

const img = (photoId: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'nyc-thane-hoodie',
    name: 'NYC → THANE Hoodie',
    subtitle: 'Heavyweight fleece · city crossover',
    price: 68,
    category: 'hoodies',
    rootsLabel: 'Brooklyn → THANE',
    description:
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    taglines: [
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
      'Vintage collegiate typography meets diaspora identity.',
    ],
    image: '/products/nyc-thane-hoodie.png',
    gallery: ['/products/nyc-thane-hoodie.png'],
    colors: [
      { id: 'heather', label: 'Heather gray', hex: '#9a9a9a' },
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. 400gsm.',
    fit: 'Relaxed drop shoulder. True to size; size up for an oversized look.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Machine wash cold inside out. Lay flat to dry.',
    isNewDrop: true,
  },
  {
    id: 'p2',
    slug: 'nyc-mumbai-hoodie',
    name: 'NYC → MUMBAI Hoodie',
    subtitle: 'Two skylines, one thread',
    price: 68,
    category: 'hoodies',
    rootsLabel: 'NYC → MUMBAI',
    description:
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    taglines: [
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    ],
    image: img('photo-1576566588028-4147f3842f27'),
    gallery: [
      img('photo-1576566588028-4147f3842f27'),
      img('photo-1556821840-3a63f95609a7'),
      img('photo-1521572163474-6864f9cf17ab'),
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. 400gsm.',
    fit: 'Relaxed drop shoulder. True to size.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Machine wash cold inside out. Lay flat to dry.',
    isNewDrop: true,
  },
  {
    id: 'p3',
    slug: 'california-pune-vintage-sweatshirt',
    name: 'CALIFORNIA → PUNE Vintage Sweatshirt',
    subtitle: 'Sun-faded collegiate energy',
    price: 72,
    category: 'sweatshirts',
    rootsLabel: 'CALIFORNIA → PUNE',
    description: 'Vintage collegiate typography meets diaspora identity.',
    taglines: ['Vintage collegiate typography meets diaspora identity.'],
    image: '/products/california-pune-sweatshirt.png',
    gallery: ['/products/california-pune-sweatshirt.png'],
    colors: [{ id: 'black', label: 'Vintage black', hex: '#1a1a1a' }],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% cotton French terry, garment-dyed.',
    fit: 'Vintage relaxed fit. Slightly cropped body.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Wash cold with like colors. Tumble low.',
    isNewDrop: true,
  },
  {
    id: 'p4',
    slug: 'texas-hyderabad-sweatshirt',
    name: 'TEXAS → HYDERABAD Sweatshirt',
    subtitle: 'Warmth across time zones',
    price: 72,
    category: 'sweatshirts',
    rootsLabel: 'Austin → HYDERABAD',
    description:
      'A relaxed layer for late calls home and early mornings elsewhere.',
    taglines: [
      'A relaxed layer for late calls home and early mornings elsewhere.',
    ],
    image: img('photo-1620799140408-ed5341f2e09e'),
    gallery: [img('photo-1620799140408-ed5341f2e09e'), img('photo-1521572163474-6864f9cf17ab')],
    colors: [
      { id: 'sand', label: 'Sand', hex: '#c4b8a8' },
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '85% cotton, 15% recycled polyester.',
    fit: 'Standard fit with ribbed cuffs and hem.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Machine wash cold. Do not bleach.',
    isNewDrop: false,
  },
  {
    id: 'p5',
    slug: 'golden-gate-zbridge',
    name: 'Golden Gate → Zbridge',
    subtitle: 'Two bridges, one crossing',
    price: 72,
    category: 'sweatshirts',
    rootsLabel: 'Golden Gate → Zbridge',
    description: 'Graphic sweatshirt nodding to coastlines and the city you left behind.',
    taglines: ['Graphic sweatshirt nodding to coastlines and the city you left behind.'],
    image: img('photo-1434389677669-e08b4cac3105'),
    gallery: [img('photo-1434389677669-e08b4cac3105'), img('photo-1620799140408-ed5341f2e09e')],
    colors: [{ id: 'black', label: 'Black', hex: '#1a1a1a' }],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Heavyweight cotton blend fleece.',
    fit: 'Relaxed, slightly oversized.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Machine wash cold inside out.',
    isNewDrop: true,
  },
  {
    id: 'p6',
    slug: 'new-jersey-delhi-sweatshirt',
    name: 'NEW JERSEY → DELHI Sweatshirt',
    subtitle: 'Winter light, two homes',
    price: 72,
    category: 'sweatshirts',
    rootsLabel: 'NEW JERSEY → DELHI',
    description: 'Soft layer for commutes that span more than miles.',
    taglines: ['Soft layer for commutes that span more than miles.'],
    image: img('photo-1618354691373-d851c5c3a990'),
    gallery: [img('photo-1618354691373-d851c5c3a990'), img('photo-1521572163474-6864f9cf17ab')],
    colors: [
      { id: 'navy', label: 'Navy', hex: '#1e2a38' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% organic cotton terry.',
    fit: 'True to size; relaxed through the body.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Cold wash. Low tumble or line dry.',
    isNewDrop: false,
  },
  {
    id: 'p7',
    slug: 'miami-goa-tee',
    name: 'MIAMI → GOA Tee',
    subtitle: 'Coastal drift, cotton-soft',
    price: 42,
    category: 't-shirts',
    rootsLabel: 'MIAMI → GOA',
    description: 'A relaxed graphic tee inspired by coastal nostalgia.',
    taglines: ['A relaxed graphic tee inspired by coastal nostalgia.'],
    image: '/products/miami-goa-tee.png',
    gallery: ['/products/miami-goa-tee.png'],
    colors: [
      { id: 'white', label: 'White', hex: '#f7f7f5' },
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '220gsm combed cotton. Pre-shrunk.',
    fit: 'Classic tee block with a slightly boxy drape.',
    shipping: 'Ships in 2–4 business days. International rates at checkout.',
    care: 'Machine wash cold. Do not iron print.',
    isNewDrop: true,
  },
]

export const rootsRemainIds = ['p1', 'p2', 'p3', 'p4', 'p5'] as const

export const featuredPieceIds = ['p1', 'p3', 'p7', 'p2', 'p6'] as const

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
