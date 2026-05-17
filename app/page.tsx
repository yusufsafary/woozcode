'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

/* ── tiny helpers ──────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="ml-3 px-2.5 py-1 rounded-md bg-white/8 hover:bg-white/18 text-xs font-medium text-gray-400 hover:text-white transition-all active:scale-95 border border-white/10 flex-shrink-0">
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function useCountUp(target: number, active: boolean, duration = 850) {
  const [val, setVal] = useState(target)
  useEffect(() => {
    if (!active) { setVal(target); return }
    const start = performance.now()
    const from = Math.round(target * 2.55)
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
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.07 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

/* ── token types & CodeLine ────────────────────────────── */
type Tok = { t: string; v: string }

const tokenColor: Record<string, string> = {
  kw:  'text-violet-400 font-medium',
  id:  'text-blue-300',
  str: 'text-emerald-400',
  cm:  'text-gray-500 italic',
  pl:  'text-gray-200',
  op:  'text-pink-400',
  num: 'text-amber-300',
}

function CodeLine({ line, delay = 0 }: { line: Tok[]; delay?: number }) {
  return (
    <div
      className="flex flex-wrap text-[11px] sm:text-xs font-mono leading-[1.7] animate-fade-in opacity-0 whitespace-pre"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {line.map((tok, i) => (
        <span key={i} className={tokenColor[tok.t] ?? 'text-gray-200'}>{tok.v}</span>
      ))}
    </div>
  )
}

/* ── samples data — each entry is Tok[] = one visual line ─ */
const kw = (v: string): Tok => ({ t: 'kw', v })
const id = (v: string): Tok => ({ t: 'id', v })
const st = (v: string): Tok => ({ t: 'str', v })
const cm = (v: string): Tok => ({ t: 'cm', v })
const pl = (v: string): Tok => ({ t: 'pl', v })

