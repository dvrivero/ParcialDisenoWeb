import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCOP } from '../hooks/format'

export default function CartDrawer({ onClose }) {
  const { cart, dispatch, cartTotal } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-dark/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="animate-slide-in fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark/10">
          <div>
            <h2 className="font-display text-xl font-bold text-dark">Tu carrito</h2>
            {cart.items.length > 0 && (
              <p className="text-xs text-dark/40 mt-0.5">{cart.items.reduce((s,i)=>s+i.qty,0)} producto{cart.items.reduce((s,i)=>s+i.qty,0)!==1?'s':''}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark/8 transition-colors text-dark/50"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {cart.items.length === 0 ? (
            <div className="text-center py-16 text-dark/35">
              <div className="text-5xl mb-3">🛍️</div>
              <p className="font-body text-sm">Tu carrito está vacío</p>
              <button onClick={onClose} className="mt-4 text-xs text-honey-600 underline underline-offset-2">
                Explorar productos →
              </button>
            </div>
          ) : cart.items.map(item => (
            <div key={item.key} className="bg-white rounded-2xl p-4 flex gap-4 items-start border border-dark/6">
              <div className="w-11 h-11 rounded-xl bg-honey-100 flex items-center justify-center text-lg flex-shrink-0">🍯</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-dark leading-tight">{item.name}</p>
                <p className="text-xs text-dark/45 mb-2">{item.aromaName}</p>
                {/* Qty controls — Nivel 3: sincronización en varios puntos */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch({ type: 'DEC', key: item.key })}
                      className="w-6 h-6 rounded-full border border-dark/20 flex items-center justify-center text-xs hover:bg-dark/5 transition-colors"
                    >−</button>
                    <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => dispatch({ type: 'INC', key: item.key })}
                      className="w-6 h-6 rounded-full border border-dark/20 flex items-center justify-center text-xs hover:bg-dark/5 transition-colors"
                    >+</button>
                  </div>
                  <span className="text-sm font-bold">{formatCOP(item.price * item.qty)}</span>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE', key: item.key })}
                className="text-dark/25 hover:text-red-400 transition-colors mt-0.5 flex-shrink-0"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="px-6 py-5 border-t border-dark/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark/55">Subtotal</span>
              {/* Nivel 3: total sincronizado en tiempo real */}
              <span className="font-display text-2xl font-bold text-dark">{formatCOP(cartTotal)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-dark text-cream py-4 rounded-2xl font-medium text-sm hover:bg-dark/80 transition-all"
            >
              Ir al resumen del pedido →
            </button>
            <p className="text-center text-xs text-dark/35">Envíos a Colombia · Despachos internacionales</p>
          </div>
        )}
      </div>
    </>
  )
}