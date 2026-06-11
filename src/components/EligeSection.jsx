import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { PRODUCTS, AROMAS } from '../data/products'
import { formatCOP } from '../hooks/format'

const STEPS = [
  { n: '1', title: 'Humedece',          desc: 'Moja tu cabello y la barra con agua.' },
  { n: '2', title: 'Activa la espuma',  desc: 'Frota la barra en tus manos o directamente en el cabello hasta generar espuma cremosa.' },
  { n: '3', title: 'Masajea y enjuaga', desc: 'Masajea como siempre y enjuaga con agua.' },
]

export default function EligeSection() {
  const { dispatch } = useCart()

  const [activeProduct, setActiveProduct] = useState('p70')
  const [selectedAroma, setSelectedAroma]  = useState('a1')
  const [aromas, setAromas]                = useState(AROMAS)
  const [adding, setAdding]                = useState(false)
  const [added, setAdded]                  = useState(false)
  const [dragging, setDragging]            = useState(null)
  const [dragOver, setDragOver]            = useState(null)

  const product = PRODUCTS.find(p => p.id === activeProduct)
  const aroma   = aromas.find(a => a.id === selectedAroma) || aromas[0]

  /* Agregar al carrito*/
  const handleAdd = () => {
    setAdding(true)
    dispatch({ type: 'ADD', productId: activeProduct, aromaId: selectedAroma })  // actualización inmediata
    setTimeout(() => { setAdding(false); setAdded(true) }, 300)
    setTimeout(() => setAdded(false), 1800)
  }

  /* Drag & Drop aromas */
  const handleDragStart = (e, id) => { setDragging(id); e.dataTransfer.effectAllowed = 'move' }
  const handleDragOver  = (e, id) => { e.preventDefault(); setDragOver(id) }
  const handleDrop      = (e, targetId) => {
    e.preventDefault()
    if (!dragging || dragging === targetId) { setDragging(null); setDragOver(null); return }
    setAromas(prev => {
      const arr = [...prev]
      const from = arr.findIndex(a => a.id === dragging)
      const to   = arr.findIndex(a => a.id === targetId)
      const [moved] = arr.splice(from, 1)
      arr.splice(to, 0, moved)
      return arr
    })
    setDragging(null); setDragOver(null)
  }
  const handleDragEnd = () => { setDragging(null); setDragOver(null) }

  return (
    <section id="elige" className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <div className="mb-12">
          <p className="text-honey-600 text-sm font-medium mb-3">Configurador de producto</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark">Elige tu HoneyB</h2>
          <p className="text-dark/45 mt-3 text-sm">Selecciona presentación y aroma, luego agrega al carrito.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-5xl font-bold text-honey-200 leading-none">01</span>
                <div>
                  <p className="font-display font-bold text-lg text-dark">Presentación</p>
                  <p className="text-xs text-dark/40">Elige el tamaño que necesitas</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(p.id)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200
                      ${activeProduct === p.id
                        ? 'border-dark bg-dark text-cream'
                        : 'border-dark/12 bg-white hover:border-dark/25'}`}
                  >
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                      ${activeProduct === p.id ? 'bg-honey-400 text-dark' : 'bg-honey-100 text-honey-700'}`}>
                      {p.tag}
                    </span>
                    <p className="font-display font-bold text-lg mt-3">{p.name}</p>
                    <p className={`text-xs mt-0.5 ${activeProduct === p.id ? 'text-cream/55' : 'text-dark/45'}`}>{p.subtitle}</p>
                    <p className="font-bold text-xl mt-3">{formatCOP(p.price)}</p>
                    <p className={`text-xs mt-1 ${activeProduct === p.id ? 'text-cream/45' : 'text-dark/35'}`}>{p.washes}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-5xl font-bold text-honey-200 leading-none">02</span>
                <div>
                  <p className="font-display font-bold text-lg text-dark">Aroma</p>
                  <p className="text-xs text-dark/40">Arrastra para reordenar · El primero = tu favorito</p>
                </div>
              </div>

              <div className="space-y-2">
                {aromas.map((a, idx) => (
                  <div
                    key={a.id}
                    draggable
                    onDragStart={e => handleDragStart(e, a.id)}
                    onDragOver={e  => handleDragOver(e, a.id)}
                    onDrop={e      => handleDrop(e, a.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setSelectedAroma(a.id)}
                    className={`aroma-card flex items-center gap-4 p-4 rounded-2xl border transition-all
                      ${selectedAroma === a.id ? 'border-dark bg-white shadow-sm' : 'border-dark/10 bg-white hover:border-dark/20'}
                      ${dragging === a.id ? 'dragging' : ''}
                      ${dragOver === a.id && dragging !== a.id ? 'drag-over' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 opacity-25">
                      {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-dark" />)}
                    </div>

                    {idx === 0 && (
                      <span className="text-xs bg-honey-200 text-honey-800 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        ★ Fav
                      </span>
                    )}

                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: a.color }}
                    >
                      {a.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-dark">{a.name}</p>
                      <p className="text-xs text-dark/35">{a.eng}</p>
                      <p className="text-xs text-dark/55 mt-0.5">{a.copy}</p>
                    </div>

                    {selectedAroma === a.id && (
                      <div className="w-5 h-5 rounded-full bg-dark flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-5xl font-bold text-honey-200 leading-none">03</span>
                <div>
                  <p className="font-display font-bold text-lg text-dark">Agregar al carrito</p>
                  <p className="text-xs text-dark/40">El contador y el total se actualizan al instante</p>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={adding}
                className={`w-full py-4 rounded-2xl font-medium text-sm transition-all flex items-center justify-center gap-2
                  ${added   ? 'bg-green-500 text-white'
                  : adding  ? 'bg-dark/70 text-cream cursor-wait'
                            : 'bg-dark text-cream hover:bg-dark/80 active:scale-[0.98]'}`}
              >
                {added ? (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ¡Agregado!
                  </>
                ) : adding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin-sm" />
                    Agregando…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Agregar al carrito — {formatCOP(product.price)}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-5">

            <div className="bg-white rounded-3xl p-8 border border-dark/8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-dark">{product.name}</h3>
                  <p className="text-dark/45 text-sm">{product.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl font-bold text-dark">{formatCOP(product.price)}</p>
                  <p className="text-xs text-dark/35">{product.washes}</p>
                </div>
              </div>
              <p className="text-dark/55 text-sm leading-relaxed mb-5">{product.description}</p>
              <div className="honey-line mb-5" />
              <div className="space-y-2 text-sm">
                {[
                  ['Aroma seleccionado', `${aroma.name} ${aroma.icon}`],
                  ['Equivalencia',        product.equiv],
                  ['Tamaño',              product.size],
                  ['Empaque',             '♻️ Cartón 100% reciclable'],
                ].map(([k,v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-dark/40">{k}</span>
                    <span className={`font-medium ${k==='Empaque' ? 'text-green-600' : 'text-dark'}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cómo se usa */}
            <div className="bg-honey-50 rounded-3xl p-8 border border-honey-200">
              <p className="font-display font-bold text-lg text-dark mb-5">¿Primera vez? Es facilísimo.</p>
              <div className="space-y-4">
                {STEPS.map(s => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-honey-400 text-dark text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-dark">{s.title}</p>
                      <p className="text-xs text-dark/50 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-honey-200 text-xs text-dark/45">
                💡 <strong>Tip:</strong> Déjala secar en una jabonera con drenaje, lejos del chorro directo.
              </div>
            </div>

            {/* Ingredientes */}
            <div className="bg-white rounded-3xl p-5 border border-dark/8">
              <p className="text-xs text-dark/35 mb-1">Ingredientes destacados</p>
              <p className="text-sm text-dark/65 leading-relaxed">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}