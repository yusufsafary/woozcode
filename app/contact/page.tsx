'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-sm px-5">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message received</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thanks for reaching out. We usually reply within one business day.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
            className="text-sm text-accent hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Contact</span>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Get in touch</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Have a question, bug report, or enterprise inquiry? We read every message and reply within one business day.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello@woozcode.dev',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                  label: 'GitHub',
                  value: 'github.com/yusufsafary/woozcode',
                  href: 'https://github.com/yusufsafary/woozcode',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/8 text-accent flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</div>
                    {'href' in item ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-700">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                For bug reports, please include your OS, woozcode version (<code className="font-mono bg-white px-1 rounded text-gray-700">wooz --version</code>), and steps to reproduce.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all bg-white"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General question</option>
                  <option value="bug">Bug report</option>
                  <option value="enterprise">Enterprise inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-600 active:scale-[0.99] transition-all disabled:opacity-70 shadow-sm shadow-accent/25"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
