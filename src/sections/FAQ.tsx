import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'What does Zero Dawn Consulting do?',
    answer:
      'Zero Dawn Consulting is a Sydney-based studio that designs and builds websites and AI-powered workflow automation for Australian small and medium businesses. We work with trades, allied health, real estate, professional services and growing brands that want a digital presence that refuses to blend in.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'Every project is quoted individually after a short discovery conversation, because scope varies — a single-page brand site is a very different build to a multi-page site with automation behind it. You will always receive a clear, fixed quote before any work begins, with no obligation.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most websites go live within two to four weeks of kicking off. Timelines depend on how quickly content and feedback come together — we give you a realistic schedule up front and keep you updated at every stage of the build.',
  },
  {
    question: 'Where are you based, and do you work with clients remotely?',
    answer:
      'We are based in Sydney, Australia, and work with clients across the country. Most projects run entirely remotely — kick-off, live previews, feedback rounds and launch all happen online, so location is never a barrier.',
  },
  {
    question: 'What is AI workflow automation?',
    answer:
      'It means using AI tools to take repetitive admin off your plate — responding to enquiries, preparing quotes, chasing follow-ups and moving information between the systems you already use. We design automations around how your business actually runs, so you spend less time on admin and more on the work that pays.',
  },
  {
    question: 'Do you offer support after the website launches?',
    answer:
      'Yes. We do not disappear after launch — revisions, content updates and ongoing improvements can all be arranged. Your website is built on modern, reliable hosting and handed over properly, so you always own everything.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="label-style mb-6">COMMON QUESTIONS</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f5f0e8] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[#a8a29e] font-light max-w-xl mx-auto">
            Straight answers to the things people ask before working with us.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-[760px] mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="border-b border-[#262626]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-serif text-lg lg:text-xl text-[#f5f0e8] group-hover:text-[#c8963e] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    className={`shrink-0 text-[#c8963e] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#a8a29e] font-light leading-relaxed pb-6 pr-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
