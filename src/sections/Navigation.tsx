import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* Subtle gradient for text readability over any background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 to-transparent pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <nav className="flex items-center justify-between h-[80px]">
          {/* Logo - bigger and further left */}
          <a href="#" className="flex items-center -ml-2">
            <img
              src="/assets/logo-transparent.png"
              alt="Zero Dawn Design Studio"
              className="h-10 lg:h-12 w-auto"
            />
          </a>

          {/* Desktop Nav Links - larger font */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-[13px] lg:text-[14px] font-medium text-[#a8a29e] hover:text-[#f5f0e8] transition-colors duration-200 tracking-[0.12em] uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button - on the right */}
          <div className="hidden md:block">
            <a
              href="mailto:daniel@zerodawnconsulting.com"
              className="inline-flex items-center px-7 py-3 text-[12px] font-semibold tracking-[0.12em] uppercase border border-[#c8963e] text-[#c8963e] rounded-full hover:bg-[#c8963e]/10 transition-all duration-200"
            >
              START A PROJECT
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#f5f0e8] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#262626]/50">
          <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-base font-medium text-[#a8a29e] hover:text-[#f5f0e8] transition-colors duration-200 py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:daniel@zerodawnconsulting.com"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wider bg-[#c8963e] text-[#0a0a0a] rounded-full hover:bg-[#d4a04a] transition-all duration-200"
            >
              START A PROJECT
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
