import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'daniel@zerodawnconsulting.com',
    href: 'mailto:daniel@zerodawnconsulting.com',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+61 422 196 311',
    href: 'tel:+61422196311',
  },
  {
    icon: MapPin,
    label: 'LOCATION',
    value: 'Suite 2 Lvl 3, 13-15 Wentworth Ave, Sydney, 2000',
    href: '#',
  },
]

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.cta-reveal')
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        {/* Fallback dark background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <video
          autoPlay={
            typeof window === 'undefined' ||
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          }
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-blossom.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/cta-ambient.mp4"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-32 lg:py-40 w-full">
        <div className="max-w-2xl mx-auto text-center">
          {/* Label */}
          <p className="cta-reveal label-style mb-6">LET'S TALK</p>

          {/* Headline */}
          <h2 className="cta-reveal font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f5f0e8] leading-[1.1] mb-6">
            Ready to build something extraordinary?
          </h2>

          {/* Subtitle */}
          <p className="cta-reveal text-[#a8a29e] font-light text-lg mb-10">
            A simple conversation is where it starts.
          </p>

          {/* CTA Button */}
          <div className="cta-reveal mb-16">
            <a
              href="mailto:daniel@zerodawnconsulting.com"
              className="inline-flex items-center px-10 py-4 bg-[#c8963e] text-[#0a0a0a] text-sm font-semibold tracking-wider rounded-full hover:bg-[#d4a04a] hover:scale-[1.02] transition-all duration-200"
            >
              START YOUR NEXT PROJECT
            </a>
          </div>

          {/* Contact Info Grid */}
          <div className="cta-reveal grid grid-cols-1 sm:grid-cols-3 gap-8">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full border border-[#262626] flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#c8963e]/50 group-hover:bg-[#c8963e]/5">
                    <Icon
                      size={22}
                      className="text-[#a8a29e] transition-colors duration-300 group-hover:text-[#c8963e]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-xs font-medium tracking-wider text-[#78716c] mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#a8a29e] font-light transition-colors duration-200 group-hover:text-[#f5f0e8]">
                    {item.value}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
