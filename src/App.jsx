import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Artist from './components/Artist'
import Gallery from './components/Gallery'
import WhyUs from './components/WhyUs'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import InstagramCTA from './components/InstagramCTA'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast'

function HomeLayout() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const loadCustomTexts = async () => {
      try {
        const docRef = doc(db, 'siteContent', 'dashboard')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists() && docSnap.data().customTexts) {
          const custom = docSnap.data().customTexts
          
          if (custom.en) {
            i18n.addResourceBundle('en', 'translation', custom.en, true, true)
          }

          if (custom.nl) {
            i18n.addResourceBundle('nl', 'translation', custom.nl, true, true)
          }
        }
      } catch (e) {
        console.error("Firebase text fetch failed", e)
      }
    }
    loadCustomTexts()
  }, [i18n])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Artist />
        <Gallery />
        <WhyUs />
        <FAQ />
        <Reviews />
        <Contact />
        <InstagramCTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="bg-ink-black min-h-screen">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.05em',
              borderRadius: '0px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#0a0a0a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0a0a0a',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}
