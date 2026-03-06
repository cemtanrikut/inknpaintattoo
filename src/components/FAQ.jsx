import { useState, useRef, useEffect } from 'react'

const FAQS = [
  {
    question: "How do I book an appointment?",
    answer: "We primarily handle bookings through our Instagram DM. Click the 'Apply for Consultation' button to send us your concept, reference images, and placement ideas. We review requests weekly and select projects that best align with our artistic direction."
  },
  {
    question: "Do you accept walk-ins?",
    answer: "No. Ink 'n Pain operates strictly as a private, appointment-only sanctuary. This ensures every artist can maintain absolute focus and provide an uninterrupted, premium experience for the client they are working with that day."
  },
  {
    question: "How is pricing determined?",
    answer: "Pricing is based on the scale, complexity, and placement of the piece, not hourly rates. Once we review your concept and determine it's a good fit, we will provide a comprehensive project quote before any deposit is required."
  },
  {
    question: "Can I bring guests to my session?",
    answer: "To maintain the focused, tranquil atmosphere of the studio, we kindly request that clients arrive alone. If you require an exception for medical or personal reasons, please discuss this with us during the booking process."
  },
  {
    question: "How should I prepare for my appointment?",
    answer: "Ensure you are well-rested, fully hydrated, and have eaten a substantial meal beforehand. Avoid alcohol for 24 hours prior to your session. Wear comfortable, dark clothing that allows easy access to the area being tattooed."
  }
]

export default function FAQ() {
  const ref = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={ref} className="py-32 md:py-48 bg-[#050505] relative border-b border-hairline overflow-hidden">
      <div className="max-w-[50rem] mx-auto px-6 md:px-12">
        
        <div className="reveal-up text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block w-8 h-[1px] bg-white/20" />
            <span className="text-cream-dim text-[10px] tracking-[0.3em] uppercase font-mono">
              Client Briefing
            </span>
            <span className="block w-8 h-[1px] bg-white/20" />
          </div>
          <h2 className="font-display text-white text-4xl md:text-5xl font-light tracking-tight mb-6">
            Frequently Asked <span className="italic text-cream-muted">Questions</span>
          </h2>
        </div>

        <div className="reveal-up flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className={`border-b ${isOpen ? 'border-white/20' : 'border-white/5'} transition-colors duration-500`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-base md:text-lg font-light tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-cream-muted group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  
                  <div className="relative w-4 h-4 ml-6 flex-shrink-0">
                    <span className={`absolute top-1/2 left-0 w-full h-[1px] bg-white transition-transform duration-500 ${isOpen ? 'rotate-180 bg-white/50' : ''}`} />
                    <span className={`absolute top-1/2 left-0 w-full h-[1px] bg-white transition-transform duration-500 ${isOpen ? 'rotate-180 bg-white/50' : 'rotate-90'}`} />
                  </div>
                </button>

                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-cream-dim leading-relaxed font-light text-sm md:text-base pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
