import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Free form delivery via web3forms.com — submissions arrive at the email
// the access key was created with (daniel@zerodawnconsulting.com).
const WEB3FORMS_ACCESS_KEY = '29c6828b-de61-41b5-9936-0b297743f9ad'

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const formCard = sectionRef.current?.querySelector('.form-card')
      if (formCard) {
        gsap.fromTo(
          formCard,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New website enquiry from ${formData.name}`,
          from_name: 'Zero Dawn Consulting Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })
      const data = await response.json()
      setFormState(data.success ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (formState === 'success') {
    return (
      <section ref={sectionRef} className="py-20 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="form-card max-w-[640px] mx-auto bg-[#111111] border border-[#262626] rounded-xl p-10 lg:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#c8963e]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-[#c8963e]" />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f0e8] mb-3">
              Message Sent
            </h3>
            <p className="text-[#a8a29e] font-light">
              Thank you for reaching out. We'll get back to you within 24
              hours.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-20 bg-[#111111]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="form-card max-w-[640px] mx-auto bg-[#111111] border border-[#262626] rounded-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl lg:text-3xl text-[#f5f0e8] mb-2">
              Send us a message
            </h3>
            <p className="text-[#a8a29e] font-light text-sm">
              Fill in your details and we'll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot spam trap — hidden from real visitors */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#78716c] uppercase tracking-wider mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3.5 text-[#f5f0e8] placeholder-[#78716c] font-light focus:outline-none focus:border-[#c8963e] focus:ring-1 focus:ring-[#c8963e]/30 transition-all duration-200"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#78716c] uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3.5 text-[#f5f0e8] placeholder-[#78716c] font-light focus:outline-none focus:border-[#c8963e] focus:ring-1 focus:ring-[#c8963e]/30 transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-[#78716c] uppercase tracking-wider mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3.5 text-[#f5f0e8] placeholder-[#78716c] font-light focus:outline-none focus:border-[#c8963e] focus:ring-1 focus:ring-[#c8963e]/30 transition-all duration-200"
                placeholder="+61 XXX XXX XXX"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-[#78716c] uppercase tracking-wider mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3.5 text-[#f5f0e8] placeholder-[#78716c] font-light focus:outline-none focus:border-[#c8963e] focus:ring-1 focus:ring-[#c8963e]/30 transition-all duration-200 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Error message */}
            {formState === 'error' && (
              <p className="text-sm font-light text-[#d4a04a] text-center">
                Something went wrong sending your message. Please email us
                directly at{' '}
                <a
                  href="mailto:daniel@zerodawnconsulting.com"
                  className="underline hover:text-[#c8963e]"
                >
                  daniel@zerodawnconsulting.com
                </a>
                .
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#c8963e] text-[#0a0a0a] text-sm font-semibold tracking-wider rounded-full hover:bg-[#d4a04a] hover:scale-[1.01] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {formState === 'submitting' ? (
                'SENDING...'
              ) : (
                <>
                  SEND MESSAGE
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
