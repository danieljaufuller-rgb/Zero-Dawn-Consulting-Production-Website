import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Origins Coffee Roasters',
    description: 'Artisan coffee brand with rich digital experience',
    image: '/assets/project-origins-real.jpg',
    url: 'https://origins-coffee-roasters.pages.dev/',
  },
  {
    name: 'YMAX Skills',
    description: 'EdTech platform with dynamic content',
    image: '/assets/project-ymax-real.jpg',
    url: 'https://ymax-skills-site.pages.dev/',
  },
  {
    name: 'Ventara',
    description: 'Technology procurement, simplified',
    image: '/assets/project-ventara-real.jpg',
    url: 'https://ventara.au/',
  },
  {
    name: 'Penrith Electrical Services',
    description: 'Local trade, professional presence',
    image: '/assets/project-penrith-real.jpg',
    url: 'https://penrith-electrical-services.pages.dev',
  },
  {
    name: 'Zoe Isaackson Law Firm',
    description: 'Legal expertise, elegant presentation',
    image: '/assets/project-zoe-real.jpg',
    url: 'https://zoe-isaackson-law-firm.pages.dev/',
  },
  {
    name: 'Ventara Concept',
    description: 'Dark-themed innovation showcase',
    image: '/assets/project-ventara-black-real.jpg',
    url: 'https://ventara-website-black.pages.dev/',
  },
  {
    name: 'Tribe41 Gym',
    description: 'Fitness brand with bold energy',
    image: '/assets/project-tribe41-real.jpg',
    url: 'https://www.tribe41northmead.com/',
  },
  {
    name: 'Isaiah Jude Accounting',
    description: 'Financial services, trusted design',
    image: '/assets/project-isaiah-real.jpg',
    url: 'https://isaiah-jude-accounting-firm.pages.dev/',
  },
]

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % projects.length) + projects.length) % projects.length
      setActiveIndex(newIndex)
    },
    []
  )

  const goNext = useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  // Auto-play
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length)
      }, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused])

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const carousel = sectionRef.current?.querySelector('.carousel-container')
      if (carousel) {
        gsap.fromTo(
          carousel,
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
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + projects.length + Math.floor(projects.length / 2)) % projects.length) - Math.floor(projects.length / 2)

    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)',
      }
    } else if (Math.abs(normalizedDiff) === 1) {
      return {
        transform: `translateX(${normalizedDiff * 55}%) scale(0.82)`,
        opacity: 0.5,
        zIndex: 5,
        filter: 'blur(1px)',
      }
    } else if (Math.abs(normalizedDiff) === 2) {
      return {
        transform: `translateX(${normalizedDiff * 50}%) scale(0.7)`,
        opacity: 0.2,
        zIndex: 1,
        filter: 'blur(3px)',
      }
    } else {
      return {
        transform: `translateX(${normalizedDiff * 45}%) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(4px)',
      }
    }
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="label-style mb-6">SELECTED WORK</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f5f0e8] mb-6">
            Featured Projects
          </h2>
          <p className="text-[#a8a29e] font-light max-w-xl mx-auto">
            A curated showcase of our capabilities, transforming business
            challenges into design solutions.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="carousel-container relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Container */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute w-[85%] sm:w-[70%] lg:w-[50%] max-w-[600px] carousel-transition"
                style={getCardStyle(index)}
              >
                <div className="bg-[#111111] border border-[#262626] rounded-xl overflow-hidden group hover:border-[#c8963e]/30 transition-all duration-400">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl lg:text-2xl font-normal text-[#f5f0e8] mb-2">
                      {project.name}
                    </h3>
                    <p className="text-[#a8a29e] font-light text-sm mb-4">
                      {project.description}
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#c8963e] hover:text-[#d4a04a] transition-colors duration-200 group/link"
                    >
                      VIEW LIVE SITE
                      <ExternalLink
                        size={12}
                        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-[#262626] flex items-center justify-center text-[#a8a29e] hover:border-[#c8963e] hover:text-[#c8963e] transition-all duration-200"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-[#c8963e]'
                      : 'w-2 bg-[#262626] hover:bg-[#78716c]'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-[#262626] flex items-center justify-center text-[#a8a29e] hover:border-[#c8963e] hover:text-[#c8963e] transition-all duration-200"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
