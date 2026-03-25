import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="bg-[#050505] border-t border-hairline relative pt-32 pb-8 overflow-hidden">
      {/* Giant Typography Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full flex justify-center items-center select-none pointer-events-none opacity-[0.03]">
        <span className="font-display text-[25vw] md:text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap text-white">
          {t('footer.bg_text')}
        </span>
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block group"
            >
              <img
                src="/logo.png"
                alt="Ink 'n Pain Logo"
                className="h-20 md:h-24 object-contain transition-opacity duration-500 group-hover:opacity-80 drop-shadow-lg"
              />
            </button>
            <p className="text-cream-muted text-sm font-light max-w-sm mt-4">
              {t('footer.brand_text')} <br />
              {t('footer.brand_text2')}
            </p>
          </div>

          {/* Links Col */}
          <div>
            <p className="text-white text-[10px] tracking-[0.2em] font-mono uppercase mb-6">{t('footer.nav_label')}</p>
            <nav className="flex flex-col gap-4 text-sm font-light text-cream-muted">
              {['work', 'about', 'faq', 'reviews', 'contact'].map(id => (
                <button
                  key={id}
                  onClick={() => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-fit link-underline capitalize hover:text-white transition-colors"
                >
                  {t(`nav.${id}`) || id}
                </button>
              ))}
            </nav>
          </div>

          {/* Socials Col */}
          <div>
            <p className="text-white text-[10px] tracking-[0.2em] font-mono uppercase mb-6">{t('footer.connect_label')}</p>
            <nav className="flex flex-col gap-4 text-sm font-light text-cream-muted">
              <a href="https://wa.me/31620973330" target="_blank" rel="noopener noreferrer" className="w-fit link-underline hover:text-white transition-colors">
                WhatsApp
              </a>
              <a href="https://www.instagram.com/ink.n.pain.tattoo" target="_blank" rel="noopener noreferrer" className="w-fit link-underline hover:text-white transition-colors">
                Instagram
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="reveal-up pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest font-mono text-cream-dim uppercase" style={{ transitionDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {year} {t('footer.rights')}</p>
            <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500" />
              {t('footer.lgbtq')}
            </p>
          </div>
          <p>
            {t('footer.designed')} <span className="text-white">{t('footer.utrecht')}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
