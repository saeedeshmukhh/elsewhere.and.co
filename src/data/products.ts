import type { Product } from '../types/product'

/** Pre-launch: six-piece Roots Remain drop — sweatshirts + hoodie, then tees */
export const products: Product[] = [
  {
    id: 'p1',
    slug: 'california-pune-sweatshirt',
    name: 'CALIFORNIA → PUNE Sweatshirt',
    subtitle: 'Vintage fleece crew · distressed graphic',
    price: 39.99,
    category: 'sweatshirts',
    shopTags: ['sweatshirts', 'best-sellers'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'CALIFORNIA → PUNE',
    description:
      'Black crewneck with a cracked white graphic — California struck through, Pune bold, Roots Remain. Kangaroo pocket, ribbed trims, soft brushed interior.',
    taglines: [
      'Vintage collegiate typography meets diaspora identity.',
      'Wear the route you carry between two homes.',
    ],
    image: '/products/california-pune/01.png',
    gallery: [
      '/products/california-pune/01.png',
      '/products/california-pune/02.png',
      '/products/california-pune/03.png',
      '/products/california-pune/04.png',
      '/products/california-pune/05.png',
      '/products/california-pune/06.png',
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. Soft interior; ribbed collar, cuffs, and hem.',
    fit: 'Relaxed crewneck with front pouch pocket. True to size.',
    shipping: 'Shipping details when the drop goes live.',
    care: 'Machine wash cold inside out. Lay flat to dry.',
    isNewDrop: true,
    stockStatus: 'in_stock',
    featured: true,
    releaseBadge: 'first_drop',
  },
  {
    id: 'p4',
    slug: 'new-york-pune-sweatshirt',
    name: 'NEW YORK → PUNE Sweatshirt',
    subtitle: 'Black quarter-zip · Pune varsity, New York struck through',
    price: 39.99,
    category: 'sweatshirts',
    shopTags: ['sweatshirts', 'best-sellers'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'NEW YORK → PUNE',
    description:
      'Black brushed fleece with a red-and-white varsity graphic — PUNE large, “New York” in script with a strike-through, four stars below. Silver quarter-zip, kangaroo pocket, ribbed cuffs and hem.',
    taglines: [
      'East Coast energy, Pune-forward type — same crossover language as the rest of Roots Remain.',
    ],
    image: '/products/new-york-pune/01.png',
    gallery: [
      '/products/new-york-pune/01.png',
      '/products/new-york-pune/02.png',
      '/products/new-york-pune/03.png',
      '/products/new-york-pune/04.png',
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
      { id: 'cream', label: 'Cream', hex: '#f0ebe3' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '80% cotton, 20% polyester brushed fleece. Soft interior; ribbed cuffs and hem.',
    fit: 'Relaxed quarter-zip with front pouch pocket. True to size.',
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
    subtitle: 'Heather grey · NYC struck through, Mumbai bold',
    price: 39.99,
    category: 'hoodies',
    shopTags: ['hoodies', 'best-sellers'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'NYC → MUMBAI',
    description:
      'Heather pullover hoodie with a black collegiate graphic — NYC crossed out, Mumbai large, Roots Remain. Kangaroo pocket, ribbed cuffs and hem.',
    taglines: [
      'A heavyweight streetwear essential inspired by the feeling of home across cities.',
    ],
    image: '/products/nyc-mumbai/01.png',
    gallery: [
      '/products/nyc-mumbai/01.png',
      '/products/nyc-mumbai/02.png',
      '/products/nyc-mumbai/03.png',
      '/products/nyc-mumbai/04.png',
      '/products/nyc-mumbai/05.png',
    ],
    colors: [
      { id: 'heather', label: 'Heather grey', hex: '#c8c6c2' },
      { id: 'black', label: 'Black', hex: '#1a1a1a' },
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
    id: 'p6',
    slug: 'ahmedabad-austin-tee',
    name: 'AHMEDABAD → AUSTIN Tee',
    subtitle: 'Maroon tee · Ahmedabad varsity, Austin struck through',
    price: 19.99,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'AHMEDABAD → AUSTIN',
    description:
      'Deep maroon cotton tee with a cracked white collegiate graphic — AHMEDABAD arched large, Austin in script with a strike-through. Same crossover language as the rest of Roots Remain.',
    taglines: ['Gujarat grit, Texas crossed out — wear the route you claim.'],
    image: '/products/ahmedabad-austin/01.png',
    gallery: [
      '/products/ahmedabad-austin/01.png',
      '/products/ahmedabad-austin/02.png',
      '/products/ahmedabad-austin/03.png',
      '/products/ahmedabad-austin/04.png',
    ],
    colors: [
      { id: 'maroon', label: 'Maroon', hex: '#5c2434' },
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
    releaseBadge: 'new',
  },
  {
    id: 'p5',
    slug: 'boston-bangalore-tee',
    name: 'BOSTON → BANGALORE Tee',
    subtitle: 'Navy tee · Bangalore bold, Boston struck through',
    price: 19.99,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'BOSTON → BANGALORE',
    description:
      'Deep navy cotton tee with a white serif graphic — Bangalore arched large, Boston crossed out, Roots Remain below. Same city-crossover language as the rest of the drop.',
    taglines: ['East-coast grit meets garden-city calm.'],
    image: '/products/boston-bangalore/03.png',
    gallery: [
      '/products/boston-bangalore/03.png',
      '/products/boston-bangalore/01.png',
      '/products/boston-bangalore/02.png',
      '/products/boston-bangalore/04.png',
    ],
    colors: [
      { id: 'navy', label: 'Navy', hex: '#1a2744' },
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
    id: 'p3',
    slug: 'mumbai-nyc-tee',
    name: 'MUMBAI → NYC Tee',
    subtitle: 'White tee · Mumbai arched, classic taxi, NYC struck through',
    price: 19.99,
    category: 't-shirts',
    shopTags: ['t-shirts'],
    collectionSlug: 'roots-remain',
    rootsLabel: 'MUMBAI → NYC',
    description:
      'Crisp white cotton tee with a navy serif graphic — MUMBAI arched over a black-and-yellow Mumbai taxi, NYC crossed out below. Same roots-first language as the rest of the drop.',
    taglines: [
      'The city on your chest — one home bold, the other crossed out.',
    ],
    image: '/products/mumbai-nyc/05.png',
    gallery: [
      '/products/mumbai-nyc/05.png',
      '/products/mumbai-nyc/01.png',
      '/products/mumbai-nyc/02.png',
      '/products/mumbai-nyc/03.png',
      '/products/mumbai-nyc/04.png',
    ],
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
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFirstDropProducts(): Product[] {
  return [...products].sort((a, b) => {
    const rank = (c: Product['category']) =>
      c === 'sweatshirts' ? 0 : c === 'hoodies' ? 1 : 2
    const d = rank(a.category) - rank(b.category)
    if (d !== 0) return d
    return a.name.localeCompare(b.name)
  })
}
