import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '../data/catalog'
import type { Product } from '../types/product'
import { canAddProductToCart } from '../lib/cartRules'
import { CartContext, type CartLine } from './cartContext'

function lineKey(productId: string, size: string, colorId: string) {
  return `${productId}::${size}::${colorId}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    ({
      product,
      size,
      colorId,
      quantity = 1,
    }: {
      product: Product
      size: string
      colorId: string
      quantity?: number
    }) => {
      if (!canAddProductToCart(product)) return
      const key = lineKey(product.id, size, colorId)
      setLines((prev) => {
        const i = prev.findIndex((l) => l.key === key)
        if (i >= 0) {
          const next = [...prev]
          next[i] = { ...next[i], quantity: next[i].quantity + quantity }
          return next
        }
        return [...prev, { key, productId: product.id, quantity, size, colorId }]
      })
      setIsOpen(true)
    },
    []
  )

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.key !== key))
      return
    }
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, quantity } : l))
    )
  }, [])

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const { subtotal, lineCount } = useMemo(() => {
    let total = 0
    let count = 0
    for (const line of lines) {
      const p = getProductById(line.productId)
      if (p) {
        total += p.price * line.quantity
        count += line.quantity
      }
    }
    return { subtotal: total, lineCount: count }
  }, [lines])

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeLine,
      subtotal,
      lineCount,
    }),
    [
      lines,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeLine,
      subtotal,
      lineCount,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
