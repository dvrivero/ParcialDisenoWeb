import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCOP } from '../hooks/format'

export default function Checkout() {
  const { cart, dispatch, cartTotal } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)  // 1 = resumen, 2 = datos, 3 = confirmado
  const [form, setForm] = useState({ nombre: '', telefono: '', ciudad: '', nota: '' })
  const [errors, setErrors] = useState({})

  const shipping = 8000
  const total = cartTotal + (cart.items.length > 0 ? shipping : 0)

  /* ── Validación simple ── */
  const validate = () => {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'Ingresa tu nombre'
    if (!form.telefono.trim())  e.telefono  = 'Ingresa tu teléfono'
    if (!form.ciudad.trim())    e.ciudad    = 'Ingresa tu ciudad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleConfirm = () => {
    if (!validate()) return
    const lines = cart.items.map(i => `• ${i.name} (${i.aromaName}) ×${i.qty} = ${formatCOP(i.price*i.qty)}`)
    const msg = encodeURIComponent(
      `Hola HoneyB 🍯\n\nQuiero hacer el siguiente pedido:\n\n${lines.join('\n')}\n\nSubtotal: ${formatCOP(cartTotal)}\nEnvío: ${formatCOP(shipping)}\nTotal: ${formatCOP(total)}\n\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nCiudad: ${form.ciudad}${form.nota ? `\nNota: ${form.nota}` : ''}`
    )
    dispatch({ type: 'CLEAR' })
    setStep(3)
    setTimeout(() => window.open(`https://wa.me/573180775959?text=${msg}`, '_blank'), 600)
  }

  /* Carrito vacío */
  if (cart.items.length === 0 && step !== 3) {
    return (
      <div className="pt-16 min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-display text-2xl font-bold text-dark mb-2">Tu carrito está vacío</h2>
          <p className="text-dark/45 text-sm mb-6">Agrega productos antes de continuar.</p>
          <Link to="/#elige" className="bg-dark text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-dark/80 transition-all">
            Ver productos →
          </Link>
        </div>
      </div>
    )
  }

  /* Confirmación */
  if (step === 3) {
    return (
      <div className="pt-16 min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-5">🎉</div>
          <h2 className="font-display text-3xl font-bold text-dark mb-3">¡Pedido enviado!</h2>
          <p className="text-dark/50 text-sm leading-relaxed mb-6">
            Te redirigimos a WhatsApp para coordinar el pago y el envío.
            Si no se abrió automáticamente, escríbenos al <strong>+57 318 077 5959</strong>.
          </p>
          <Link to="/" className="bg-dark text-cream px-8 py-3.5 rounded-full text-sm font-medium hover:bg-dark/80 transition-all">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-dark/35 mb-8">
          <Link to="/" className="hover:text-dark/60 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-dark">Resumen del pedido</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-10">Resumen del pedido</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-10">
          {[['1','Resumen'],['2','Tus datos']].map(([n, label], i) => (
            <div key={n} className="flex items-center gap-3">
              {i > 0 && <div className={`h-px w-8 ${step > i ? 'bg-dark' : 'bg-dark/15'}`} />}
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${step === i+1 ? 'bg-dark text-cream' : step > i+1 ? 'bg-honey-400 text-dark' : 'bg-dark/10 text-dark/35'}`}>
                  {step > i+1 ? '✓' : n}
                </div>
                <span className={`text-sm hidden sm:inline ${step === i+1 ? 'font-medium text-dark' : 'text-dark/35'}`}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Panel izquierdo */}
          <div className="md:col-span-2 space-y-4">
            {step === 1 && (
              <>
                <h2 className="font-display text-xl font-bold text-dark mb-4">Tus productos</h2>
                {cart.items.map(item => (
                  <div key={item.key} className="bg-white rounded-2xl p-5 border border-dark/8 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-honey-100 flex items-center justify-center text-xl flex-shrink-0">🍯</div>
                    <div className="flex-1">
                      <p className="font-medium text-dark text-sm">{item.name}</p>
                      <p className="text-xs text-dark/40 mb-3">{item.aromaName}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => dispatch({ type:'DEC', key:item.key })}
                            className="w-7 h-7 rounded-full border border-dark/15 flex items-center justify-center text-sm hover:bg-dark/5 transition-colors">−</button>
                          <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                          <button onClick={() => dispatch({ type:'INC', key:item.key })}
                            className="w-7 h-7 rounded-full border border-dark/15 flex items-center justify-center text-sm hover:bg-dark/5 transition-colors">+</button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-dark">{formatCOP(item.price * item.qty)}</span>
                          <button onClick={() => dispatch({ type:'REMOVE', key:item.key })} className="text-dark/20 hover:text-red-400 transition-colors">
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setStep(2)}
                  className="w-full bg-dark text-cream py-4 rounded-2xl font-medium text-sm hover:bg-dark/80 transition-all mt-4">
                  Continuar → Datos de entrega
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-dark/45 text-xs hover:text-dark/70 transition-colors mb-4">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Volver al resumen
                </button>
                <h2 className="font-display text-xl font-bold text-dark mb-4">Tus datos de contacto</h2>
                <div className="bg-white rounded-2xl p-6 border border-dark/8 space-y-4">
                  {[
                    { key: 'nombre',    label: 'Nombre completo',  type: 'text',  placeholder: 'Tu nombre' },
                    { key: 'telefono',  label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+57 300 000 0000' },
                    { key: 'ciudad',    label: 'Ciudad',            type: 'text',  placeholder: 'Bucaramanga' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium text-dark/50 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-dark bg-cream outline-none transition-all
                          ${errors[f.key] ? 'border-red-300 focus:border-red-400' : 'border-dark/12 focus:border-dark/35'}`}
                      />
                      {errors[f.key] && <p className="text-xs text-red-400 mt-1">{errors[f.key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-dark/50 mb-1.5">Nota (opcional)</label>
                    <textarea
                      placeholder="Instrucciones especiales para el envío…"
                      rows={3}
                      value={form.nota}
                      onChange={e => setForm(p => ({ ...p, nota: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-dark/12 focus:border-dark/35 text-sm text-dark bg-cream outline-none resize-none transition-all"
                    />
                  </div>
                </div>
                <button onClick={handleConfirm}
                  className="w-full bg-dark text-cream py-4 rounded-2xl font-medium text-sm hover:bg-dark/80 transition-all mt-2">
                  Confirmar y enviar por WhatsApp →
                </button>
                <p className="text-center text-xs text-dark/35 mt-2">
                  Coordinaremos pago y envío por WhatsApp contigo.
                </p>
              </>
            )}
          </div>

          {/* Resumen lateral — Nivel 3: sincronizado en tiempo real */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-dark/8 sticky top-20">
              <h3 className="font-display font-bold text-dark mb-4">Tu orden</h3>
              <div className="space-y-2 mb-4">
                {cart.items.map(i => (
                  <div key={i.key} className="flex justify-between text-xs">
                    <span className="text-dark/50">{i.name} ×{i.qty}</span>
                    <span className="font-medium text-dark">{formatCOP(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="honey-line mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark/45">Subtotal</span>
                  <span className="font-medium">{formatCOP(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/45">Envío est.</span>
                  <span className="font-medium">{formatCOP(shipping)}</span>
                </div>
              </div>
              <div className="honey-line my-4" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-dark/45">Total</span>
                <span className="font-display text-2xl font-bold text-dark">{formatCOP(total)}</span>
              </div>
              <p className="text-xs text-dark/30 mt-3 leading-relaxed">
                El envío final se confirma por WhatsApp según tu ciudad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}