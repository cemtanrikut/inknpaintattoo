import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function WhyUs() {
  const { t } = useTranslation()
  const ref = useRef(null)

  const features = [
    {
      num: '01',
      title: t('whyUs.f1_title'),
      description: t('whyUs.f1_desc')
    },
    {
      num: '02',
      title: t('whyUs.f2_title'),
      description: t('whyUs.f2_desc')
    },
    {
      num: '03',
      title: t('whyUs.f3_title'),
      description: t('whyUs.f3_desc')
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    ref.current?.querySelectorAll('.reveal-up, .reveal-left').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" ref={ref} className="py-32 md:py-48 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 reveal-up">
            <div className="sticky top-40">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">{t('whyUs.subtitle')}</span>
                <span className="block w-8 h-px bg-crimson" />
              </div>
              <h2 className="font-display text-white text-5xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                {t('whyUs.title1')} <br />
                <span className="italic text-cream-muted">{t('whyUs.title2')}</span>
              </h2>
              <p className="text-cream-muted leading-relaxed font-light text-sm md:text-base max-w-sm">
                {t('whyUs.description')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0 border-t border-hairline lg:border-t-0">
            {features.map((point) => (
              <div
                key={point.num}
                className="group reveal-left py-12 md:py-16 border-b border-hairline relative text-cream-muted hover:text-white transition-colors duration-700"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 md:items-start pl-4 md:pl-8 border-l border-transparent group-hover:border-crimson transition-colors duration-500">
                  <span className="text-crimson/60 font-mono text-sm tracking-widest">{point.num}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {point.title}
                    </h3>
                    <p className="text-sm md:text-base font-light leading-relaxed max-w-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
