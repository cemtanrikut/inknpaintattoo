import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(0)
  const ref = useRef(null)

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') }
  ]

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
    <section ref={ref} className="py-32 md:py-48 bg-[#030303]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="reveal-up mb-24 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-crimson" />
            <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">{t('faq.subtitle')}</span>
            <span className="block w-8 h-px bg-crimson" />
          </div>
          <h2 className="font-display text-white text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
            {t('faq.title1')}<br/>
            <span className="italic text-cream-muted">{t('faq.title2')}</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal-up border-b border-white/10" style={{ transitionDelay: `${i * 0.1}s` }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <h3 className="text-white text-lg md:text-xl font-light group-hover:text-cream-dim transition-colors pr-8">
                  {faq.q}
                </h3>
                <span className="text-crimson font-mono text-xl font-light relative">
                  <span className={`block transition-transform duration-500 ${open === i ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>+</span>
                  <span className={`block absolute inset-0 transition-transform duration-500 ${open === i ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>−</span>
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-700 ease-in-out ${open === i ? 'max-h-64 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-cream-dim font-light text-sm md:text-base leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
