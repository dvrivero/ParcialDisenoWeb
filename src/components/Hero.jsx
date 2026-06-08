export default function Hero({ onShop }) {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 px-6 bg-cream overflow-hidden relative">
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, #F5B800 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">

        <div>
          <div className="animate-fade-up inline-flex items-center gap-2 bg-honey-100 text-honey-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span>✦</span> Desde 2022 · Bucaramanga, Colombia
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-6xl font-bold leading-tight text-dark mb-6">
            Cabello premium,<br/>
            <span className="text-honey-500">impacto real.</span>
          </h1>

          <p className="animate-fade-up delay-200 text-dark/58 text-lg leading-relaxed mb-8 max-w-md">
            Shampoo sólido con miel. Fórmula más limpia, sin químicos contaminantes.
            Una barra rinde hasta 3 veces más que una botella.
          </p>

          <div className="animate-fade-up delay-300 flex flex-wrap gap-5 mb-10">
            {[
              '70g = 35–58 lavadas',
              'Sin plástico',
              'Para toda la familia',
            ].map(label => (
              <div key={label} className="flex items-center gap-2 text-sm text-dark/65">
                <span className="w-1.5 h-1.5 rounded-full bg-honey-400 flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>

          <div className="animate-fade-up delay-400 flex flex-wrap gap-3">
            <button
              onClick={onShop}
              className="bg-dark text-cream px-8 py-4 rounded-full font-medium hover:bg-dark/80 transition-all text-sm"
            >
              Comprar ahora
            </button>
            <a
              href="https://wa.me/573180775959"
              target="_blank" rel="noopener"
              className="border border-dark/20 text-dark px-8 py-4 rounded-full font-medium hover:bg-dark/5 transition-all text-sm"
            >
              Cotizar por WhatsApp →
            </a>
          </div>
        </div>

        <div className="animate-fade-up delay-200 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-honey-100 opacity-60" />
            <div className="absolute inset-8 rounded-full bg-honey-200 opacity-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-2">🍯</div>
                <p className="font-display text-2xl font-bold text-honey-700">HoneyB</p>
                <p className="text-xs text-dark/45 mt-1">Natural Cosmetics</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2 shadow-sm border border-dark/8 text-xs font-medium text-dark">
              🌿 Fórmula limpia
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-sm border border-dark/8 text-xs font-medium text-dark">
              ♻️ Empaque reciclable
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}