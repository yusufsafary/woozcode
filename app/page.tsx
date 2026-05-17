'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

/* ── helpers ─────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className="ml-3 px-2.5 py-1 rounded text-[11px] font-medium text-gray-400 hover:text-white border border-white/15 hover:border-white/30 transition-all active:scale-95 flex-shrink-0">
      {copied ? '✓' : 'Copy'}
    </button>
  )
}

function useCountUp(target: number, active: boolean, duration = 800) {
  const [val, setVal] = useState(target)
  useEffect(() => {
    if (!active) { setVal(target); return }
    const start = performance.now()
    const from = Math.round(target * 2.5)
    const raf = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(from - (from - target) * ease))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [target, active, duration])
  return val
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.06 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  )
}

/* ── token types ─────────────────────────────────────────── */
type Tok = { t: string; v: string }
const kw = (v: string): Tok => ({ t: 'kw', v })
const id = (v: string): Tok => ({ t: 'id', v })
const st = (v: string): Tok => ({ t: 'str', v })
const cm = (v: string): Tok => ({ t: 'cm', v })
const pl = (v: string): Tok => ({ t: 'pl', v })

const COLOR: Record<string, string> = {
  kw: 'text-violet-400',
  id: 'text-blue-300',
  str: 'text-emerald-400',
  cm: 'text-gray-600 italic',
  pl: 'text-gray-200',
}

function CodeLine({ line, delay = 0 }: { line: Tok[]; delay?: number }) {
  return (
    <div className="flex flex-wrap text-[11px] font-mono leading-[1.75] animate-fade-in opacity-0 whitespace-pre"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      {line.map((tok, i) => <span key={i} className={COLOR[tok.t] ?? 'text-gray-200'}>{tok.v}</span>)}
    </div>
  )
}

