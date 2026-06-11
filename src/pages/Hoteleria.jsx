import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCOP } from '../hooks/format'

const AMENITY = {
  id: 'p20', name: 'HoneyB 20g', price: 15000,
  washes: '10–16 lavadas', equiv: '≈ 0.5–1 botella',
}
const AROMAS_LIST = ['Lino Blanco (White Linen)', 'Flor de Café (Coffee Blossom)', 'Bosque Andino (Andean Forest)']
const WHY_GUESTS = [
  { icon: '✨', t: 'Experiencia premium',    d: 'Espuma cremosa, limpieza efectiva y aroma elegante que los huéspedes recordarán.' },
  { icon: '🎁', t: 'Kit de bienvenida wow',  d: 'Perfecto para amenidades boutique, experiencia memorable desde el primer momento.' },
  { icon: '🏆', t: 'Diferenciación de marca', d: 'Un producto de autor que eleva la percepción del establecimiento.' },
]
const WHY_OPS = [
  { icon: '♻️', t: 'Reduce plástico',       d: 'Sin envases plásticos frente a amenidades líquidas convencionales.' },
  { icon: '💰', t: 'Mayor valor percibido',  d: 'Experiencia de lujo sin saturar, mejor ratio calidad/precio.' },
  { icon: '📦', t: 'Cotización flexible',    d: 'Según volumen, personalización y destino. Respondemos en 24–48h.' },
]

export default function Hoteleria() {
  const { dispatch } = useCart()

  const handleCotizar = () => {
    const msg = encodeURIComponent('Hola, me interesa cotizar amenidades HoneyB 20g para mi establecimiento.')
    window.open(`https://wa.me/573180775959?text=${msg}`, '_blank')
  }

  return (
    <div className="pt-16 bg-cream min-h-screen">

      {/* Hero de la página */}
      <section className="bg-dark text-cream py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #F5B800 0%, transparent 60%)' }}
        />
        <div className="max-w-6xl mx-auto relative">
          <Link to="/" className="inline-flex items-center gap-2 text-cream/40 text-xs hover:text-cream/70 transition-colors mb-8">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al inicio
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-honey-400/15 text-honey-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                🏨 Para hoteles, glamping & spas
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
                Amenidad premium<br/>que eleva cada<br/>
                <span className="text-honey-300">experiencia.</span>
              </h1>
              <p className="text-cream/50 leading-relaxed mb-8 text-sm">
                Ofrece a tus huéspedes un shampoo sólido de calidad premium, con fragancias limpias
                y sofisticadas, en presentación ideal para hospitalidad (20g). Empaque ecofriendly,
                sin plástico.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCotizar}
                  className="bg-honey-400 text-dark px-7 py-3.5 rounded-full font-medium text-sm hover:bg-honey-300 transition-all"
                >
                  Solicitar cotización →
                </button>
                <a href="mailto:honeybcorporativo@gmail.com"
                   className="border border-white/20 text-cream px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/5 transition-all">
                  Enviar correo
                </a>
              </div>
            </div>

            <div className="bg-white/[0.06] rounded-3xl p-8 border border-white/10">
              <p className="text-xs text-cream/35 uppercase tracking-wider mb-4">Ficha del producto</p>
              <div className="space-y-3 text-sm">
                {[
                  ['Presentación', '20g — amenidad premium'],
                  ['Duración',     AMENITY.washes + ` (${AMENITY.equiv}, según uso)`],
                  ['Empaque',      'Cartón ecofriendly 100% reciclable'],
                  ['Precio unit.',  formatCOP(AMENITY.price)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/8 pb-3">
                    <span className="text-cream/40">{k}</span>
                    <span className="text-cream font-medium text-right max-w-[55%]">{v}</span>
                  </div>
                ))}
                <div className="pt-1">
                  <p className="text-cream/40 text-xs mb-2">Aromas disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {['🌿 Lino Blanco', '☕ Flor de Café', '🌲 Bosque Andino'].map(a => (
                      <span key={a} className="text-xs bg-white/8 text-cream/65 px-3 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-dark mb-3">¿Por qué a tus huéspedes les encanta?</h2>
          <p className="text-dark/45 text-sm mb-10">Una experiencia diferenciada desde el primer momento.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {WHY_GUESTS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-dark/8">
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-display font-bold text-lg text-dark mb-2">{c.t}</h3>
                <p className="text-dark/50 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-honey-50 border-y border-honey-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-dark mb-3">¿Por qué conviene a tu operación?</h2>
          <p className="text-dark/45 text-sm mb-10">Sostenibilidad, valor percibido y flexibilidad.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {WHY_OPS.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-honey-200">
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-display font-bold text-lg text-dark mb-2">{c.t}</h3>
                <p className="text-dark/50 text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-dark mb-8">Ideal para</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏨', label: 'Hoteles boutique' },
              { icon: '⛺', label: 'Glamping' },
              { icon: '🧖', label: 'Spas & wellness' },
              { icon: '✈️', label: 'Experiencias exclusivas' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-2xl p-6 border border-dark/8 text-center hover:border-honey-300 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm font-medium text-dark">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-dark text-cream">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-honey-400 text-sm font-medium mb-3">¿Listo para elevar tu experiencia?</p>
          <h2 className="font-display text-4xl font-bold mb-4">Solicita tu cotización</h2>
          <p className="text-cream/45 text-sm leading-relaxed mb-8">
            Respondemos en menos de 24–48h hábiles con una propuesta según tu necesidad,
            volumen y destino.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCotizar}
              className="bg-honey-400 text-dark px-8 py-4 rounded-full font-medium text-sm hover:bg-honey-300 transition-all"
            >
              Cotizar por WhatsApp →
            </button>
            <a href="mailto:honeybcorporativo@gmail.com"
               className="border border-white/20 text-cream px-8 py-4 rounded-full font-medium text-sm hover:bg-white/5 transition-all">
              honeybcorporativo@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}