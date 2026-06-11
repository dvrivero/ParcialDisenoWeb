import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/8 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display font-bold text-cream/80 text-lg mb-2">HONEY'B</p>
            <p className="text-xs text-cream/35 leading-relaxed">Cabello premium, impacto real.<br/>Bucaramanga, Colombia · Desde 2022.</p>
          </div>
          <div>
            <p className="text-xs font-medium text-cream/50 uppercase tracking-wider mb-3">Páginas</p>
            <div className="space-y-2">
              <Link to="/" className="block text-xs text-cream/35 hover:text-cream/60 transition-colors">Inicio</Link>
              <Link to="/hoteleria" className="block text-xs text-cream/35 hover:text-cream/60 transition-colors">Hotelería & Glamping</Link>
              <Link to="/checkout" className="block text-xs text-cream/35 hover:text-cream/60 transition-colors">Mi pedido</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-cream/50 uppercase tracking-wider mb-3">Contacto</p>
            <div className="space-y-2">
              <a href="https://wa.me/573180775959" target="_blank" rel="noopener" className="block text-xs text-cream/35 hover:text-honey-300 transition-colors">WhatsApp +57 318 077 5959</a>
              <a href="mailto:honeybcorporativo@gmail.com" className="block text-xs text-cream/35 hover:text-honey-300 transition-colors">honeybcorporativo@gmail.com</a>
              <a href="https://www.instagram.com/honeyb_natural_cosmetics/" target="_blank" rel="noopener" className="block text-xs text-cream/35 hover:text-honey-300 transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@honeyb_natural_cosmetics" target="_blank" rel="noopener" className="block text-xs text-cream/35 hover:text-honey-300 transition-colors">TikTok</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/25">
          <span>© {new Date().getFullYear()} HoneyB S.A.S. · Todos los derechos reservados.</span>
          <span>Hecho con ❤ en Colombia</span>
        </div>
      </div>
    </footer>
  )
}