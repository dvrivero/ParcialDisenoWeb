const CARDS = [
  { icon: '✨', title: 'Experiencia premium', desc: 'Espuma cremosa, limpieza efectiva y una fragancia elegante, limpia y sofisticada que se queda en la memoria.' },
  { icon: '💧', title: 'Fórmula más limpia',  desc: 'Libre de químicos contaminantes: cuidado real para tu cabello y más respeto por el agua y el planeta.' },
  { icon: '♻️', title: 'Rinde muchísimo',     desc: 'Una barra dura decenas de lavadas: menos compras frecuentes, menos envases plásticos, más valor por tu dinero.' },
]

export default function WhyHoneyB() {
  return (
    <section id="por-que" className="py-24 px-6 bg-dark text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-honey-400 text-sm font-medium mb-3">¿Por qué HoneyB?</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Lujo consciente<br/>para tu rutina.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="bg-white/[0.05] rounded-3xl p-8 border border-white/10 hover:bg-white/[0.08] transition-all duration-200"
            >
              <div className="text-3xl mb-5">{c.icon}</div>
              <h3 className="font-display text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-cream/55 leading-relaxed text-sm">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '70g',   label: 'Barra uso regular' },
            { val: '58',    label: 'Lavadas máx.' },
            { val: '3x',    label: 'Más rendimiento' },
            { val: '2022',  label: 'Desde' },
          ].map(s => (
            <div key={s.val} className="text-center py-5 border border-white/8 rounded-2xl">
              <p className="font-display text-3xl font-bold text-honey-300">{s.val}</p>
              <p className="text-xs text-cream/35 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}