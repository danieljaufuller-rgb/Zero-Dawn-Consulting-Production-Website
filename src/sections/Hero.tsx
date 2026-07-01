import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content fade-in on load
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
      )

      // Parallax on video
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const marqueeText = 'CREATE \u2022 ELEVATE \u2022 TRANSFORM \u2022 '

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-blossom.jpg"
          className="w-full h-full object-cover"
          src="/assets/hero-ambient.mp4"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/40 to-[#0a0a0a]/85" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20"
      >
        <p className="label-style mb-6">ZERO DAWN CONSULTING</p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-normal text-[#f5f0e8] leading-[1.05] tracking-tight mb-8">
          We build
          <br />
          digital
          <br />
          experiences
        </h1>
        <p className="text-lg sm:text-xl text-[#a8a29e] font-light leading-relaxed max-w-xl mx-auto">
          Web design, UX/UI, and workflow automation for businesses that refuse
          to blend in.
        </p>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden z-10">
        <div className="marquee-track whitespace-nowrap">
          <span className="inline-block text-6xl sm:text-7xl lg:text-8xl font-serif text-[#f5f0e8]/[0.04] tracking-tight">
            {marqueeText.repeat(8)}
          </span>
        </div>
      </div>
    </section>
  )
}
