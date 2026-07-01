import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Monitor, Layers, Zap, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Monitor,
    title: 'Web Design',
    description:
      'Creating digital sites that are architectural stories: beautifully crafted, converting visitors into believers.',
    bullets: [
      'Strategic Structure',
      'Responsive Craftsmanship',
      'Performance-Optimized Code',
      'SEO-Conscious Architecture',
    ],
  },
  {
    icon: Layers,
    title: 'UX/UI Design',
    description:
      'The intersection of empathy and engineering. Crafting intuitive interfaces by mapping user journeys and validating through research.',
    bullets: [
      'Human-Centered Methodology',
      'Intuitive First Touch',
      'Research-Validated Decisions',
      'Seamless Interaction',
    ],
  },
  {
    icon: Zap,
    title: 'Workflow Automations',
    description:
      'Invisible systems that eliminate repetitive work, connecting tools to give teams time back.',
    bullets: [
      'Lead Nurturing',
      'Client Onboarding',
      'Project Handoffs',
      'Reporting & Analytics',
    ],
  },
]

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
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
      id="services"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <p className="label-style mb-12 lg:mb-16">WHAT WE DO</p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group bg-[#111111] border border-[#262626] rounded-xl p-10 lg:p-12 transition-all duration-400 hover:border-[#c8963e]/30 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl border border-[#262626] flex items-center justify-center mb-8 transition-colors duration-300 group-hover:border-[#c8963e]/40">
                  <Icon
                    size={24}
                    className="text-[#c8963e]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl lg:text-[30px] font-normal text-[#f5f0e8] mb-5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#a8a29e] font-light leading-relaxed mb-8 text-[15px]">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-10">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-sm text-[#a8a29e]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8963e] flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <a
                  href="#services-detail"
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#c8963e] hover:text-[#d4a04a] transition-colors duration-200 group/link"
                >
                  LEARN MORE
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
