import { useEffect, useRef } from 'react'

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
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal-up, .reveal-scale').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={ref} className="py-24 md:py-48 bg-[#050505]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        
        {/* Header Setup */}
        <div className="reveal-up mb-20 md:mb-32 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-crimson" />
            <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">Portfolio</span>
          </div>
          <h2 className="font-display text-white text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
            Archives of Ink. <br />
            <span className="italic text-cream-muted">A Curated Body of Work.</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Grid */}
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
              {/* Very minimal hover overlay */}
              <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/40 transition-colors duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer Text & CTA */}
        <div className="reveal-up mt-24 flex flex-col items-center text-center">
          <p className="text-cream-dim text-xs md:text-sm font-light max-w-xl mb-10 italic">
            "To maintain our standard of quality, we take on a limited number of new projects each month. We prioritize concepts that align with our artistic direction."
          </p>

          <a
            href="https://www.instagram.com/ink.n.pain.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-transparent border border-white/20 text-white text-[11px] tracking-[0.2em] font-medium uppercase hover:border-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              View Complete Archive
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