/* ── samples ─────────────────────────────────────────────── */
const SAMPLES = [
  {
    label: 'React component', lang: 'tsx',
    inputTokens: 1240, outputTokens: 487,
    input: [
      [cm('// UserCard — renders user profile + edit form')],
      [cm('// Used in: Dashboard, Profile, Settings, Sidebar')],
      [kw('import'), pl(' React, { '), id('useState'), pl(', '), id('useEffect'), pl(', '), id('useCallback'), pl(',')],
      [pl('  '), id('useRef'), pl(', '), id('useMemo'), pl(" } from 'react'")],
      [kw('import'), pl(' PropTypes '), kw('from'), pl(' '), st("'prop-types'")],
      [kw('import'), pl(' { connect } '), kw('from'), pl(' '), st("'react-redux'")],
      [kw('import'), pl(' { bindActionCreators } '), kw('from'), pl(' '), st("'redux'")],
      [pl('')],
      [kw('const'), pl(' '), id('UserCard'), pl(' = ({ user, onUpdate, loading, error }) => {')],
      [pl('  '), kw('const'), pl(' [isEditing, setIsEditing] = '), id('useState'), pl('(false)')],
      [pl('  '), kw('const'), pl(' mounted = '), id('useRef'), pl('(true)')],
      [cm('  // Handle form submission, validate, then call API')],
      [pl('  '), kw('const'), pl(' '), id('handleSubmit'), pl(' = '), id('useCallback'), pl('(async (e) => {')],
      [pl('    e.preventDefault(); if (!mounted.current) return')],
      [pl('    await onUpdate(formData); setIsEditing(false)')],
      [pl('  }, [formData, onUpdate])')],
      [pl('  if (loading) return <div className='), st('"skeleton"'), pl(' />')],
      [pl('  return <div className='), st('"user-card"'), pl('><img src={user.avatar} /></div>')],
      [pl('}')],
      [kw('export default'), pl(' connect(null, null)(UserCard)')],
    ],
    output: [
      [cm('// wooz: −753 tokens · stripped 4 unused imports, stale comments')],
      [kw('import'), pl(' { '), id('useState'), pl(', '), id('useCallback'), pl(', '), id('useRef'), pl(" } from 'react'")],
      [pl('')],
      [kw('const'), pl(' '), id('UserCard'), pl(' = ({ user, onUpdate, loading, error }) => {')],
      [pl('  '), kw('const'), pl(' [isEditing, setIsEditing] = '), id('useState'), pl('(false)')],
      [pl('  '), kw('const'), pl(' mounted = '), id('useRef'), pl('(true)')],
      [pl('  '), kw('const'), pl(' '), id('handleSubmit'), pl(' = '), id('useCallback'), pl('(async (e) => {')],
      [pl('    e.preventDefault(); if (!mounted.current) return')],
      [pl('    await onUpdate(formData); setIsEditing(false)')],
      [pl('  }, [formData, onUpdate])')],
      [pl('  if (loading) return <div className='), st('"skeleton"'), pl(' />')],
      [pl('  return <div className='), st('"user-card"'), pl('><img src={user.avatar} /></div>')],
      [pl('}')],
      [kw('export default'), pl(' UserCard')],
    ],
  },
  {
    label: 'System prompt', lang: 'txt',
    inputTokens: 890, outputTokens: 312,
    input: [
      [cm('# SYSTEM INSTRUCTIONS FOR AI ASSISTANT')],
      [cm('# Version: 2.4.1 | Updated: 2024-01-10')],
      [pl('')],
      [pl('You are a helpful, harmless, and honest AI assistant.')],
      [pl('You should always be polite and respectful to users.')],
      [pl('You should never be rude or disrespectful to users.')],
      [pl('You should always try your best to help users.')],
      [pl('You should always be helpful and provide good answers.')],
      [pl('You should always be honest and truthful in responses.')],
      [pl("If you do not know the answer, say that you do not know.")],
      [pl('Never make up information or hallucinate facts.')],
      [pl('If you are unsure, say that you are unsure.')],
      [pl('Always provide accurate and reliable information.')],
      [pl('')],
      [kw('TASK:'), pl(' Answer user questions about TypeScript.')],
      [kw('FORMAT:'), pl(' Concise answers with code examples.')],
      [kw('STYLE:'), pl(' Use markdown. Keep responses under 500 words.')],
    ],
    output: [
      [cm('// wooz: −578 tokens · collapsed 9 redundant policy lines')],
      [pl('')],
      [pl("You are a helpful, honest AI assistant.")],
      [pl("Never fabricate. Say \"I don't know\" when unsure.")],
      [pl('')],
      [kw('TASK:'), pl(' Answer TypeScript programming questions.')],
      [kw('FORMAT:'), pl(' Markdown code blocks, ≤500 words.')],
    ],
  },
  {
    label: 'Python function', lang: 'py',
    inputTokens: 760, outputTokens: 298,
    input: [
      [kw('import'), pl(' os, sys, json, logging')],
      [kw('from'), pl(' pathlib '), kw('import'), pl(' Path')],
      [pl('')],
      [cm('# Utility function for reading config files')],
      [cm('# Returns parsed JSON or None on error')],
      [cm('# Used by: main.py, setup.py, cli.py')],
      [kw('def'), pl(' '), id('read_config'), pl('(filepath: str) -> dict | None:')],
      [st('  """Read and parse a JSON config file.')],
      [st('  Args: filepath (str): Path to config file.')],
      [st('  Returns: dict if valid JSON, None otherwise."""')],
      [pl('  '), kw('try'), pl(':')],
      [pl('    path = Path(filepath)')],
      [pl('    if not path.exists(): return None')],
      [pl('    '), kw('with'), pl(' open(path, '), st("'r'"), pl(') as f:')],
      [pl('      return json.load(f)')],
      [pl('  '), kw('except'), pl(' Exception as e:')],
      [pl('    logging.error(f"Config read error: {e}")')],
      [pl('    '), kw('return'), pl(' None')],
    ],
    output: [
      [cm('# wooz: −462 tokens · removed unused imports, docstring')],
      [kw('import'), pl(' json, logging')],
      [kw('from'), pl(' pathlib '), kw('import'), pl(' Path')],
      [pl('')],
      [kw('def'), pl(' '), id('read_config'), pl('(filepath: str) -> dict | None:')],
      [pl('  '), kw('try'), pl(':')],
      [pl('    p = Path(filepath)')],
      [pl('    return json.load(open(p)) if p.exists() else None')],
      [pl('  '), kw('except'), pl(' Exception as e:')],
      [pl('    logging.error(e); '), kw('return'), pl(' None')],
    ],
  },
]

