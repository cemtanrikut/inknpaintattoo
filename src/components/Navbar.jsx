import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: t('nav.work', 'Work'), href: '#work' },
    { label: t('nav.studio', 'Studio'), href: '#about' },
    { label: t('nav.artist', 'Artist'), href: '#artist' },
    { label: t('nav.journal', 'Journal'), href: '#reviews' },
    { label: t('nav.contact', 'Contact'), href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = target.offsetTop
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-glass border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col text-left group"
        >
          <img 
            src="/logo.png" 
            alt="Ink 'n Pain Logo" 
            className="h-12 md:h-14 object-contain transition-opacity duration-500 hover:opacity-80"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className="link-underline text-cream-muted hover:text-white text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-500"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://www.instagram.com/ink.n.pain.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2.5 border border-white/20 text-cream text-[11px] tracking-[0.2em] uppercase font-mono hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-slow shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            {t('nav.consultation', 'Apply for Consultation')}
          </a>

          <div className="flex items-center gap-3 border-l border-white/20 pl-6 ml-2">
            <button onClick={() => i18n.changeLanguage('en')} className={`text-[10px] font-mono tracking-widest ${i18n.language === 'en' ? 'text-white' : 'text-cream-dim hover:text-white'} transition-colors`}>EN</button>
            <span className="text-white/20 text-xs">|</span>
            <button onClick={() => i18n.changeLanguage('nl')} className={`text-[10px] font-mono tracking-widest ${i18n.language === 'nl' ? 'text-white' : 'text-cream-dim hover:text-white'} transition-colors`}>NL</button>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8 z-50"
          aria-label="Menu"
        >
          <span className={`block h-px bg-white transition-all duration-500 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block h-px bg-white transition-all duration-500 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`block h-px bg-white transition-all duration-500 ${menuOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-5'}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-[#050505] z-40 transition-transform duration-700 ease-in-out md:hidden flex flex-col items-center justify-center ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className="text-white font-display text-3xl italic tracking-wide hover:text-crimson transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${idx * 100}ms` : '0ms' }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://www.instagram.com/ink.n.pain.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-3 border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-mono transition-all duration-300 active:bg-white active:text-black flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            {t('nav.consultation', 'Apply for Consultation')}
          </a>
          
          <div className="mt-6 flex items-center gap-4">
            <button onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }} className={`text-[11px] font-mono tracking-widest ${i18n.language === 'en' ? 'text-white' : 'text-cream-dim'} transition-colors`}>EN</button>
            <span className="text-white/20 text-xs">|</span>
            <button onClick={() => { i18n.changeLanguage('nl'); setMenuOpen(false); }} className={`text-[11px] font-mono tracking-widest ${i18n.language === 'nl' ? 'text-white' : 'text-cream-dim'} transition-colors`}>NL</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
