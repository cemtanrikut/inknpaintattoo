import { useEffect, useRef } from 'react'

const VALUE_POINTS = [
  {
    num: '01',
    title: 'Custom Authorship',
    description:
      'We do not replicate from flash sheets. Your design is authored from scratch, sculpted to fit your anatomy, personality, and exact specifications.',
  },
  {
    num: '02',
    title: 'Absolute Hygiene',
    description:
      'A sterile, calm, and clinical environment masquerading as an art gallery. Single-use equipment and uncompromising health standards are our baseline.',
  },
  {
    num: '03',
    title: 'The Utrecht Standard',
    description:
      'Rooted deeply in Utrecht’s artistic core, we have spent a decade proving ourselves through the healing arcs of thousands of tattoos and loyal clientele.',
  },
  {
    num: '04',
    title: 'Private Consultation',
    description:
      'We dedicate unbroken focus to every client. No walk-in chaos during your session. Just you, the artist, and the quiet ritual of tattooing.',
  },
]

export default function WhyUs() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal-up, .reveal-left').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" ref={ref} className="py-32 md:py-48 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Section Heading */}
          <div className="lg:col-span-5 reveal-up">
            <div className="sticky top-40">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-crimson/80 text-[10px] tracking-[0.3em] uppercase font-mono">Philosophy</span>
                <span className="block w-8 h-px bg-crimson" />
              </div>
              <h2 className="font-display text-white text-5xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                Ethos & <br /> Execution.
              </h2>
              <p className="text-cream-muted leading-relaxed font-light text-sm md:text-base max-w-sm">
                We believe a tattoo studio should operate with the precision of a clinic but feel like a private atelier. Here is what defines our process.
              </p>
            </div>
          </div>

          {/* List of Values */}
          <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0 border-t border-hairline lg:border-t-0">
            {VALUE_POINTS.map((point, i) => (
              <div
                key={point.num}
                className="group reveal-left py-12 md:py-16 border-b border-hairline relative text-cream-muted hover:text-white transition-colors duration-700"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Number Watermark Effect */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[15%] hidden md:block">
                  <span className="font-display text-[120px] font-black text-white/[0.02] tracking-tighter pointer-events-none transition-all duration-700 group-hover:text-white/[0.04] group-hover:-translate-y-2">
                    {point.num}
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="text-white text-[10px] tracking-widest font-mono opacity-40">({point.num})</span>
                    <h3 className="font-display text-2xl font-medium tracking-wide">
                      {point.title}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="leading-relaxed font-light text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity duration-700">
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
