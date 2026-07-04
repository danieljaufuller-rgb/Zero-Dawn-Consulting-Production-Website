import { useEffect } from 'react'
import gsap from 'gsap'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import ServicesOverview from './sections/ServicesOverview'
import ServicesDetail from './sections/ServicesDetail'
import Philosophy from './sections/Philosophy'
import Process from './sections/Process'
import ProjectsCarousel from './sections/ProjectsCarousel'
import FAQ from './sections/FAQ'
import CTASection from './sections/CTASection'
import ContactForm from './sections/ContactForm'
import Footer from './sections/Footer'

export default function App() {
  useEffect(() => {
    // Collapse all GSAP tweens to near-instant for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(100)
    }
  }, [])

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ServicesOverview />
        <ServicesDetail />
        <Philosophy />
        <Process />
        <ProjectsCarousel />
        <FAQ />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
