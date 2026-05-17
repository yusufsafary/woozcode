'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="ml-3 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium text-gray-300 hover:text-white transition-all active:scale-95 border border-white/10 flex-shrink-0"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Up to 60% fewer tokens',
    desc: 'Intelligent prompt compression removes redundant context before it hits the API, slashing your bill without touching output quality.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Runs entirely local',
    desc: 'No data leaves your machine. The processing layer lives in your environment, so your code, prompts, and secrets stay private.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Works with any model',
    desc: 'Compatible with OpenAI, Anthropic, Mistral, and any OpenAI-compatible endpoint. Drop it in and it just works.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Token usage dashboard',
    desc: 'See exactly how much you saved per session. Track trends over time and share reports with your team.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    title: 'Context-aware trimming',
    desc: 'Woozcode understands code structure, so it trims comments, imports, and boilerplate rather than meaningful logic.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Zero-latency overhead',
    desc: 'Processing happens in microseconds on your CPU. You will never notice it is there, until you see your invoice.',
  },
]

const tools = [
  { name: 'wooz compress', badge: 'Core', desc: 'Strips redundant tokens from any prompt before sending.' },
  { name: 'wooz context', badge: 'Core', desc: 'Smart file context builder, picks only what the model needs.' },
  { name: 'wooz cache', badge: 'Pro', desc: 'Local semantic cache, skip repeat calls entirely.' },
  { name: 'wooz diff', badge: 'Pro', desc: 'Sends only changed lines, not full file content.' },
  { name: 'wooz batch', badge: 'Pro', desc: 'Queue and batch requests to hit lower pricing tiers.' },
]

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const installCmd = 'npm install -g woozcode'

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/4 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-semibold tracking-wide mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              v1.0 now available
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6 animate-fade-up">
              The plugin that cuts your{' '}
              <span className="text-accent">AI costs</span>
              {' '}in half.
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed mb-10 animate-fade-up animate-delay-100">
              Install with one command to start saving. Smarter tools. Runs fully on your machine.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up animate-delay-200">
              <div className="flex items-center w-full sm:w-auto bg-gray-950 rounded-xl px-4 py-3 border border-white/5 shadow-lg min-w-0">
                <span className="text-gray-500 font-mono text-sm select-none mr-2">$</span>
                <code className="font-mono text-sm text-white flex-1 truncate">{installCmd}</code>
                <CopyButton text={installCmd} />
              </div>

              <Link
                href="/docs"
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                Read the docs
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 animate-fade-up animate-delay-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">60%</div>
                <div className="text-xs text-gray-500 mt-0.5">token reduction</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0ms</div>
                <div className="text-xs text-gray-500 mt-0.5">added latency</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-500 mt-0.5">local processing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token reduction */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">How it works</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Fewer tokens. Same results.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Woozcode intercepts requests before they leave your machine, removes waste, and forwards a leaner prompt. The model never knows the difference.
              </p>
            </div>
          </FadeSection>

          <FadeSection>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">Without woozcode</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 leading-relaxed space-y-1">
                  <div>// Full file context (1,240 tokens)</div>
                  <div className="text-gray-400">import React from &apos;react&apos;</div>
                  <div className="text-gray-400">import &#123; useState &#125; from &apos;react&apos;</div>
                  <div className="text-gray-400">// ... 800 lines of context</div>
                  <div className="text-gray-400">// ... duplicate imports</div>
                  <div className="text-gray-400">// ... unused functions</div>
                  <div className="text-gray-400">// ... verbose comments</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-red-100 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full w-full" />
                  </div>
                  <span className="text-xs text-red-600 font-semibold">1,240 tokens</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-accent/20 p-6 shadow-sm shadow-accent/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">With woozcode</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 leading-relaxed space-y-1">
                  <div>// Compressed context (480 tokens)</div>
                  <div>import &#123; useState &#125; from &apos;react&apos;</div>
                  <div>// ... only relevant functions</div>
                  <div>// ... deduplicated imports</div>
                  <div className="text-accent">// woozcode: 61% reduction applied</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-accent h-1.5 rounded-full w-[39%]" />
                  </div>
                  <span className="text-xs text-accent font-semibold">480 tokens</span>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">Features</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Built for the local-first stack
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Everything processes on your machine. No cloud dependency. No data exposure. Just results.
              </p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeSection key={f.title} className={`animate-delay-${i * 100}`}>
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 transition-all group bg-white">
                  <div className="w-10 h-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Smart tools */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">Smart tools</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                A toolkit, not a black box
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Each woozcode tool is a precise instrument. Use them together or in isolation.
              </p>
            </div>
          </FadeSection>

          <div className="max-w-2xl mx-auto space-y-2">
            {tools.map((tool, i) => (
              <FadeSection key={tool.name}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-all group cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className="text-sm font-mono text-white font-semibold">{tool.name}</code>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${tool.badge === 'Pro' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-gray-400'}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{tool.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <FadeSection>
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Start saving tokens today
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              Free to start. No account required. Works with your existing setup in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-600 active:scale-95 transition-all shadow-lg shadow-accent/25"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download for free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all"
              >
                View pricing
              </Link>
            </div>
          </div>
        </FadeSection>
      </section>
    </div>
  )
}
