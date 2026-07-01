import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Deep immersion into your business, users, and competitive landscape.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Iterative creation with continuous feedback and refinement.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Flawless execution with pixel-perfect attention to detail.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deployment, testing, and ongoing optimization.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = stepsRef.current?.querySelectorAll('.process-step')
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
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
      id="process"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="label-style mb-6">OUR PROCESS</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f5f0e8]">
            How we work
          </h2>
        </div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative">
          {/* Horizontal Line - Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-[#262626]" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="process-step text-center relative"
              >
                {/* Number */}
                <p className="text-sm font-medium text-[#c8963e] mb-4">
                  {step.number}
                </p>

                {/* Dot */}
                <div className="hidden lg:flex justify-center mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#c8963e] relative z-10" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl lg:text-[28px] font-normal text-[#f5f0e8] mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#a8a29e] font-light leading-relaxed text-sm max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
