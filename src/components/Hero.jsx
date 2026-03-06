import { useEffect } from 'react'

const HERO_BG = 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=2400&q=85&fit=crop'

export default function Hero() {
  useEffect(() => {
    // Immediate reveal trigger for hero elements
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-anim').forEach((el) => {
        el.classList.add('visible')
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
      {/* Background with vignette */}
      <div className="absolute inset-0 hero-anim reveal-scale">
        <img
          src={HERO_BG}
          alt="Tattoo artist detailing"
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* Layered gradients for a cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        
        {/* Deep red underglow */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[40vh] bg-crimson/10 blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="noise-overlay" />
      </div>

      {/* Editoral Typography Layout */}
      <div className="relative z-10 max-w-[90rem] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
        {/* Left Col: Main Title */}
        <div className="hero-anim reveal-up flex-1 flex flex-col items-start" style={{ transitionDelay: '0.2s' }}>
          
          {/* Availability Badge */}
          <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-[#050505]/50 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-slow shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-cream-dim text-[10px] tracking-[0.2em] uppercase font-mono mt-0.5">
              Books Open: Waitlist Available
            </span>
          </div>

          <div className="mb-8 w-full max-w-2xl px-4 md:px-0">
            <img 
              src="/logo.png" 
              alt="Ink 'n Pain Logo" 
              className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right Col: Intro Copy & CTAs */}
        <div className="hero-anim reveal-up md:w-[400px] flex flex-col gap-8 pb-4" style={{ transitionDelay: '0.4s' }}>
          <p className="text-cream-muted text-sm md:text-base leading-relaxed font-light">
            Utrecht's premier destination for custom tattoo art. 
            A private, architectural space dedicated to obsessive precision and permanent identity.
          </p>

          <div className="flex flex-col gap-4 w-full sm:w-max">
            <a
              href="https://www.instagram.com/ink.n.pain.tattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white text-black text-[11px] tracking-[0.2em] font-medium uppercase overflow-hidden text-center flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                Submit Project Inquiry
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-cream/90 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.86,0,0.07,1)]" />
            </a>

            <button
              onClick={() => scrollTo('#work')}
              className="px-8 py-4 border border-white/20 text-white text-[11px] tracking-[0.2em] font-medium uppercase hover:border-white/60 transition-colors duration-500 bg-[#050505]/50 backdrop-blur-md"
            >
              Explore the Archives
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
