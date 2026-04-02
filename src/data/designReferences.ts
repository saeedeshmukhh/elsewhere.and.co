/** One hero image per Roots Remain piece — used as Gemini reference for Design Your Own. */
export interface DesignReference {
  id: string
  /** Shop product slug for deep links if needed */
  productSlug: string
  label: string
  image: string
  /** City spelled as on the garment (Gemini replaces this with the user’s home city). */
  mainCityOnGarment: string
  /** Struck / secondary city as on the garment (Gemini replaces with user’s sister / US city). */
  secondaryCityOnGarment: string
  /** Describes the product for the text prompt (matches the reference photo). */
  garmentPhrase: string
  previewGarment: 'hoodie' | 't-shirt'
  previewColorHex: string
  previewTextOnDark: boolean
}

export const DESIGN_REFERENCES: DesignReference[] = [
  {
    id: 'california-pune',
    productSlug: 'california-pune-sweatshirt',
    label: 'California → Pune (crew)',
    image: '/products/california-pune/01.png',
    mainCityOnGarment: 'Pune',
    secondaryCityOnGarment: 'California',
    garmentPhrase: 'black crewneck sweatshirt',
    previewGarment: 'hoodie',
    previewColorHex: '#1a1a1a',
    previewTextOnDark: true,
  },
  {
    id: 'new-york-pune',
    productSlug: 'new-york-pune-sweatshirt',
    label: 'New York → Pune (quarter-zip)',
    image: '/products/new-york-pune/01.png',
    mainCityOnGarment: 'PUNE',
    secondaryCityOnGarment: 'New York',
    garmentPhrase: 'black quarter-zip sweatshirt',
    previewGarment: 'hoodie',
    previewColorHex: '#1a1a1a',
    previewTextOnDark: true,
  },
  {
    id: 'nyc-mumbai',
    productSlug: 'nyc-mumbai-hoodie',
    label: 'NYC → Mumbai (hoodie)',
    image: '/products/nyc-mumbai/01.png',
    mainCityOnGarment: 'Mumbai',
    secondaryCityOnGarment: 'NYC',
    garmentPhrase: 'heather grey pullover hoodie',
    previewGarment: 'hoodie',
    previewColorHex: '#c8c6c2',
    previewTextOnDark: false,
  },
  {
    id: 'mumbai-nyc',
    productSlug: 'mumbai-nyc-tee',
    label: 'Mumbai → NYC (tee)',
    image: '/products/mumbai-nyc/05.png',
    mainCityOnGarment: 'MUMBAI',
    secondaryCityOnGarment: 'NYC',
    garmentPhrase: 'white short-sleeve graphic t-shirt',
    previewGarment: 't-shirt',
    previewColorHex: '#f7f7f5',
    previewTextOnDark: false,
  },
  {
    id: 'boston-bangalore',
    productSlug: 'boston-bangalore-tee',
    label: 'Boston → Bangalore (tee)',
    image: '/products/boston-bangalore/03.png',
    mainCityOnGarment: 'BANGALORE',
    secondaryCityOnGarment: 'BOSTON',
    garmentPhrase: 'navy short-sleeve graphic t-shirt',
    previewGarment: 't-shirt',
    previewColorHex: '#1a2744',
    previewTextOnDark: true,
  },
  {
    id: 'ahmedabad-austin',
    productSlug: 'ahmedabad-austin-tee',
    label: 'Ahmedabad → Austin (tee)',
    image: '/products/ahmedabad-austin/01.png',
    mainCityOnGarment: 'AHMEDABAD',
    secondaryCityOnGarment: 'Austin',
    garmentPhrase: 'maroon short-sleeve graphic t-shirt',
    previewGarment: 't-shirt',
    previewColorHex: '#5c2434',
    previewTextOnDark: true,
  },
]

export function getDesignReferenceById(id: string): DesignReference | undefined {
  return DESIGN_REFERENCES.find((r) => r.id === id)
}
