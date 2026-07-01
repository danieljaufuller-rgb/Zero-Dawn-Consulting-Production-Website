import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={textRef} className="lg:col-span-3">
            <p className="label-style mb-8">OUR PHILOSOPHY</p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1] mb-10">
              We believe in
              <br />
              the power of less
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-[#a8a29e] font-light leading-relaxed text-lg">
                Most digital experiences are cluttered, frustrating, and
                forgettable. We see the pain of mediocrity. We exist to create
                the cure. Every pixel, interaction, and automation exists to
                maximize human impact.
              </p>

              <p className="text-[#a8a29e] font-light leading-relaxed text-lg">
                Stripping away complexity to reveal pure intent. We design with
                purpose — where beauty meets function, and clarity drives
                conversion.
              </p>
            </div>

            <div className="flex items-center gap-4 text-[#f5f0e8] font-medium">
              <span>Clarity</span>
              <span className="text-[#c8963e]">&bull;</span>
              <span>Precision</span>
              <span className="text-[#c8963e]">&bull;</span>
              <span>Impact</span>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-[#262626]">
              <img
                src="/assets/cherry-blossom.jpg"
                alt="Cherry blossom on marble"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
