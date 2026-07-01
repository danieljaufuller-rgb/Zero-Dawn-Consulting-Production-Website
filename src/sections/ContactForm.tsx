import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    // Create mailto link with form data
    const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )
    const mailtoLink = `mailto:daniel@zerodawnconsulting.com?subject=${subject}&body=${body}`

    // Open email client
    window.location.href = mailtoLink

    // Show success state
    setTimeout(() => {
      setFormState('success')
    }, 500)
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
