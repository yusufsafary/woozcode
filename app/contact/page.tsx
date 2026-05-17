'use client'

export default function ContactPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Contact</span>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Get in touch</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Have a question, bug report, or enterprise inquiry? Reach us through any of the channels below.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v16l4-4h16a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
              ),
              label: 'Discord',
              desc: 'Join our community for real-time help and discussion.',
              cta: 'Open Discord',
              href: 'https://discord.com',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
              label: 'Twitter / X',
              desc: 'Follow for updates, tips, and release announcements.',
              cta: 'Follow @woozcode',
              href: 'https://x.com',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              label: 'Email',
              desc: 'For enterprise, billing, or private inquiries.',
              cta: 'hello@woozcode.dev',
              href: 'mailto:hello@woozcode.dev',
            },
          ].map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {ch.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-accent transition-colors">{ch.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{ch.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                {ch.cta}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="rounded-2xl bg-gray-950 p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Enterprise inquiries</h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
            Need custom SLA, on-premise support, team-wide policy config, or volume pricing? Let's talk.
          </p>
          <a
            href="mailto:enterprise@woozcode.dev"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-600 active:scale-95 transition-all shadow-md shadow-accent/30"
          >
            Contact enterprise team
          </a>
        </div>
      </div>
    </div>
  )
}