/* ── CompressorDemo ──────────────────────────────────────── */
function CompressorDemo() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [progress, setProgress] = useState(0)
  const sample = SAMPLES[idx]
  const savings = sample.inputTokens - sample.outputTokens
  const pct = Math.round((savings / sample.inputTokens) * 100)
  const displayedTokens = useCountUp(phase === 'done' ? sample.outputTokens : sample.inputTokens, phase === 'done')

  const run = useCallback(() => {
    if (phase === 'running') return
    setPhase('running'); setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 16 + 7
      setProgress(Math.min(p, 100))
      if (p >= 100) { clearInterval(iv); setPhase('done') }
    }, 55)
  }, [phase])

  const reset = (i: number) => { setIdx(i); setPhase('idle'); setProgress(0) }

  return (
    <div className="w-full">
      {/* Tab row */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {SAMPLES.map((s, i) => (
          <button key={i} onClick={() => reset(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              i === idx
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'
            }`}>
            {s.label}
          </button>
        ))}
        <span className={`ml-auto text-[11px] font-mono ${phase === 'done' ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
          {phase === 'idle' && 'ready'}
          {phase === 'running' && 'compressing…'}
          {phase === 'done' && `−${pct}% tokens`}
        </span>
      </div>

      {/* Panels — dark terminals */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Input */}
        <div className="rounded-xl bg-gray-950 border border-gray-800 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-[11px] text-gray-600 font-mono ml-2">input.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-[11px] font-mono font-semibold text-red-400">{sample.inputTokens.toLocaleString()}</span>
              <span className="text-[10px] text-gray-700"> tok</span>
            </div>
          </div>
          <div className="p-4 min-h-[200px] max-h-[260px] overflow-y-auto">
            {sample.input.map((line, i) => (
              <CodeLine key={`${idx}-in-${i}`} line={line} delay={i * 16} />
            ))}
          </div>
        </div>

        {/* Output */}
        <div className={`rounded-xl border overflow-hidden transition-all duration-400 ${
          phase !== 'idle' ? 'bg-gray-950 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b ${phase !== 'idle' ? 'border-gray-800' : 'border-gray-200'}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className={`text-[11px] font-mono ml-2 ${phase !== 'idle' ? 'text-gray-600' : 'text-gray-400'}`}>output.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1">
              <span className={`text-[11px] font-mono font-semibold transition-colors ${phase === 'done' ? 'text-emerald-400' : 'text-gray-600'}`}>
                {displayedTokens.toLocaleString()}
              </span>
              <span className={`text-[10px] ${phase !== 'idle' ? 'text-gray-700' : 'text-gray-400'}`}> tok</span>
            </div>
          </div>

          <div className="p-4 min-h-[200px] max-h-[260px] overflow-y-auto">
            {phase === 'idle' && (
              <div className="flex flex-col items-center justify-center h-[160px] text-center gap-2">
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs text-gray-400">Press compress to run</p>
              </div>
            )}
            {phase === 'running' && (
              <div className="flex flex-col items-center justify-center h-[160px] gap-5">
                <div className="w-full max-w-[200px]">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1.5 font-mono">
                    <span>Analyzing…</span><span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="space-y-1 text-left w-full max-w-[200px]">
                  {progress > 20 && <p className="text-[10px] text-gray-600 font-mono animate-fade-in">✓ Scanning imports…</p>}
                  {progress > 48 && <p className="text-[10px] text-gray-600 font-mono animate-fade-in">✓ Removing redundant context…</p>}
                  {progress > 75 && <p className="text-[10px] text-gray-600 font-mono animate-fade-in">✓ Deduplicating tokens…</p>}
                  {progress > 90 && <p className="text-[10px] text-gray-300 font-mono animate-fade-in">⠋ Finalizing…</p>}
                </div>
              </div>
            )}
            {phase === 'done' && (
              <div>
                {sample.output.map((line, i) => (
                  <CodeLine key={`${idx}-out-${i}`} line={line} delay={i * 26} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-3 flex items-center gap-4 flex-wrap">
        <button
          onClick={phase === 'done' ? () => reset(idx) : run}
          disabled={phase === 'running'}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 border ${
            phase === 'done'
              ? 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              : 'bg-gray-900 text-white border-gray-900 hover:bg-black disabled:opacity-50'
          }`}>
          {phase === 'done' ? (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Reset</>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{phase === 'running' ? 'Compressing…' : 'wooz compress'}</>
          )}
        </button>
        {phase === 'done' && (
          <div className="flex items-center gap-4 animate-fade-in">
            <span className="text-sm font-medium text-gray-900">{savings.toLocaleString()} tokens saved</span>
            <span className="text-gray-400 text-xs">≈ ${(savings * 0.00002).toFixed(4)} per call</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── features & tools ────────────────────────────────────── */
const features = [
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Up to 60% fewer tokens', desc: 'Strips redundant context before it hits the API. Same output — lower invoice.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Fully local', desc: 'Zero cloud. Your code, prompts, and API keys never leave your machine.' },
  { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: 'Any model', desc: 'OpenAI, Anthropic, Mistral, or any OpenAI-compatible endpoint. Drop in and go.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Usage dashboard', desc: 'Track savings per session. Export reports. Show your team the receipts.' },
  { icon: 'M4 6h16M4 12h16m-7 6h7', title: 'Context-aware trimming', desc: 'Understands code structure — removes comments, unused imports, and boilerplate.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Zero-latency overhead', desc: 'Processing runs in microseconds. You\'ll never feel it — just see it on the invoice.' },
]

const tools = [
  { name: 'wooz compress', badge: 'Core', desc: 'Strips redundant tokens from any prompt before sending.' },
  { name: 'wooz context',  badge: 'Core', desc: 'Smart context builder — picks only what the model needs.' },
  { name: 'wooz cache',    badge: 'Pro',  desc: 'Local semantic cache — skip repeat API calls entirely.' },
  { name: 'wooz diff',     badge: 'Pro',  desc: 'Sends only changed lines, not the full file content.' },
  { name: 'wooz batch',    badge: 'Pro',  desc: 'Queue and batch requests to hit lower pricing tiers.' },
]

/* ── page ────────────────────────────────────────────────── */
export default function Home() {
  const installCmd = 'npm install -g woozcode'

  return (
    <div className="pt-14">

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5">

          {/* Top: explanation */}
          <div className="pt-14 pb-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-gray-200 text-gray-500 text-[11px] font-medium tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              v1.0 — now available
            </div>

            <h1 className="font-display text-[2.6rem] sm:text-5xl font-bold text-gray-950 leading-[1.05] tracking-tight mb-4">
              Cut your AI costs<br />in half.
            </h1>

            <p className="text-gray-500 text-base sm:text-[17px] leading-relaxed mb-7 max-w-sm">
              Smarter context. Fewer tokens. Runs 100% on your machine — install once, save on every call.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/download"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black active:scale-95 transition-all">
                Download free
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
              <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
                Read the docs
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-6 mb-6 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center rounded-lg border border-gray-200 bg-gray-950 px-4 py-2">
              <span className="text-gray-600 font-mono text-sm select-none mr-2">$</span>
              <code className="font-mono text-sm text-gray-200">{installCmd}</code>
              <CopyButton text={installCmd} />
            </div>
            <div className="flex items-center gap-6 text-center">
              {[{ n: '60%', l: 'fewer tokens' }, { n: '0ms', l: 'overhead' }, { n: 'Free', l: 'to start' }].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-sm font-bold text-gray-900">{s.n}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Emulator — right below explanation */}
          <div className="pb-10">
            <CompressorDemo />
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">How it works</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">Fewer tokens. Same results.</h2>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">Woozcode intercepts prompts before the API call, strips waste, and forwards a leaner request.</p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
              {[
                { label: 'Without woozcode', tag: 'Before', tokens: '1,240 tok', barW: 'w-full', barC: 'bg-gray-300', lines: ["// Full context · 1,240 tokens", "import React, { useState, useEffect,", "  useCallback, useRef, useMemo } from 'react'", "import PropTypes from 'prop-types'", "// ... unused imports · stale comments", "// ... 800 more lines of boilerplate"] },
                { label: 'With woozcode', tag: 'After', tokens: '487 tok', barW: 'w-[39%]', barC: 'bg-gray-900', lines: ["// wooz: 61% reduction applied", "import { useState, useRef } from 'react'", '', "// ... only relevant context kept", "// ... all redundant tokens stripped"] },
              ].map((p) => (
                <div key={p.label} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-700">{p.label}</span>
                    <span className="text-[10px] font-mono text-gray-400 font-medium">{p.tokens}</span>
                  </div>
                  <div className="rounded-lg bg-gray-950 p-3.5 font-mono text-[10px] text-gray-500 leading-loose space-y-0 mb-3">
                    {p.lines.map((l, i) => <div key={i} className={i === 0 ? 'text-gray-600' : [4,5].includes(i) ? 'text-gray-700' : ''}>{l || <br />}</div>)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-0.5">
                      <div className={`${p.barC} h-0.5 rounded-full ${p.barW}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══ FEATURES ═══════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Features</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">Built for the local-first stack</h2>
              <p className="text-gray-500 text-sm leading-relaxed">No cloud. No exposure. Every byte stays on your machine.</p>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {features.map((f) => (
              <FadeSection key={f.title}>
                <div className="p-5 bg-white hover:bg-gray-50 transition-colors group h-full">
                  <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center mb-4 group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-200">
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLI TOOLS ══════════════════════════════════════ */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-2">CLI Tools</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Five tools. One install.</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Each solves exactly one problem. Together they cover every angle of token waste.</p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="max-w-xl space-y-px">
              {tools.map((t, i) => (
                <div key={t.name} className="flex items-center gap-4 px-4 py-3.5 rounded-lg hover:bg-white/[0.04] transition-colors group">
                  <span className="text-[11px] font-mono text-gray-700 w-4 flex-shrink-0">{i + 1}</span>
                  <code className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">{t.name}</code>
                  <p className="text-[12px] text-gray-600 flex-1 min-w-0">{t.desc}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${t.badge === 'Pro' ? 'border-white/15 text-gray-400' : 'border-white/8 text-gray-600'}`}>{t.badge}</span>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══ STATS ══════════════════════════════════════════ */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ n: '300+', l: 'beta developers' }, { n: '18', l: 'countries' }, { n: '$0', l: 'cloud dependency' }, { n: '<60s', l: 'to install' }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-gray-900">{s.n}</div>
                <div className="text-[11px] text-gray-400 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-950">
        <FadeSection>
          <div className="max-w-lg mx-auto px-5 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Ready to cut your AI bill?</h2>
            <p className="text-gray-500 text-[15px] mb-10 leading-relaxed">Free to install. No account. No cloud. Just leaner prompts and lower invoices.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/download"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 active:scale-95 transition-all">
                Download free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center px-7 py-3 rounded-lg border border-white/15 text-gray-300 font-medium text-sm hover:border-white/30 hover:text-white active:scale-95 transition-all">
                View pricing
              </Link>
            </div>
          </div>
        </FadeSection>
      </section>

    </div>
  )
}
