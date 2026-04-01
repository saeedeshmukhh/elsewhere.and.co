import { createContext } from 'react'
import type { Product } from '../types/product'

export interface CartLine {
  key: string
  productId: string
  quantity: number
  size: string
  colorId: string
}

export interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (params: {
    product: Product
    size: string
    colorId: string
    quantity?: number
  }) => void
  updateQuantity: (key: string, quantity: number) => void
  removeLine: (key: string) => void
  subtotal: number
  lineCount: number
}

export const CartContext = createContext<CartContextValue | null>(null)
