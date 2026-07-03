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

function CodeLine({ line, delay = 0, noAnimate = false, dimmed = false, strikethrough = false }: {
  line: Tok[]; delay?: number; noAnimate?: boolean; dimmed?: boolean; strikethrough?: boolean
}) {
  return (
    <div
      className={`flex flex-wrap text-[11px] font-mono leading-[1.75] whitespace-pre transition-all duration-200 ${
        noAnimate ? '' : 'animate-fade-in opacity-0'
      } ${dimmed ? 'opacity-25' : ''} ${strikethrough ? 'line-through decoration-red-500/40' : ''}`}
      style={noAnimate ? {} : { animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
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
  const [scanPct, setScanPct] = useState(0)
  const sample = SAMPLES[idx]
  const savings = sample.inputTokens - sample.outputTokens
  const pct = Math.round((savings / sample.inputTokens) * 100)
  const displayedOutTokens = useCountUp(phase === 'done' ? sample.outputTokens : sample.inputTokens, phase === 'done')

  /* live token counts while running */
  const liveInTokens = phase === 'running'
    ? Math.round(sample.inputTokens - savings * (progress / 100) * 0.85)
    : sample.inputTokens
  const liveOutTokens = phase === 'running'
    ? Math.round(sample.outputTokens * (progress / 100))
    : 0

  /* how many output lines to show while running */
  const visibleOutLines = phase === 'running'
    ? Math.floor((progress / 100) * sample.output.length)
    : phase === 'done' ? sample.output.length : 0

  /* which input lines to dim/strikethrough (every 3rd "removed" line) */
  const removedInputLines = new Set(
    sample.input
      .map((_, i) => i)
      .filter(i => i % 3 === 1 || (sample.input[i][0]?.t === 'cm'))
  )

  const run = useCallback(() => {
    if (phase === 'running') return
    setPhase('running'); setProgress(0); setScanPct(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 10 + 5
      const clamped = Math.min(p, 100)
      setProgress(clamped)
      setScanPct(clamped)
      if (clamped >= 100) { clearInterval(iv); setTimeout(() => setPhase('done'), 250) }
    }, 45)
  }, [phase])

  const reset = (i: number) => { setIdx(i); setPhase('idle'); setProgress(0); setScanPct(0) }

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

        {/* ── Input panel ── */}
        <div className={`rounded-xl bg-gray-950 overflow-hidden transition-all duration-300 ${
          phase === 'running' ? 'border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.04)]' : 'border border-gray-800'
        }`}>
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-[11px] text-gray-600 font-mono ml-2">input.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1.5">
              {phase === 'running' && (
                <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
              )}
              <span className={`text-[11px] font-mono font-semibold tabular-nums transition-colors duration-150 ${
                phase === 'running' ? 'text-orange-400' : 'text-red-400'
              }`}>
                {phase === 'running' ? liveInTokens.toLocaleString() : sample.inputTokens.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-700">tok</span>
            </div>
          </div>
          {/* Code area with scanner */}
          <div className="relative p-4 min-h-[200px] max-h-[260px] overflow-hidden">
            {/* Scanner beam — sweeps down during running */}
            {phase === 'running' && (
              <>
                {/* Glow halo above beam */}
                <div className="absolute left-0 right-0 pointer-events-none z-10"
                  style={{
                    top: `max(0px, calc(${scanPct}% - 24px))`,
                    height: '48px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                    transition: 'top 45ms linear',
                  }} />
                {/* Sharp scan line */}
                <div className="absolute left-3 right-3 h-px pointer-events-none z-10"
                  style={{
                    top: `${scanPct}%`,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(255,255,255,0.7), rgba(255,255,255,0.15), transparent)',
                    transition: 'top 45ms linear',
                    boxShadow: '0 0 6px 1px rgba(255,255,255,0.2)',
                  }} />
              </>
            )}
            {sample.input.map((line, i) => {
              const linePct = (i / (sample.input.length - 1)) * 100
              const isScanned = phase === 'running' && linePct < scanPct - 5
              const isRemoved = isScanned && removedInputLines.has(i)
              return (
                <CodeLine
                  key={`${idx}-in-${i}`}
                  line={line}
                  noAnimate
                  dimmed={isRemoved}
                  strikethrough={isRemoved && line[0]?.t === 'cm'}
                />
              )
            })}
          </div>
        </div>

        {/* ── Output panel ── */}
        <div className={`rounded-xl border overflow-hidden transition-all duration-400 ${
          phase !== 'idle'
            ? phase === 'done'
              ? 'bg-gray-950 border-gray-600 shadow-[0_0_24px_rgba(52,211,153,0.06)]'
              : 'bg-gray-950 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b ${phase !== 'idle' ? 'border-gray-800' : 'border-gray-200'}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${phase === 'done' ? 'bg-emerald-500/80' : 'bg-gray-600'}`} />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            <span className={`text-[11px] font-mono ml-2 ${phase !== 'idle' ? 'text-gray-600' : 'text-gray-400'}`}>
              output.{sample.lang}
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              {phase === 'running' && liveOutTokens > 0 && (
                <span className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" />
              )}
              <span className={`text-[11px] font-mono font-semibold tabular-nums transition-colors ${
                phase === 'done' ? 'text-emerald-400' : 'text-gray-600'
              }`}>
                {phase === 'running' && liveOutTokens > 0
                  ? liveOutTokens.toLocaleString()
                  : phase === 'done'
                  ? displayedOutTokens.toLocaleString()
                  : '—'
                }
              </span>
              <span className={`text-[10px] ${phase !== 'idle' ? 'text-gray-700' : 'text-gray-400'}`}>tok</span>
            </div>
          </div>

          <div className="p-4 min-h-[200px] max-h-[260px] overflow-y-auto">
            {/* IDLE */}
            {phase === 'idle' && (
              <div className="flex flex-col items-center justify-center h-[160px] text-center gap-2">
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs text-gray-400">Press compress to run</p>
              </div>
            )}

            {/* RUNNING — output materializes line by line */}
            {phase === 'running' && (
              <div>
                {sample.output.slice(0, visibleOutLines).map((line, i) => (
                  <CodeLine key={`${idx}-out-r-${i}`} line={line} noAnimate />
                ))}
                {/* Blinking cursor at the write head */}
                <div className="flex items-center h-[1.6em] mt-0.5">
                  <span className="inline-block w-[6px] h-[13px] rounded-[1px] bg-white/60 animate-cursor" />
                </div>
                {/* Status strip at bottom */}
                <div className="mt-3 pt-3 border-t border-gray-800/60">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-700 mb-1.5">
                    <span>
                      {progress < 25 ? 'Scanning tokens…'
                        : progress < 50 ? '✓ Removing stale context…'
                        : progress < 75 ? '✓ Deduplicating imports…'
                        : progress < 92 ? '✓ Optimizing structure…'
                        : 'Finalizing…'}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-px bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-75"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6))'
                      }} />
                  </div>
                </div>
              </div>
            )}

            {/* DONE */}
            {phase === 'done' && (
              <div>
                {sample.output.map((line, i) => (
                  <CodeLine key={`${idx}-out-${i}`} line={line} delay={i * 22} />
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

/* ── SavingsCalculator ───────────────────────────────────── */
const MODELS = [
  { key: 'gpt4o',     label: 'GPT-4o',          price: 2.50 },
  { key: 'gpt4mini',  label: 'GPT-4o mini',      price: 0.15 },
  { key: 'claude35',  label: 'Claude 3.5 Sonnet', price: 3.00 },
  { key: 'haiku',     label: 'Claude Haiku',      price: 0.25 },
  { key: 'gemini15',  label: 'Gemini 1.5 Pro',    price: 1.25 },
  { key: 'flash',     label: 'Gemini Flash',       price: 0.075 },
]
const PRESETS = [
  { label: 'Conservative', pct: 40 },
  { label: 'Standard',     pct: 55 },
  { label: 'Aggressive',   pct: 70 },
]

function useAnimatedNumber(target: number, ms = 280) {
  const [cur, setCur] = useState(target)
  const prev = useRef(target)
  useEffect(() => {
    const from = prev.current; prev.current = target
    if (Math.abs(from - target) < 0.0001) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / ms, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCur(from + (target - from) * ease)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, ms])
  return cur
}

function WoozSlider({ label, hint, value, min, max, step = 1, fmt, onChange }: {
  label: string; hint?: string; value: number; min: number; max: number
  step?: number; fmt: (v: number) => string; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="font-display text-sm font-bold text-gray-900 tabular-nums">{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="wooz-slider w-full"
        style={{ background: `linear-gradient(to right, #0a0a0a 0%, #0a0a0a ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
      />
      {hint && <p className="text-[10px] text-gray-400 mt-1.5">{hint}</p>}
    </div>
  )
}

function SavingsCalculator() {
  const [calls,   setCalls]   = useState(500)
  const [tokens,  setTokens]  = useState(1500)
  const [modelKey, setModelKey] = useState('gpt4o')
  const [presetIdx, setPresetIdx] = useState(1)

  const model  = MODELS.find(m => m.key === modelKey) ?? MODELS[0]
  const preset = PRESETS[presetIdx]

  const monthlyTokens   = calls * 30 * tokens
  const compressedTokens = monthlyTokens * (1 - preset.pct / 100)
  const costBefore  = (monthlyTokens    / 1_000_000) * model.price
  const costAfter   = (compressedTokens / 1_000_000) * model.price
  const monthlySaved = costBefore - costAfter
  const yearlySaved  = monthlySaved * 12
  const perCall      = monthlySaved / (calls * 30)

  const aBefore  = useAnimatedNumber(costBefore)
  const aAfter   = useAnimatedNumber(costAfter)
  const aSaved   = useAnimatedNumber(monthlySaved)
  const aYear    = useAnimatedNumber(yearlySaved)

  const fmt = (n: number) =>
    n >= 10000 ? `$${(n / 1000).toFixed(0)}k`
    : n >= 1000 ? `$${(n / 1000).toFixed(1)}k`
    : n >= 10   ? `$${n.toFixed(0)}`
    : `$${n.toFixed(2)}`

  const barPct = 100 - preset.pct

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-0.5">Savings calculator</p>
          <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight">How much could you save?</h3>
        </div>
        {monthlySaved > 0 && (
          <div className="ml-auto text-right animate-fade-in">
            <div className="font-display text-2xl font-bold text-gray-900 tabular-nums">{fmt(aSaved)}<span className="text-sm font-normal text-gray-400">/mo</span></div>
            <div className="text-[10px] text-gray-400">{fmt(aYear)} per year</div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ── Controls ── */}
        <div className="space-y-6">
          <WoozSlider
            label="API calls per day"
            value={calls} min={10} max={5000} step={10}
            fmt={v => `${v.toLocaleString()} calls/day`}
            onChange={setCalls}
          />
          <WoozSlider
            label="Average tokens per call"
            value={tokens} min={200} max={8000} step={100}
            fmt={v => `${v.toLocaleString()} tokens`}
            hint="Includes system prompt + user message + context"
            onChange={setTokens}
          />

          {/* Model selector */}
          <div>
            <p className="text-xs text-gray-500 mb-2.5">AI model</p>
            <div className="flex flex-wrap gap-1.5">
              {MODELS.map(m => (
                <button key={m.key} onClick={() => setModelKey(m.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all active:scale-95 ${
                    m.key === modelKey
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'
                  }`}>
                  {m.label}
                  <span className={`ml-1 text-[9px] ${m.key === modelKey ? 'text-gray-400' : 'text-gray-300'}`}>
                    ${m.price}/M
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Compression preset */}
          <div>
            <p className="text-xs text-gray-500 mb-2.5">Compression level</p>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((p, i) => (
                <button key={p.label} onClick={() => setPresetIdx(i)}
                  className={`py-2.5 rounded-lg text-[11px] font-medium border transition-all active:scale-95 ${
                    i === presetIdx
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}>
                  <div>{p.label}</div>
                  <div className={`text-[10px] mt-0.5 ${i === presetIdx ? 'text-gray-400' : 'text-gray-300'}`}>−{p.pct}% tokens</div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              Conservative = safe trimming. Aggressive = maximum removal.
            </p>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="flex flex-col gap-4">
          {/* 3 stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {([
              { label: 'Without wooz', val: aBefore, dark: false, sub: 'monthly' },
              { label: 'With wooz',    val: aAfter,  dark: false, sub: 'monthly' },
              { label: 'You save',     val: aSaved,  dark: true,  sub: 'monthly' },
            ] as const).map(s => (
              <div key={s.label} className={`rounded-xl p-3.5 border flex flex-col justify-between min-h-[88px] ${
                s.dark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className={`font-display text-[22px] font-bold tabular-nums leading-none ${s.dark ? 'text-white' : 'text-gray-900'}`}>
                  {fmt(s.val)}
                </div>
                <div>
                  <div className={`text-[11px] font-medium mt-2 ${s.dark ? 'text-gray-300' : 'text-gray-700'}`}>{s.label}</div>
                  <div className={`text-[9px] mt-0.5 ${s.dark ? 'text-gray-600' : 'text-gray-400'}`}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison bar */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3">
              <span>Token volume after compression</span>
              <span className="font-mono font-semibold text-gray-600">{barPct}% of original</span>
            </div>
            {/* Original bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                <span>Before</span>
                <span className="font-mono">{((monthlyTokens) / 1_000_000).toFixed(1)}M tok/mo</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full" />
            </div>
            {/* Compressed bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                <span>After</span>
                <span className="font-mono">{((compressedTokens) / 1_000_000).toFixed(1)}M tok/mo</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${barPct}%` }} />
              </div>
            </div>
            {/* Per-call + yearly row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div>
                <div className="text-[10px] text-gray-400">Per-call saving</div>
                <div className="text-sm font-mono font-semibold text-gray-800 tabular-nums">
                  ${perCall.toFixed(perCall < 0.001 ? 6 : perCall < 0.01 ? 5 : 4)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400">Yearly savings</div>
                <div className="font-display text-lg font-bold text-gray-900 tabular-nums">{fmt(aYear)}</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Based on {model.label} pricing (${model.price}/1M input tokens). Estimates are illustrative — actual savings vary by prompt structure and content.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── LiveCompressor — real, working compression on arbitrary user text ── */
function estimateTokens(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return Math.max(1, Math.round(trimmed.length / 4))
}

function compressText(text: string) {
  let lines = text.split('\n')

  // Strip full-line comments (//, #, and block /* ... */ openers/closers on their own line)
  lines = lines.filter((line) => {
    const t = line.trim()
    if (!t) return true
    if (t.startsWith('//') || t.startsWith('#')) return false
    if (t.startsWith('/*') && t.endsWith('*/')) return false
    return true
  })

  // Strip trailing inline comments (best-effort, ignores strings)
  lines = lines.map((line) => line.replace(/\s+\/\/(?![^'"]*['"]).*$/, ''))

  // Collapse runs of 2+ blank lines into one
  const collapsed: string[] = []
  let blankRun = 0
  for (const line of lines) {
    if (line.trim() === '') {
      blankRun++
      if (blankRun > 1) continue
    } else {
      blankRun = 0
    }
    collapsed.push(line.replace(/[ \t]+$/, ''))
  }

  // Deduplicate consecutive identical import/require lines
  const deduped: string[] = []
  const seenImports = new Set<string>()
  for (const line of collapsed) {
    const t = line.trim()
    const isImport = /^(import\s|const\s.+=\s*require\()/.test(t)
    if (isImport) {
      if (seenImports.has(t)) continue
      seenImports.add(t)
    }
    deduped.push(line)
  }

  return deduped.join('\n').trim()
}

function LiveCompressor() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string | null>(null)

  const handleCompress = () => setOutput(compressText(input))
  const handleClear = () => { setInput(''); setOutput(null) }

  const inTok = estimateTokens(input)
  const outTok = output !== null ? estimateTokens(output) : null
  const savedPct = outTok !== null && inTok > 0 ? Math.round((1 - outTok / inTok) * 100) : null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight">Try it on your own text</h3>
        {savedPct !== null && savedPct > 0 && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            −{savedPct}% tokens
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Paste real code or a prompt below. This runs a live, in-browser pass of comment stripping, blank-line
        collapsing, and duplicate-import removal — token counts are estimated from character length (~4 chars/token).
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-gray-400">input</span>
            <span className="text-[11px] font-mono text-gray-500">{inTok.toLocaleString()} tok (est.)</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(null) }}
            placeholder="Paste code, a prompt, or any text here…"
            rows={10}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 font-mono text-[12px] text-gray-800 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-gray-400">output</span>
            {outTok !== null && <span className="text-[11px] font-mono text-emerald-600">{outTok.toLocaleString()} tok (est.)</span>}
          </div>
          <pre className="w-full h-[196px] overflow-auto rounded-xl border border-gray-800 bg-gray-950 p-3 font-mono text-[12px] text-gray-200 leading-relaxed whitespace-pre-wrap">
            {output !== null ? output || '(nothing left after compression)' : 'Press "Compress" to see the result here.'}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleCompress}
          disabled={!input.trim()}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Compress
        </button>
        <button
          onClick={handleClear}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Clear
        </button>
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

          {/* Emulator + Calculator */}
          <div className="pb-12">
            <CompressorDemo />
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* ═══ LIVE COMPRESSOR ════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5">
          <FadeSection>
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Try it now</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">No install required</h2>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">This is a real, working preview of the compression pass — right in your browser.</p>
            </div>
            <LiveCompressor />
          </FadeSection>
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