const SAMPLES = [
  {
    label: 'React component',
    lang: 'tsx',
    inputTokens: 1240,
    outputTokens: 487,
    input: [
      [cm('// UserCard — renders user profile + edit form')],
      [cm('// Used in: Dashboard, Profile, Settings, Sidebar')],
      [cm('// Last updated: 2024-01-15 by @devteam')],
      [kw('import'), pl(' React, { '), id('useState'), pl(', '), id('useEffect'), pl(',')],
      [pl('  '), id('useCallback'), pl(', '), id('useRef'), pl(', '), id('useMemo'), pl(` } from 'react'`)],
      [kw('import'), pl(' PropTypes '), kw('from'), pl(' '), st("'prop-types'")],
      [kw('import'), pl(' { connect } '), kw('from'), pl(' '), st("'react-redux'")],
      [kw('import'), pl(' { bindActionCreators } '), kw('from'), pl(' '), st("'redux'")],
      [pl('')],
      [kw('const'), pl(' '), id('UserCard'), pl(' = ({ user, onUpdate, loading, error }) => {')],
      [pl('  '), kw('const'), pl(' [isEditing, setIsEditing] = '), id('useState'), pl('(false)')],
      [pl('  '), kw('const'), pl(' [formData, setFormData] = '), id('useState'), pl('({})')],
      [pl('  '), kw('const'), pl(' mounted = '), id('useRef'), pl('(true)')],
      [cm('  // Handle form submission, validate, then call API')],
      [pl('  '), kw('const'), pl(' '), id('handleSubmit'), pl(' = '), id('useCallback'), pl('(async (e) => {')],
      [pl('    e.preventDefault()')],
      [pl('    if (!mounted.current) return')],
      [pl('    await onUpdate(formData); setIsEditing(false)')],
      [pl('  }, [formData, onUpdate])')],
      [pl('  if (loading) return <div className='), st('"skeleton"'), pl(' />')],
      [pl('  return <div className='), st('"user-card"'), pl('><img src={user.avatar} /></div>')],
      [pl('}')],
      [kw('export default'), pl(' connect(null, null)(UserCard)')],
    ],
    output: [
      [cm('// wooz: −753 tokens · stripped 4 unused imports, stale comments')],
      [kw('import'), pl(' { '), id('useState'), pl(', '), id('useCallback'), pl(', '), id('useRef'), pl(` } from 'react'`)],
      [pl('')],
      [kw('const'), pl(' '), id('UserCard'), pl(' = ({ user, onUpdate, loading, error }) => {')],
      [pl('  '), kw('const'), pl(' [isEditing, setIsEditing] = '), id('useState'), pl('(false)')],
      [pl('  '), kw('const'), pl(' mounted = '), id('useRef'), pl('(true)')],
      [pl('  '), kw('const'), pl(' '), id('handleSubmit'), pl(' = '), id('useCallback'), pl('(async (e) => {')],
      [pl('    e.preventDefault()')],
      [pl('    if (!mounted.current) return')],
      [pl('    await onUpdate(formData); setIsEditing(false)')],
      [pl('  }, [formData, onUpdate])')],
      [pl('  if (loading) return <div className='), st('"skeleton"'), pl(' />')],
      [pl('  return <div className='), st('"user-card"'), pl('><img src={user.avatar} /></div>')],
      [pl('}')],
      [kw('export default'), pl(' UserCard')],
    ],
  },
  {
    label: 'System prompt',
    lang: 'txt',
    inputTokens: 890,
    outputTokens: 312,
    input: [
      [cm('# SYSTEM INSTRUCTIONS FOR AI ASSISTANT')],
      [cm('# Version: 2.4.1 | Updated: 2024-01-10')],
      [cm('# DO NOT MODIFY THIS SECTION')],
      [pl('')],
      [pl('You are a helpful, harmless, and honest AI assistant.')],
      [pl('You should always be polite and respectful to users.')],
      [pl('You should never be rude or disrespectful to users.')],
      [pl('You should always try your best to help users.')],
      [pl('You should always be helpful and provide good answers.')],
      [pl('You should always be honest and truthful in your responses.')],
      [pl("If you do not know the answer, say that you do not know.")],
      [pl('Never make up information or hallucinate facts.')],
      [pl('If you are unsure, say that you are unsure about the answer.')],
      [pl('Always provide accurate and reliable information.')],
      [pl('')],
      [kw('TASK:'), pl(' Answer user questions about TypeScript programming.')],
      [kw('FORMAT:'), pl(' Respond with concise, accurate answers and code examples.')],
      [kw('STYLE:'), pl(' Use markdown for code. Keep responses under 500 words.')],
    ],
    output: [
      [cm("// wooz: −578 tokens · collapsed 9 redundant policy lines")],
      [pl('')],
      [pl("You are a helpful, honest AI assistant.")],
      [pl("Never fabricate information. Say \"I don't know\" when unsure.")],
      [pl('')],
      [kw('TASK:'), pl(' Answer TypeScript programming questions.')],
      [kw('FORMAT:'), pl(' Concise answers with markdown code blocks, ≤500 words.')],
    ],
  },
  {
    label: 'Python function',
    lang: 'py',
    inputTokens: 760,
    outputTokens: 298,
    input: [
      [kw('import'), pl(' os')],
      [kw('import'), pl(' sys')],
      [kw('import'), pl(' json')],
      [kw('import'), pl(' logging')],
      [kw('from'), pl(' pathlib '), kw('import'), pl(' Path')],
      [pl('')],
      [cm('# Utility function for reading config files')],
      [cm('# Returns parsed JSON or None on error')],
      [cm('# Used by: main.py, setup.py, cli.py')],
      [kw('def'), pl(' '), id('read_config'), pl('(filepath: str) -> dict | None:')],
      [st('  """Read and parse a JSON config file.')],
      [st('  Args: filepath (str): Path to config file.')],
      [st('  Returns: dict if valid JSON, None otherwise.')],
      [st('  Raises: nothing, all errors caught internally."""')],
      [pl('  '), kw('try'), pl(':')],
      [pl('    path = Path(filepath)')],
      [pl('    if not path.exists(): return None')],
      [pl('    '), kw('with'), pl(' open(path, '), st("'r'"), pl(') as f:')],
      [pl('      return json.load(f)')],
      [pl('  '), kw('except'), pl(' Exception as e:')],
      [pl('    logging.error(f"Config read error: {e}")'), ],
      [pl('    '), kw('return'), pl(' None')],
    ],
    output: [
      [cm('# wooz: −462 tokens · removed 4 unused imports, verbose docstring')],
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

/* ── CompressorDemo ─────────────────────────────────────── */
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
      {/* Tab + status row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {SAMPLES.map((s, i) => (
          <button key={i} onClick={() => reset(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              i === idx
                ? 'bg-accent text-white shadow-sm shadow-accent/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className={`ml-auto text-[11px] font-mono transition-colors ${
          phase === 'done' ? 'text-accent' : 'text-gray-600'
        }`}>
          {phase === 'idle' && 'ready'}
          {phase === 'running' && 'compressing…'}
          {phase === 'done' && `−${pct}% tokens`}
        </span>
      </div>

      {/* Panels */}
      <div className="grid md:grid-cols-2 gap-2.5">
        {/* Input */}
        <div className="rounded-xl bg-ink-950/80 border border-white/8 overflow-hidden">
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/8">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-[11px] text-gray-500 font-mono ml-2">input.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-[11px] font-mono font-semibold text-red-400">{sample.inputTokens.toLocaleString()}</span>
              <span className="text-[10px] text-gray-600">tok</span>
            </div>
          </div>
          <div className="p-3.5 space-y-0 min-h-[220px] max-h-[280px] overflow-y-auto">
            {sample.input.map((line, i) => (
              <CodeLine key={`${idx}-in-${i}`} line={line} delay={i * 18} />
            ))}
          </div>
        </div>

        {/* Output */}
        <div className={`rounded-xl border overflow-hidden transition-all duration-500 ${
          phase !== 'idle'
            ? 'bg-ink-950/80 border-accent/35 shadow-lg shadow-accent/12'
            : 'bg-white/[0.02] border-white/5'
        }`}>
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/8">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <span className="text-[11px] text-gray-500 font-mono ml-2">output.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1">
              <span className={`text-[11px] font-mono font-semibold transition-colors ${phase === 'done' ? 'text-accent' : 'text-gray-700'}`}>
                {displayedTokens.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-600">tok</span>
            </div>
          </div>

          <div className="p-3.5 min-h-[220px] max-h-[280px] overflow-y-auto">
            {phase === 'idle' && (
              <div className="flex flex-col items-center justify-center h-[180px] text-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Press compress to run</p>
              </div>
            )}
            {phase === 'running' && (
              <div className="flex flex-col items-center justify-center h-[180px] gap-5">
                <div className="w-full max-w-[220px]">
                  <div className="flex justify-between text-[11px] text-gray-500 mb-2 font-mono">
                    <span>Analyzing…</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 text-left w-full max-w-[220px]">
                  {progress > 20 && <p className="text-[11px] text-gray-500 font-mono animate-fade-in">✓ Scanning imports…</p>}
                  {progress > 48 && <p className="text-[11px] text-gray-500 font-mono animate-fade-in">✓ Removing redundant context…</p>}
                  {progress > 75 && <p className="text-[11px] text-gray-500 font-mono animate-fade-in">✓ Deduplicating tokens…</p>}
                  {progress > 90 && <p className="text-[11px] text-accent font-mono animate-fade-in">⠋ Finalizing…</p>}
                </div>
              </div>
            )}
            {phase === 'done' && (
              <div className="space-y-0">
                {sample.output.map((line, i) => (
                  <CodeLine key={`${idx}-out-${i}`} line={line} delay={i * 28} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-3.5 flex items-center gap-4 flex-wrap">
        <button
          onClick={phase === 'done' ? () => reset(idx) : run}
          disabled={phase === 'running'}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
            phase === 'done'
              ? 'bg-white/8 text-gray-300 hover:bg-white/14 border border-white/10'
              : 'bg-accent text-white hover:bg-accent-600 shadow-md shadow-accent/35 disabled:opacity-60'
          }`}
        >
          {phase === 'done' ? (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Reset</>
          ) : (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{phase === 'running' ? 'Compressing…' : '▶  wooz compress'}</>
          )}
        </button>
        {phase === 'done' && (
          <div className="flex items-center gap-4 animate-fade-in">
            <span className="flex items-center gap-1.5 text-sm font-mono text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />{savings.toLocaleString()} tokens saved
            </span>
            <span className="text-gray-600 text-xs">≈ ${(savings * 0.00002).toFixed(4)}/call</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── feature & tool data ────────────────────────────────── */
const features = [
  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />, title: 'Up to 60% fewer tokens', desc: 'Strips redundant context before it hits the API. Your output stays the same — your invoice doesn\'t.' },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, title: 'Runs entirely local', desc: 'Zero cloud. Zero exposure. Your code, prompts, and API keys never leave your machine.' },
  { icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>, title: 'Any model, any endpoint', desc: 'Works with OpenAI, Anthropic, Mistral, or any OpenAI-compatible API. Drop in and go.' },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />, title: 'Usage dashboard', desc: 'Track token savings per session. Export reports. Share the receipts with your team.' },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />, title: 'Context-aware trimming', desc: 'Understands code structure. Removes comments, unused imports, and boilerplate — not meaningful logic.' },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, title: 'Zero-latency overhead', desc: 'Compression runs in microseconds on your CPU. You\'ll never feel it — only see it on the invoice.' },
]

const tools = [
  { name: 'wooz compress', badge: 'Core', desc: 'Strips redundant tokens from any prompt before sending.' },
  { name: 'wooz context',  badge: 'Core', desc: 'Smart file context builder — picks only what the model needs.' },
  { name: 'wooz cache',    badge: 'Pro',  desc: 'Local semantic cache — skip repeat API calls entirely.' },
  { name: 'wooz diff',     badge: 'Pro',  desc: 'Sends only changed lines, not full file content.' },
  { name: 'wooz batch',    badge: 'Pro',  desc: 'Queue and batch requests to hit lower pricing tiers.' },
]

/* ── page ───────────────────────────────────────────────── */
export default function Home() {
  const installCmd = 'npm install -g woozcode'

  return (
    <div className="pt-16">

      {/* ═══ HERO + EMULATOR ══════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #09091f 0%, #06060f 100%)' }}>
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-0 w-[560px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(ellipse, #6D4AFF 0%, transparent 70%)' }} />
          <div className="absolute top-0 -left-40 w-[450px] h-[300px] rounded-full opacity-15" style={{ background: 'radial-gradient(ellipse, #4040cc 0%, transparent 70%)' }} />
        </div>

        {/* Headline block */}
        <div className="relative max-w-4xl mx-auto px-5 pt-12 pb-7 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-widest uppercase mb-5 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            v1.0 — now available
          </div>

          <h1 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-white leading-[1.06] mb-4 animate-fade-up">
            Cut your AI costs<br className="hidden sm:block" />{' '}
            <span className="gradient-text">in half.</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-3 max-w-md mx-auto animate-fade-up animate-delay-100">
            Smarter context. Fewer tokens.<br className="hidden sm:block" /> Runs 100% on your machine.
          </p>
          <p className="text-accent/80 text-sm font-medium animate-fade-up animate-delay-200 flex items-center justify-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-1 h-1 rounded-full bg-accent" />
              Live demo below
            </span>
          </p>
        </div>

        {/* Emulator */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 pb-10">
          <CompressorDemo />
        </div>

        {/* Install + stats strip */}
        <div className="relative border-t border-white/6" style={{ background: 'rgba(255,255,255,0.025)' }}>
          <div className="max-w-4xl mx-auto px-5 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center rounded-xl px-4 py-2.5 border border-white/10 font-mono text-sm" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <span className="text-gray-600 mr-2 select-none">$</span>
                <code className="text-gray-200 text-[13px]">{installCmd}</code>
                <CopyButton text={installCmd} />
              </div>
              <div className="flex items-center gap-7">
                {[{ n: '60%', l: 'fewer tokens' }, { n: '0ms', l: 'overhead' }, { n: 'Free', l: 'to start' }].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-sm font-bold text-white">{s.n}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-2 block">How it works</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Fewer tokens. Same results.</h2>
              <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">
                Woozcode intercepts prompts before they reach the API, strips waste, and forwards a leaner request.
              </p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Without woozcode', accent: false, badge: 'bg-red-50 text-red-600 border-red-100', bar: 'bg-red-400', barW: 'w-full', tokens: '1,240', lines: ['// Full context · 1,240 tokens', "import React, { useState, useEffect,", "  useCallback, useRef, useMemo } from 'react'", "import PropTypes from 'prop-types'", "// ... stale comments · unused imports", "// ... 800 more lines of boilerplate"] },
                { label: 'With woozcode', accent: true, badge: 'bg-accent/8 text-accent border-accent/20', bar: 'bg-accent', barW: 'w-[39%]', tokens: '487', lines: ["// wooz: 61% reduction applied", "import { useState, useRef } from 'react'", '', "// ... only relevant context kept", "// ... all redundant tokens removed"] },
              ].map((p) => (
                <div key={p.label} className={`rounded-2xl border p-5 ${p.accent ? 'bg-white border-accent/20 shadow-md shadow-accent/6' : 'bg-white border-gray-200'}`}>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border mb-4 ${p.badge}`}>{p.label}</span>
                  <div className="rounded-xl p-4 font-mono text-[11px] text-gray-400 leading-loose space-y-0.5 mb-4" style={{ background: '#09091f' }}>
                    {p.lines.map((l, i) => <div key={i} className={i === 0 ? 'text-gray-500' : [4,5].includes(i) ? 'text-gray-700' : ''}>{l || <br />}</div>)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1">
                      <div className={`${p.bar} h-1 rounded-full ${p.barW}`} />
                    </div>
                    <span className={`text-xs font-semibold font-mono ${p.accent ? 'text-accent' : 'text-red-500'}`}>{p.tokens} tok</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══ FEATURES ════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-2 block">Features</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Built for the local-first stack</h2>
              <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">No cloud. No exposure. Every byte stays on your machine.</p>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {features.map((f) => (
              <FadeSection key={f.title}>
                <div className="p-5 rounded-2xl border border-gray-100 hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group bg-white h-full">
                  <div className="w-9 h-9 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>{f.icon}</svg>
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-[15px] mb-1.5 group-hover:text-accent transition-colors">{f.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLI TOOLS ══════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #09091f 0%, #06060f 100%)' }}>
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-2 block">CLI Tools</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">Five tools. One install.</h2>
              <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">Each tool solves exactly one problem. Together they cover every angle of token waste.</p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="max-w-xl mx-auto space-y-2">
              {tools.map((t, i) => (
                <div key={t.name} className="flex items-center gap-4 p-4 rounded-xl border border-white/6 hover:border-white/14 hover:bg-white/[0.04] transition-all cursor-default group" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="w-5 h-5 rounded-full bg-accent/18 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <code className="font-mono text-sm text-accent whitespace-nowrap">{t.name}</code>
                  <p className="text-[13px] text-gray-500 flex-1 min-w-0">{t.desc}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${t.badge === 'Pro' ? 'bg-accent/18 text-accent' : 'bg-white/8 text-gray-500'}`}>{t.badge}</span>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══ STATS STRIP ════════════════════════════════ */}
      <section className="py-10 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ n: '300+', l: 'beta developers' }, { n: '18', l: 'countries' }, { n: '$0', l: 'cloud dependency' }, { n: '< 60s', l: 'to install' }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-gray-900">{s.n}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3b1fd4 0%, #6D4AFF 50%, #9f7aff 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </div>
        <FadeSection className="relative">
          <div className="max-w-2xl mx-auto px-5 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Ready to cut your AI bill?</h2>
            <p className="text-white/65 text-lg mb-10 max-w-sm mx-auto leading-relaxed">Free to install. No account. No cloud. Just leaner prompts.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/download" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all shadow-xl shadow-black/20">
                Download free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition-all">
                View pricing
              </Link>
            </div>
          </div>
        </FadeSection>
      </section>

    </div>
  )
}
