import { useEffect, useRef } from 'react'

export default function InstagramCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.2 }
    )
    ref.current?.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-32 md:py-48 bg-[#030303] relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Editorial geometric background layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-crimson/5 blur-[120px] rounded-[100%] mix-blend-screen" />
        
        {/* Very thin architectural grid lines */}
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute right-[20%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute top-[50%] left-0 right-0 h-px bg-white/5" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6">
        <div className="reveal-up">
          <p className="text-cream-dim text-[10px] tracking-[0.3em] font-mono uppercase mb-8">
            The Digital Archive
          </p>
          
          <h2 className="font-display text-white text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
            Follow the <span className="italic font-light text-cream-muted block mt-2">Evolution of Ink.</span>
          </h2>
          
          <p className="text-cream-muted text-sm md:text-base font-light leading-relaxed mb-12 max-w-lg mx-auto">
            Witness our latest pieces, healed results, and the silent rhythm of the studio. 
            Connect with us daily on the grid.
          </p>

          <a
            href="https://www.instagram.com/ink.n.pain.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-6 px-10 py-5 bg-white text-black text-[11px] tracking-[0.2em] uppercase font-bold overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Follow @ink.n.pain.tattoo
            </span>
            <div className="absolute inset-0 bg-cream/80 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.86,0,0.07,1)]" />
          </a>
        </div>
      </div>
    </section>
  )
}
