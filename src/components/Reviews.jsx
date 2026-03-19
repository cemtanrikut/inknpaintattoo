import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Reviews() {
  const { t } = useTranslation()
  const ref = useRef(null)

  // Fetch the full list of dynamic reviews directly from translations
  // Using an empty array fallback guarantees the layout doesn't crash if translations are missing
  const reviewsList = t('reviews.list', { returnObjects: true })
  const reviews = Array.isArray(reviewsList) ? reviewsList : []

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
    <section ref={ref} className="py-24 bg-[#050505]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="reveal-up mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-8 h-px bg-crimson" />
            <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">{t('reviews.subtitle')}</span>
            <span className="block w-8 h-px bg-crimson" />
          </div>
          <h2 className="font-display text-white text-3xl md:text-5xl font-light tracking-tight leading-[1.1] mb-6">
            {t('reviews.title1')} <br />
            <span className="italic text-cream-muted">{t('reviews.title2')}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review, i) => (
            <div key={i} className="reveal-up bg-[#0a0a0a] p-8 md:p-10 border border-white/5" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="flex text-crimson mb-6">
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream-dim text-sm md:text-base font-light italic mb-8 leading-relaxed">
                "{review.text}"
              </p>
              <p className="text-white text-[11px] uppercase tracking-widest font-mono">
                — {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
