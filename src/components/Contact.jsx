import { useEffect, useRef } from 'react'

export default function Contact() {
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
    <section id="contact" ref={ref} className="py-32 md:py-48 bg-[#050505] relative border-b border-hairline overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Main Inquiry Column */}
          <div className="lg:col-span-6 reveal-up border-b lg:border-none border-hairline pb-16 lg:pb-0">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-cream-dim text-[10px] tracking-[0.3em] uppercase font-mono">Inquiries</span>
              <span className="block w-8 h-px bg-white/10" />
            </div>

            <h2 className="font-display text-white text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8">
              Book a <br />
              <span className="italic text-cream-muted font-light">Consultation.</span>
            </h2>

            <p className="text-cream-muted leading-relaxed font-light text-sm md:text-base max-w-sm mb-10">
              We operate primarily by appointment to ensure every client receives undivided architectural and artistic focus.
            </p>

            {/* Booking process added for business value */}
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex gap-4 items-start group">
                <span className="text-crimson/50 text-[10px] tracking-widest font-mono mt-0.5">01</span>
                <div>
                  <p className="text-white text-[11px] uppercase tracking-[0.15em] font-medium mb-1">Submit Inquiry</p>
                  <p className="text-cream-dim text-xs font-light">Send your concept, placement, and reference material via Instagram.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <span className="text-crimson/50 text-[10px] tracking-widest font-mono mt-0.5">02</span>
                <div>
                  <p className="text-white text-[11px] uppercase tracking-[0.15em] font-medium mb-1">Concept Review</p>
                  <p className="text-cream-dim text-xs font-light">Our artists review your request to ensure it aligns with our capability and style.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <span className="text-crimson/50 text-[10px] tracking-widest font-mono mt-0.5">03</span>
                <div>
                  <p className="text-white text-[11px] uppercase tracking-[0.15em] font-medium mb-1">Studio Session</p>
                  <p className="text-cream-dim text-xs font-light">A deposit secures your date. We finalize the design together in the studio.</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/ink.n.pain.tattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full md:w-auto md:min-w-[300px] px-8 py-5 border border-white/20 text-white text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <span>Start Application</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Logistics Box Column */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end pt-12 lg:pt-0">
            <div className="reveal-left p-10 md:p-14 bg-[#080808] border border-white/5 relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

              <h3 className="font-display text-white text-2xl mb-10">Studio Logistics</h3>

              <div className="flex flex-col gap-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-px bg-crimson/50 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-mono mb-2">Location</p>
                    <p className="text-cream-muted font-light leading-relaxed">
                      Vinkenburgstraat 16 <br />
                      3512 AB Utrecht <br />
                      The Netherlands
                    </p>
                    <p className="text-cream-dim text-[10px] uppercase tracking-widest font-mono mt-3">Coordinates: 52°05'32.6"N 5°07'07.2"E</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-px bg-white/10 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-mono mb-2">Direct Line</p>
                    <p className="text-cream-muted font-light">
                      <a href="tel:+31620973330" className="link-underline hover:text-white transition-colors">
                        +31 6 2097 3330
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-px bg-white/10 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-mono mb-2">Hours</p>
                    <table className="text-cream-muted font-light text-sm w-full max-w-[200px]">
                      <tbody>
                        <tr>
                          <td className="py-1">Wed – Sun</td>
                          <td className="text-right py-1">11:00 – 18:00</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-cream-dim">Mon & Tue</td>
                          <td className="text-right py-1 text-cream-dim">Closed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
