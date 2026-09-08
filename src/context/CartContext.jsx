import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'di-cart-v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { id, title, img, unit, priceFrom, qty }
  const [isOpen, setIsOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {
      // ignore corrupt storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage full or unavailable — cart just won't persist
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: product.id, title: product.title, img: product.img, unit: product.unit, priceFrom: product.priceFrom, moq: product.moq, qty }]
    })
    setLastAdded(product.title)
    setTimeout(() => setLastAdded(null), 2600)
  }

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, isOpen, setIsOpen, lastAdded }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
