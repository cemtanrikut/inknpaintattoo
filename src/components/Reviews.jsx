import { useEffect, useRef, useState } from 'react'

const REVIEWS = [
  {
    text: "Deze shop heeft 2 nieuwe vaste klanten erbij gekregen... Het voelde alsof we op visite waren en we hadden gelijk een gevoel van thuis!",
    author: "LUC",
    lang: "nl"
  },
  {
    text: "I walked in to ask for a fine line tattoo and he did it the same day, the tattoo is 1:1 to what i showed.",
    author: "RALUCA GEORGESCU",
    lang: "en" 
  },
  {
    text: "Vroeger had men een lijfarts. Maar Ink 'n Pain begint nu wel een lijfinker te worden..",
    author: "ALEX KES",
    lang: "nl"
  }
]

export default function Reviews() {
  const ref = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % REVIEWS.length)
    }, 6000) // Change review every 6 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="reviews" ref={ref} className="py-32 md:py-48 bg-[#030303] relative border-y border-hairline overflow-hidden">
      {/* Abstract dark red gradient background for warmth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#050505] to-crimson/[0.02] pointer-events-none" />

      <div className="max-w-[70rem] mx-auto px-6 md:px-12 text-center relative z-10">
        
        <div className="reveal-up mb-12 flex justify-center w-full" style={{ transitionDelay: '0.1s' }}>
          <div className="flex items-center gap-6 opacity-30">
            {/* Super minimal star representation */}
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1l3 6.5L20 8l-5.5 5.5L16 20l-6-3.5L4 20l1.5-6.5L0 8l7-1.5L10 1z"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="reveal-up relative min-h-[280px] md:min-h-[220px] flex items-center justify-center">
          {/* Huge quotation mark watermark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 pointer-events-none">
            <span className="font-display text-[200px] text-white/5 leading-none">"</span>
          </div>

          {REVIEWS.map((review, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                idx === activeIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className={`font-display text-white ${review.lang === 'nl' && review.text.length > 100 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-5xl lg:text-6xl'} font-light italic leading-tight md:leading-[1.15] mb-8 relative z-10`}>
                {review.text}
              </p>
              
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-white text-[11px] tracking-[0.2em] uppercase font-mono mb-1">
                  — {review.author}
                </span>
                <span className="text-cream-dim text-[10px] tracking-widest uppercase font-mono">
                  Verified Client • Utrecht
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal-up flex flex-col items-center gap-4 mt-20" style={{ transitionDelay: '0.3s' }}>
           <span className="text-[10px] tracking-widest font-mono uppercase bg-white/5 opacity-80 px-4 py-2 border border-white/10">Google 4.7 Rating</span>
           <a href="https://www.google.com/search?q=Ink+%27n+Pain+Tattoo+Utrecht" target="_blank" rel="noopener noreferrer" className="link-underline text-cream-dim hover:text-white text-[10px] tracking-widest uppercase font-mono opacity-60">
             Read all 60 Verified Reviews
           </a>
        </div>

      </div>
    </section>
  )
}
