import { createContext, useContext, useReducer } from 'react'
import { PRODUCTS, AROMAS } from '../data/products'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.productId}_${action.aromaId}`
      const exists = state.items.find(i => i.key === key)
      if (exists) {
        return { ...state, items: state.items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) }
      }
      const product = PRODUCTS.find(p => p.id === action.productId)
      const aroma   = AROMAS.find(a => a.id === action.aromaId)
      return {
        ...state,
        items: [...state.items, {
          key, productId: action.productId, aromaId: action.aromaId,
          name: product.name, aromaName: aroma.name,
          price: product.price, qty: 1,
        }],
      }
    }
    case 'REMOVE': return { ...state, items: state.items.filter(i => i.key !== action.key) }
    case 'INC':    return { ...state, items: state.items.map(i => i.key === action.key ? { ...i, qty: i.qty + 1 } : i) }
    case 'DEC':    return { ...state, items: state.items.map(i => i.key === action.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i) }
    case 'CLEAR':  return { items: [] }
    default:       return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })
  const cartCount = cart.items.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, dispatch, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}