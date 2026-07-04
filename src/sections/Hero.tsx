import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // 'loading' = show loading bar, 'playing' = video visible, 'fallback' = show still image
  const [videoStatus, setVideoStatus] = useState<'loading' | 'playing' | 'fallback'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'fallback'
      : 'loading'
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video || videoStatus === 'fallback') return

    const onPlaying = () => setVideoStatus('playing')
    const onError = () => setVideoStatus('fallback')
    video.addEventListener('playing', onPlaying)
    video.addEventListener('error', onError)

    // If autoplay is blocked or the network stalls, fall back to the still image
    const fallbackTimer = setTimeout(() => {
      setVideoStatus((s) => (s === 'loading' ? 'fallback' : s))
    }, 6000)

    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', onError)
      clearTimeout(fallbackTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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

  const marqueeText = 'CREATE • ELEVATE • TRANSFORM • '

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -top-[10%] -bottom-[10%]">
        {/* Still-image fallback (reduced motion, autoplay blocked, or video error) */}
        {videoStatus === 'fallback' && (
          <img
            src="/assets/hero-blossom.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {videoStatus !== 'fallback' && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src="/assets/hero-ambient.mp4"
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/40 to-[#0a0a0a]/85" />
        {/* Loading overlay: dark canvas + slim gold bar until the video plays */}
        <div
          className={`absolute inset-0 bg-[#0a0a0a] flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
            videoStatus === 'loading' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="hero-loading-bar" role="presentation">
            <span className="hero-loading-bar-fill" />
          </div>
        </div>
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
