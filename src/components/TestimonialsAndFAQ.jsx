import { useState } from 'react'
import { TESTIMONIALS, FAQS } from '../data/products'

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 px-6 bg-dark text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-honey-400 text-sm font-medium mb-3">Testimonios reales</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Lo dicen<br/>nuestros clientes.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white/[0.05] rounded-3xl p-8 border border-white/10">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-honey-400">★</span>
                ))}
              </div>
              <p className="text-cream/75 leading-relaxed mb-6 italic text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-honey-400/15 flex items-center justify-center text-honey-300 text-sm font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-cream">{t.author}</p>
                  <p className="text-xs text-cream/35">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-honey-600 text-sm font-medium mb-3">Preguntas frecuentes</p>
          <h2 className="font-display text-4xl font-bold text-dark">¿Tienes dudas?</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-dark/8 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-dark/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-dark">{f.q}</span>
                <span className={`text-dark/35 text-xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-dark/55 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}