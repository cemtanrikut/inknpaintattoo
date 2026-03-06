import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import WhyUs from './components/WhyUs'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import InstagramCTA from './components/InstagramCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-ink-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <WhyUs />
        <FAQ />
        <Reviews />
        <Contact />
        <InstagramCTA />
      </main>
      <Footer />
    </div>
  )
}
