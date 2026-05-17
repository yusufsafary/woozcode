import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for woozcode. Free, Pro, and Enterprise plans available.',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'For individuals and small projects.',
    features: [
      'Up to 50K tokens/day compressed',
      'wooz compress and wooz context tools',
      'Balanced compression level',
      'Local daemon (no cloud)',
      'Community support',
    ],
    cta: 'Download for free',
    href: '/download',
    accent: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    tagline: 'For working developers and active teams.',
    features: [
      'Unlimited token compression',
      'All 5 woozcode tools',
      'All compression levels (incl. aggressive)',
      'Semantic cache (local)',
      'wooz diff and wooz batch',
      'Usage analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Pro trial',
    href: '#',
    accent: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    tagline: 'For teams with volume, compliance, and SLA requirements.',
    features: [
      'Everything in Pro',
      'Team-wide policy config',
      'Audit logs and compliance reports',
      'SSO and access controls',
      'Dedicated Slack channel',
      'Custom SLA',
      'On-premise support',
    ],
    cta: 'Contact sales',
    href: '/contact',
    accent: false,
  },
]

export default function PricingPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no token limits on the features you actually care about.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-7 border transition-all ${
                plan.accent
                  ? 'bg-accent border-accent shadow-xl shadow-accent/20 text-white'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {plan.accent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-white text-accent text-xs font-bold shadow-sm">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-3 ${plan.accent ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.name}
                </h2>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className={`text-4xl font-bold ${plan.accent ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${plan.accent ? 'text-white/60' : 'text-gray-400'}`}>
                    / {plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.accent ? 'text-white/70' : 'text-gray-500'}`}>{plan.tagline}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.accent ? 'text-white/80' : 'text-accent'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.accent ? 'text-white/85' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`flex items-center justify-center py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  plan.accent
                    ? 'bg-white text-accent hover:bg-gray-50'
                    : 'bg-accent text-white hover:bg-accent-600 shadow-sm shadow-accent/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Common questions</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Does woozcode ever see my prompts?',
                a: 'No. The entire compression pipeline runs locally. Your prompts, code, and API keys never leave your machine.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel your Pro subscription any time and you will retain access until the end of your billing period.',
              },
              {
                q: 'What counts as a token?',
                a: 'Standard OpenAI tokenization (cl100k_base). Woozcode shows both your original count and the compressed count in the dashboard.',
              },
              {
                q: 'Does it work with Claude, Mistral, or local models?',
                a: 'Yes. Woozcode works with any model that accepts a text prompt. The compression is model-agnostic.',
              },
            ].map((item) => (
              <details key={item.q} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  {item.q}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
