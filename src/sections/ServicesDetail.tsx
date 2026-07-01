import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Website',
    highlight: 'Transform your website',
    description: 'Get a high-performing website to represent your brand.',
    bullets: [
      'Custom Website Design',
      'Webflow / CMS Development',
      'Website Redesign',
      'Landing Pages',
      'SEO & Technical Optimization',
    ],
    image: '/assets/service-website.png',
    imageAlt: 'Website design service',
    reverse: false,
  },
  {
    number: '02',
    title: 'Automations',
    highlight: 'Streamline your operations',
    description:
      'Eliminate repetitive tasks and let your business run itself while you focus on what matters.',
    bullets: [
      'Workflow Analysis & Mapping',
      'Zapier / Make.com Integrations',
      'CRM Automation Setup',
      'Email Sequence Automation',
      'Custom API Integrations',
    ],
    image: '/assets/service-automation.png',
    imageAlt: 'Workflow automation service',
    reverse: true,
  },
]

export default function ServicesDetail() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current?.querySelectorAll('.service-block')
      blocks?.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services-detail"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <p className="label-style mb-16 lg:mb-24">SERVICES IN DETAIL</p>

        <div className="space-y-24 lg:space-y-32">
          {services.map((service) => (
            <div
              key={service.number}
              className={`service-block grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                service.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div className={service.reverse ? 'lg:order-2' : 'lg:order-1'}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-full bg-[#c8963e]/10 border border-[#c8963e]/30 flex items-center justify-center text-sm font-medium text-[#c8963e]">
                    {service.number}
                  </span>
                </div>

                <h2 className="font-serif text-4xl lg:text-5xl xl:text-[56px] font-normal text-[#f5f0e8] mb-6">
                  {service.title}
                </h2>

                <p className="text-lg leading-relaxed mb-8">
                  <span className="bg-[#c8963e]/20 text-[#f5f0e8] px-2 py-0.5 rounded">
                    {service.highlight}
                  </span>{' '}
                  <span className="text-[#a8a29e] font-light">
                    {service.description}
                  </span>
                </p>

                <ul className="space-y-3">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-[#a8a29e] font-light"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8963e] flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div
                className={`${
                  service.reverse ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="rounded-xl overflow-hidden border border-[#262626] group">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
