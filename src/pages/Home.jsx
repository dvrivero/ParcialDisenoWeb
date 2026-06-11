import Hero from '../components/Hero'
import WhyHoneyB from '../components/WhyHoneyB'
import EligeSection from '../components/EligeSection'
import { Testimonials, FAQ } from '../components/TestimonialsAndFAQ'
import Contact from '../components/Contact'

export default function Home() {
  const scrollToElige = () => {
    document.getElementById('elige')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero onShop={scrollToElige} />
      <WhyHoneyB />
      <EligeSection />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}