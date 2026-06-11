import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hoteleria from './pages/Hoteleria'
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/hoteleria" element={<Hoteleria />} />
          <Route path="/checkout"  element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}