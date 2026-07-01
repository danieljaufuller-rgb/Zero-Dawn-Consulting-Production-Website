import { Linkedin, Instagram } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/zero_dawn_consulting/',
    label: 'Instagram',
  },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#262626]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 items-start">
          {/* Logo & Tagline */}
          <div>
            <img
              src="/assets/logo-transparent.png"
              alt="Zero Dawn Design Studio"
              className="h-8 lg:h-9 w-auto mb-4"
            />
            <p className="text-[#78716c] text-[15px] font-light">Consulting</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-[#a8a29e] font-light hover:text-[#c8963e] transition-colors duration-200 text-[15px]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Address */}
          <div className="md:text-right">
            <p className="text-[#a8a29e] font-light text-[15px] leading-[1.8]">
              Suite 2 Lvl 3
              <br />
              13-15 Wentworth Ave
              <br />
              Sydney, 2000
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-14 pt-8 border-t border-[#262626]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    social.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="w-11 h-11 rounded-full border border-[#262626] flex items-center justify-center text-[#78716c] hover:border-[#c8963e] hover:text-[#c8963e] hover:scale-110 transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-[#78716c] text-[13px] tracking-wider">
            &copy; 2025 ZERO DAWN CONSULTING
          </p>
        </div>
      </div>
    </footer>
  )
}
