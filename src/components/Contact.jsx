import { Link } from 'react-router-dom'

const CONTACT_INFO = [
  { icon: '📍', label: 'Base',     val: 'Bucaramanga, Colombia' },
  { icon: '📱', label: 'WhatsApp', val: '+57 318 077 5959', href: 'https://wa.me/573180775959' },
  { icon: '✉️', label: 'Correo',   val: 'honeybcorporativo@gmail.com', href: 'mailto:honeybcorporativo@gmail.com' },
]

export default function Contact() {
  return (
    <section id="contacto" className="py-24 px-6 bg-dark text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Info */}
          <div>
            <p className="text-honey-400 text-sm font-medium mb-3">Hablemos</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
              Dudas, alianzas<br/>o cotizaciones.
            </h2>
            <p className="text-cream/45 leading-relaxed mb-8 text-sm">
              ¿Eres hotel, glamping o spa? Tenemos una propuesta especial para ti.
              Escríbenos y te respondemos en menos de 48h hábiles.
            </p>
            <div className="space-y-4">
              {CONTACT_INFO.map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xl w-8 flex-shrink-0">{c.icon}</span>
                  <div>
                    <p className="text-xs text-cream/35">{c.label}</p>
                    {c.href
                      ? <a href={c.href} className="text-sm text-honey-300 hover:text-honey-200 transition-colors">{c.val}</a>
                      : <p className="text-sm text-cream/75">{c.val}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/hoteleria"
              className="block bg-honey-400 text-dark rounded-2xl p-6 hover:bg-honey-300 transition-all"
            >
              <p className="font-display font-bold text-lg mb-1">Cotizar hotelería</p>
              <p className="text-sm text-dark/55">Hoteles boutique · Glamping · Spas →</p>
            </Link>

            <a
              href="https://wa.me/573180775959"
              target="_blank" rel="noopener"
              className="block bg-white/[0.07] rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <p className="font-display font-bold text-lg mb-1 text-cream">Soporte al cliente</p>
              <p className="text-sm text-cream/35">Respuesta en menos de 24h →</p>
            </a>

            <div className="flex gap-3">
              <a href="https://www.instagram.com/honeyb_natural_cosmetics/" target="_blank" rel="noopener"
                 className="flex-1 bg-white/[0.07] rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all text-center text-sm text-cream/50 hover:text-cream">
                Instagram →
              </a>
              <a href="https://www.tiktok.com/@honeyb_natural_cosmetics" target="_blank" rel="noopener"
                 className="flex-1 bg-white/[0.07] rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all text-center text-sm text-cream/50 hover:text-cream">
                TikTok →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}