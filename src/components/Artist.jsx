import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Artist() {
  const { t } = useTranslation()
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
    <section id="artist" ref={ref} className="relative py-32 md:py-48 bg-[#050505] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image */}
          <div className="reveal-scale relative aspect-[3/4] md:aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
            <img 
              src="/artist.jpg" 
              alt="The Artist" 
              className="w-full h-full object-cover grayscale-[40%] contrast-125 border border-white/5"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <div className="reveal-left flex items-center gap-4 mb-8">
              <span className="text-cream-dim text-[10px] tracking-[0.3em] uppercase font-mono">{t('artist.subtitle', 'The Artist')}</span>
              <span className="block w-12 h-px bg-white/10" />
            </div>

            <h2 className="reveal-up font-display text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
              {t('artist.title_part1', 'Meet Your')} <br />
              <span className="italic text-cream-muted font-light">{t('artist.title_part2', 'Tattoo Artist.')}</span>
            </h2>

            <div className="reveal-up space-y-6" style={{ transitionDelay: '0.1s' }}>
              <p className="text-cream-muted leading-relaxed text-sm md:text-base font-light">
                {t('artist.p1', "With years of experience blending modern techniques and classical artistry, I focus on creating pieces that flow naturally with the body's contours.")}
              </p>
              
              <p className="text-cream-muted leading-relaxed text-sm md:text-base font-light">
                {t('artist.p2', "My primary focus in the studio is blackwork, fine line, and ornamental designs. Every session is treated as a collaborative process where your ideas and my technical expertise come together to craft something truly permanent and unique.")}
              </p>

              <div className="pt-8 mt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-mono uppercase tracking-widest text-[10px] mb-2">{t('artist.exp_title', 'Experience')}</h4>
                  <p className="text-cream-muted text-sm font-light">{t('artist.exp_value', '8+ Years')}</p>
                </div>
                <div>
                  <h4 className="text-white font-mono uppercase tracking-widest text-[10px] mb-2">{t('artist.specialty_title', 'Specialty')}</h4>
                  <p className="text-cream-muted text-sm font-light">{t('artist.specialty_value', 'Blackwork & Fine Line')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
