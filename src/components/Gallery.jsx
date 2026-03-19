import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

const GALLERY_IMAGES = [
  {
    /* Massive Hero Piece */
    url: '/gallery-1.jpg',
    span: 'col-span-12 md:col-span-8',
    aspect: 'aspect-[4/5] md:aspect-[3/2]'
  },
  {
    /* Standard Portrait aligned exactly to the Hero piece's height */
    url: '/gallery-4.jpg',
    span: 'col-span-12 md:col-span-4',
    aspect: 'aspect-[4/5] md:aspect-[3/4]'
  },
  {
    /* Triptych 1 */
    url: '/gallery-2.jpg',
    span: 'col-span-12 md:col-span-4',
    aspect: 'aspect-square md:aspect-[4/5]'
  },
  {
    /* Triptych 2 */
    url: '/gallery-3.jpg',
    span: 'col-span-12 md:col-span-4',
    aspect: 'aspect-square md:aspect-[4/5]'
  },
  {
    /* Triptych 3 */
    url: '/gallery-5.jpg',
    span: 'col-span-12 md:col-span-4',
    aspect: 'aspect-square md:aspect-[4/5]'
  }
]

export default function Gallery() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [instagramLinks, setInstagramLinks] = useState([])

  const getLayoutClasses = (idx) => {
    switch(idx % 5) {
      case 0: return { span: 'col-span-12 md:col-span-8', aspect: 'aspect-[4/5] md:aspect-[3/2]' }
      case 1: return { span: 'col-span-12 md:col-span-4', aspect: 'aspect-[4/5] md:aspect-[3/4]' }
      case 2: 
      case 3: 
      case 4: return { span: 'col-span-12 md:col-span-4', aspect: 'aspect-square md:aspect-[4/5]' }
      default: return { span: 'col-span-12 md:col-span-4', aspect: 'aspect-square' }
    }
  }

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const loadedImages = []
        querySnapshot.forEach((doc) => {
          loadedImages.push({ id: doc.id, url: doc.data().base64 })
        })
        setInstagramLinks(loadedImages)
      } catch (e) {
        console.error('Firebase read error:', e)
      }
    }
    loadLinks()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    const elements = ref.current?.querySelectorAll('.reveal-up, .reveal-scale')
    if (elements) elements.forEach((el) => observer.observe(el))
    
    return () => observer.disconnect()
  }, [instagramLinks, t])

  return (
    <section id="work" ref={ref} className="py-24 md:py-48 bg-[#050505]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        
        {/* Header Setup */}
        <div className="reveal-up mb-20 md:mb-32 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-crimson" />
            <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">{t('gallery.subtitle')}</span>
          </div>
          <h2 className="font-display text-white text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
            {t('gallery.title1')} <br />
            <span className="italic text-cream-muted">{t('gallery.title2')}</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Grid */}
        {/* Editorial Asymmetric Image Grid */}
        {instagramLinks.length > 0 ? (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {instagramLinks.map((item, idx) => {
              const layout = getLayoutClasses(idx)
              return (
                <div
                  key={item.id}
                  className={`editorial-img-container reveal-scale shadow-2xl ${layout.span} ${layout.aspect} relative group overflow-hidden`}
                  style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}
                >
                  <img
                    src={item.url}
                    alt="Tattoo piece"
                    className="w-full h-full object-cover grayscale-[30%] contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-700" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/20 transition-colors duration-700 pointer-events-none" />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {GALLERY_IMAGES.map((item, idx) => (
              <div
                key={idx}
                className={`editorial-img-container reveal-scale shadow-2xl ${item.span} ${item.aspect} relative group`}
                style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}
              >
                <img
                  src={item.url}
                  alt="Tattoo piece"
                  className="grayscale-[30%] contrast-125 object-cover" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/40 transition-colors duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* Footer Text & CTA */}
        <div className="reveal-up mt-24 flex flex-col items-center text-center">
          <p className="text-cream-dim text-xs md:text-sm font-light max-w-xl mb-10 italic">
            "{t('gallery.p1')}"
          </p>

          <a
            href="https://www.instagram.com/ink.n.pain.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-transparent border border-white/20 text-white text-[11px] tracking-[0.2em] font-medium uppercase hover:border-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              {t('gallery.cta')}
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
