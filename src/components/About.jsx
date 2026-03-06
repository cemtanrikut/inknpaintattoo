import { useEffect, useRef } from 'react'

const ABOUT_IMG_1 = '/about-1.jpg'
const ABOUT_IMG_2 = '/about-2.jpg'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    )
    ref.current?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-48 bg-[#030303] overflow-hidden">
      <div className="noise-overlay" />

      {/* Very faint vertical line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/5" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Text Content (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col pt-10">
            <div className="reveal-left flex items-center gap-4 mb-10">
              <span className="text-cream-dim text-[10px] tracking-[0.3em] uppercase font-mono">The Studio</span>
              <span className="block flex-1 h-px bg-white/10" />
            </div>

            <h2 className="reveal-up font-display text-white text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8" style={{ transitionDelay: '0.1s' }}>
              Where Skin <br />
              <span className="italic text-cream-muted font-light">Becomes Canvas.</span>
            </h2>

            <div className="reveal-up space-y-8" style={{ transitionDelay: '0.2s' }}>
              <p className="text-cream-muted leading-relaxed text-sm md:text-base font-light">
                Ink 'n Pain was established with a singular vision: to elevate tattooing from a transaction to a collaborative artistic process. Based in the historical center of Utrecht, we have built a sanctuary for architectural aesthetics and meticulous craftsmanship.
              </p>
              
              <p className="text-cream-muted leading-relaxed text-sm md:text-base font-light">
                We reject the idea of rushing. A tattoo is a permanent commitment to oneself. We provide an environment of absolute focus, executing visionary blackwork, fine line, and neo-traditional pieces for a discerning clientele.
              </p>

              {/* Minimal stats */}
              <div className="grid grid-cols-2 gap-8 pt-10 mt-10 border-t border-hairline">
                <div>
                  <p className="font-display text-white text-3xl mb-1">4.7</p>
                  <p className="text-cream-dim text-[10px] tracking-[0.2em] uppercase font-mono">Google Rating</p>
                </div>
                <div>
                  <p className="font-display text-white text-3xl mb-1">60<span className="text-crimson/80">+</span></p>
                  <p className="text-cream-dim text-[10px] tracking-[0.2em] uppercase font-mono">Verified Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Composition (Col 7-12) */}
          <div className="lg:col-span-6 lg:col-start-7 relative mt-16 lg:mt-0 flex flex-col items-end gap-8">
            {/* Main large image */}
            <div className="reveal-scale w-full md:w-[90%] editorial-img-container shadow-2xl z-10 aspect-[4/3]">
              <img 
                src={ABOUT_IMG_1} 
                alt="Studio exterior" 
                className="grayscale-[20%] contrast-125 object-cover"
              />
              <div className="absolute inset-0 bg-[#050505]/20 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Overlapping/offset smaller image */}
            <div className="reveal-up w-[85%] md:w-[75%] editorial-img-container shadow-2xl border border-white/5 z-20 -mt-20 md:-mt-32 mr-auto md:mr-0 md:ml-auto aspect-[16/9]" style={{ transitionDelay: '0.3s' }}>
              <img 
                src={ABOUT_IMG_2} 
                alt="Studio interior detail"
                className="grayscale-[30%] contrast-125 object-cover" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
