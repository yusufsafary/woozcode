'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    if (!active) { setValue(target); return }
    const start = performance.now()
    const initial = target * 2.6
    const raf = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(initial - (initial - target) * ease))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [target, active, duration])
  return value
}

const SAMPLES = [
  {
    label: 'React component',
    lang: 'tsx',
    inputTokens: 1240,
    outputTokens: 487,
    input: [
      { t: 'cm', v: "// UserCard — renders user profile + edit form" },
      { t: 'cm', v: "// Used in: Dashboard, Profile, Settings, Sidebar" },
      { t: 'cm', v: "// Last updated: 2024-01-15 by @devteam" },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' React, { ' },{ t: 'id', v: 'useState' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useEffect' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useCallback' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useRef' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useMemo' },{ t: 'pl', v: " } from 'react'" },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' PropTypes ' },{ t: 'kw', v: 'from' },{ t: 'str', v: " 'prop-types'" },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' { connect } ' },{ t: 'kw', v: 'from' },{ t: 'str', v: " 'react-redux'" },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' { bindActionCreators } ' },{ t: 'kw', v: 'from' },{ t: 'str', v: " 'redux'" },
      { t: 'kw', v: 'const' },{ t: 'pl', v: ' ' },{ t: 'id', v: 'UserCard' },{ t: 'pl', v: ' = ({ user, onUpdate, loading, error }) => {' },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' [isEditing, setIsEditing] = ' },{ t: 'id', v: 'useState' },{ t: 'pl', v: '(false)' },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' mounted = ' },{ t: 'id', v: 'useRef' },{ t: 'pl', v: '(true)' },
      { t: 'cm', v: "  // Handle form submission, validate, then call API" },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' ' },{ t: 'id', v: 'handleSubmit' },{ t: 'pl', v: ' = ' },{ t: 'id', v: 'useCallback' },{ t: 'pl', v: '(async (e) => {' },
      { t: 'pl', v: "    e.preventDefault(); if (!mounted.current) return" },
      { t: 'pl', v: "    await onUpdate(formData); setIsEditing(false)" },
      { t: 'pl', v: "  }, [formData, onUpdate])" },
      { t: 'pl', v: "  if (loading) return <div className=" },{ t: 'str', v: '"skeleton"' },{ t: 'pl', v: " />" },
      { t: 'pl', v: "  return <div className=" },{ t: 'str', v: '"user-card"' },{ t: 'pl', v: "><img src={user.avatar} /></div>" },
      { t: 'pl', v: "}" },
      { t: 'kw', v: 'export default' },{ t: 'pl', v: ' connect(null, null)(UserCard)' },
    ],
    output: [
      { t: 'cm', v: '// wooz: -753 tokens · stripped 4 unused imports, stale comments' },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' { ' },{ t: 'id', v: 'useState' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useCallback' },{ t: 'pl', v: ', ' },{ t: 'id', v: 'useRef' },{ t: 'pl', v: " } from 'react'" },
      { t: 'kw', v: 'const' },{ t: 'pl', v: ' ' },{ t: 'id', v: 'UserCard' },{ t: 'pl', v: ' = ({ user, onUpdate, loading, error }) => {' },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' [isEditing, setIsEditing] = ' },{ t: 'id', v: 'useState' },{ t: 'pl', v: '(false)' },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' mounted = ' },{ t: 'id', v: 'useRef' },{ t: 'pl', v: '(true)' },
      { t: 'kw', v: '  const' },{ t: 'pl', v: ' ' },{ t: 'id', v: 'handleSubmit' },{ t: 'pl', v: ' = ' },{ t: 'id', v: 'useCallback' },{ t: 'pl', v: '(async (e) => {' },
      { t: 'pl', v: '    e.preventDefault()' },
      { t: 'pl', v: '    if (!mounted.current) return' },
      { t: 'pl', v: '    await onUpdate(formData); setIsEditing(false)' },
      { t: 'pl', v: '  }, [formData, onUpdate])' },
      { t: 'pl', v: '  if (loading) return <div className=' },{ t: 'str', v: '"skeleton"' },{ t: 'pl', v: ' />' },
      { t: 'pl', v: '  return <div className=' },{ t: 'str', v: '"user-card"' },{ t: 'pl', v: '><img src={user.avatar} /></div>' },
      { t: 'pl', v: '}' },
      { t: 'kw', v: 'export default' },{ t: 'pl', v: ' UserCard' },
    ],
  },
  {
    label: 'System prompt',
    lang: 'txt',
    inputTokens: 890,
    outputTokens: 312,
    input: [
      { t: 'cm', v: '# SYSTEM INSTRUCTIONS FOR AI ASSISTANT' },
      { t: 'cm', v: '# Version: 2.4.1 | Updated: 2024-01-10' },
      { t: 'cm', v: '# DO NOT MODIFY THIS SECTION' },
      { t: 'pl', v: 'You are a helpful, harmless, and honest AI assistant.' },
      { t: 'pl', v: 'You should always be polite and respectful to users.' },
      { t: 'pl', v: 'You should never be rude or disrespectful to users.' },
      { t: 'pl', v: 'You should always try your best to help users.' },
      { t: 'pl', v: 'You should always be helpful and provide good answers.' },
      { t: 'pl', v: 'You should always be honest and truthful in your responses.' },
      { t: 'pl', v: 'If you do not know the answer, say that you do not know.' },
      { t: 'pl', v: 'Never make up information or hallucinate facts.' },
      { t: 'pl', v: 'If you are unsure, say that you are unsure about the answer.' },
      { t: 'pl', v: 'Always provide accurate and reliable information.' },
      { t: 'kw', v: 'TASK:' },{ t: 'pl', v: ' Answer user questions about TypeScript programming.' },
      { t: 'kw', v: 'FORMAT:' },{ t: 'pl', v: ' Respond with concise, accurate answers and code examples.' },
      { t: 'kw', v: 'STYLE:' },{ t: 'pl', v: ' Use markdown for code. Keep responses under 500 words.' },
    ],
    output: [
      { t: 'cm', v: '// wooz: -578 tokens · collapsed 9 redundant policy lines' },
      { t: 'pl', v: 'You are a helpful, honest AI assistant.' },
      { t: 'pl', v: 'Never fabricate information. Say "I don\'t know" when unsure.' },
      { t: 'kw', v: 'TASK:' },{ t: 'pl', v: ' Answer TypeScript programming questions.' },
      { t: 'kw', v: 'FORMAT:' },{ t: 'pl', v: ' Concise answers with markdown code blocks, ≤500 words.' },
    ],
  },
  {
    label: 'Python function',
    lang: 'py',
    inputTokens: 760,
    outputTokens: 298,
    input: [
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' os' },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' sys' },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' json' },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' logging' },
      { t: 'kw', v: 'from' },{ t: 'pl', v: ' pathlib ' },{ t: 'kw', v: 'import' },{ t: 'pl', v: ' Path' },
      { t: 'cm', v: '# Utility function for reading config files' },
      { t: 'cm', v: '# Returns parsed JSON or None on error' },
      { t: 'cm', v: '# Used by: main.py, setup.py, cli.py' },
      { t: 'kw', v: 'def' },{ t: 'id', v: ' read_config' },{ t: 'pl', v: '(filepath: str) -> dict | None:' },
      { t: 'str', v: '  """Read and parse a JSON config file.' },
      { t: 'str', v: '  Args: filepath (str): Path to config file.' },
      { t: 'str', v: '  Returns: dict if valid JSON, None otherwise.' },
      { t: 'str', v: '  Raises: nothing, all errors are caught internally."""' },
      { t: 'kw', v: '  try' },{ t: 'pl', v: ':' },
      { t: 'pl', v: '    path = Path(filepath)' },
      { t: 'pl', v: '    if not path.exists(): return None' },
      { t: 'kw', v: '    with' },{ t: 'pl', v: ' open(path, ' },{ t: 'str', v: "'r'" },{ t: 'pl', v: ') as f:' },
      { t: 'pl', v: '      return json.load(f)' },
      { t: 'kw', v: '  except' },{ t: 'pl', v: ' Exception as e:' },
      { t: 'pl', v: '    logging.error(f"Config read error: {e}")' },
      { t: 'kw', v: '    return' },{ t: 'pl', v: ' None' },
    ],
    output: [
      { t: 'cm', v: '# wooz: -462 tokens · removed 4 unused imports, verbose docstring' },
      { t: 'kw', v: 'import' },{ t: 'pl', v: ' json, logging' },
      { t: 'kw', v: 'from' },{ t: 'pl', v: ' pathlib ' },{ t: 'kw', v: 'import' },{ t: 'pl', v: ' Path' },
      { t: 'kw', v: 'def' },{ t: 'id', v: ' read_config' },{ t: 'pl', v: '(filepath: str) -> dict | None:' },
      { t: 'kw', v: '  try' },{ t: 'pl', v: ':' },
      { t: 'pl', v: '    p = Path(filepath)' },
      { t: 'pl', v: '    return json.load(open(p)) if p.exists() else None' },
      { t: 'kw', v: '  except' },{ t: 'pl', v: ' Exception as e:' },
      { t: 'pl', v: '    logging.error(e); return None' },
    ],
  },
]

type Token = { t: string; v: string }
function CodeLine({ tokens, delay = 0 }: { tokens: Token[]; delay?: number }) {
  const cls: Record<string, string> = {
    kw: 'text-violet-400',
    id: 'text-blue-300',
    str: 'text-emerald-400',
    cm: 'text-gray-500 italic',
    pl: 'text-gray-200',
  }
  return (
    <div
      className="flex flex-wrap text-xs font-mono leading-[1.65] animate-fade-in opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {tokens.map((tok, i) => (
        <span key={i} className={cls[tok.t] ?? 'text-gray-200'}>{tok.v}</span>
      ))}
    </div>
  )
}

function CompressorDemo() {
  const [sampleIdx, setSampleIdx] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'compressing' | 'done'>('idle')
  const [progress, setProgress] = useState(0)
  const sample = SAMPLES[sampleIdx]
  const displayedTokens = useCountUp(
    phase === 'done' ? sample.outputTokens : sample.inputTokens,
    phase === 'done'
  )
  const savings = sample.inputTokens - sample.outputTokens
  const pct = Math.round((savings / sample.inputTokens) * 100)

  const run = useCallback(() => {
    if (phase === 'compressing') return
    setPhase('compressing')
    setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 18 + 6
      setProgress(Math.min(p, 100))
      if (p >= 100) { clearInterval(iv); setPhase('done') }
    }, 60)
  }, [phase])

  const reset = (idx: number) => {
    setSampleIdx(idx)
    setPhase('idle')
    setProgress(0)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {SAMPLES.map((s, i) => (
          <button
            key={i}
            onClick={() => reset(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              i === sampleIdx
                ? 'bg-accent text-white shadow-sm shadow-accent/30'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">
            {phase === 'idle' && 'ready'}
            {phase === 'compressing' && 'compressing…'}
            {phase === 'done' && `−${pct}% tokens`}
          </span>
        </div>
      </div>

      {/* Main panels */}
      <div className="grid md:grid-cols-2 gap-3">
        {/* Input panel */}
        <div className="rounded-2xl bg-gray-900 border border-white/8 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-gray-900/80">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2">input.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-xs font-mono text-red-400 font-semibold">{sample.inputTokens.toLocaleString()}</span>
              <span className="text-xs text-gray-600">tokens</span>
            </div>
          </div>
          <div className="p-4 space-y-0.5 min-h-[240px] max-h-[320px] overflow-y-auto">
            {sample.input.map((row, i) => (
              <CodeLine key={`${sampleIdx}-in-${i}`} tokens={[row]} delay={i * 20} />
            ))}
          </div>
        </div>

        {/* Output panel */}
        <div className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
          phase !== 'idle'
            ? 'bg-gray-900 border-accent/30 shadow-lg shadow-accent/10'
            : 'bg-gray-900/50 border-white/5'
        }`}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-gray-900/80">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="w-3 h-3 rounded-full bg-gray-700" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2">output.{sample.lang}</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className={`text-xs font-mono font-semibold transition-colors ${
                phase === 'done' ? 'text-accent' : 'text-gray-600'
              }`}>{displayedTokens.toLocaleString()}</span>
              <span className="text-xs text-gray-600">tokens</span>
            </div>
          </div>

          <div className="p-4 min-h-[240px] max-h-[320px] overflow-y-auto relative">
            {phase === 'idle' && (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Hit compress to see it work</p>
              </div>
            )}
            {phase === 'compressing' && (
              <div className="flex flex-col items-center justify-center h-[200px] gap-4">
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Analyzing tokens…</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 w-full max-w-xs">
                  {progress > 20 && <div className="text-xs text-gray-500 animate-fade-in">✓ Scanning imports…</div>}
                  {progress > 45 && <div className="text-xs text-gray-500 animate-fade-in">✓ Removing redundant context…</div>}
                  {progress > 70 && <div className="text-xs text-gray-500 animate-fade-in">✓ Deduplicating tokens…</div>}
                  {progress > 88 && <div className="text-xs text-accent animate-fade-in">⠋ Finalizing…</div>}
                </div>
              </div>
            )}
            {phase === 'done' && (
              <div className="space-y-0.5">
                {sample.output.map((row, i) => (
                  <CodeLine key={`${sampleIdx}-out-${i}`} tokens={[row]} delay={i * 30} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <button
          onClick={run}
          disabled={phase === 'compressing'}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
            phase === 'done'
              ? 'bg-white/10 text-white hover:bg-white/15'
              : 'bg-accent text-white hover:bg-accent-600 shadow-md shadow-accent/30 disabled:opacity-60'
          }`}
        >
          {phase === 'done' ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {phase === 'compressing' ? 'Compressing…' : '▶ Run wooz compress'}
            </>
          )}
        </button>

        {phase === 'done' && (
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-mono text-white">{savings.toLocaleString()} tokens saved</span>
            </div>
            <span className="text-gray-600 text-xs">≈ ${(savings * 0.00002).toFixed(4)} per call</span>
          </div>
        )}
      </div>
    </div>
  )
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

const features = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    title: 'Up to 60% fewer tokens',
    desc: 'Intelligent prompt compression removes redundant context before it hits the API—slashing your bill without touching output quality.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    title: 'Runs entirely local',
    desc: 'No data leaves your machine. The processing layer lives in your environment—your code, prompts, and keys stay private.',
  },
  {
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    title: 'Works with any model',
    desc: 'Compatible with OpenAI, Anthropic, Mistral, and any OpenAI-compatible endpoint. Drop in and go.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    title: 'Usage dashboard',
    desc: 'See exactly how much you saved per session. Track trends and share reports with your team.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />,
    title: 'Context-aware trimming',
    desc: 'Understands code structure—trims comments, imports, and boilerplate rather than meaningful logic.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    title: 'Zero-latency overhead',
    desc: 'Processing happens in microseconds on your CPU. You\'ll never notice it\'s there—until you see your invoice.',
  },
]

const tools = [
  { name: 'wooz compress', badge: 'Core', desc: 'Strips redundant tokens from any prompt before sending.' },
  { name: 'wooz context', badge: 'Core', desc: 'Smart file context builder—picks only what the model needs.' },
  { name: 'wooz cache', badge: 'Pro', desc: 'Local semantic cache—skip repeat API calls entirely.' },
  { name: 'wooz diff', badge: 'Pro', desc: 'Sends only changed lines, not full file content.' },
  { name: 'wooz batch', badge: 'Pro', desc: 'Queue and batch requests to hit lower pricing tiers.' },
]

export default function Home() {
  const installCmd = 'npm install -g woozcode'
  const [termStep, setTermStep] = useState(0)

  useEffect(() => {
    if (termStep >= 6) return
    const t = setTimeout(() => setTermStep(s => s + 1), termStep === 0 ? 600 : 500)
    return () => clearTimeout(t)
  }, [termStep])

  const termLines = [
    { prefix: '$', text: 'wooz compress --input prompt.txt', type: 'cmd' },
    { prefix: '', text: '  ⠋ Analyzing context...', type: 'info' },
    { prefix: '', text: '  ✓ Stripped 412 redundant tokens', type: 'ok' },
    { prefix: '', text: '  ✓ Deduplicated 38 import refs', type: 'ok' },
    { prefix: '', text: '  ✓ Removed 94 verbose comments', type: 'ok' },
    { prefix: '', text: '  Saved: 753 tokens (60.7%) · 2ms', type: 'result' },
  ]

  return (
    <div className="pt-16">
      {/* ── HERO ── */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/6 blur-[120px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-300/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.15]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-semibold tracking-wide mb-6 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                v1.0 — now available
              </div>

              <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-gray-900 leading-[1.08] mb-5 animate-fade-up">
                The plugin that cuts your{' '}
                <span className="gradient-text">AI costs in half.</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 animate-fade-up animate-delay-100">
                Smarter context. Fewer tokens. Runs 100% on your machine.
                Install in one command and start saving immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 animate-fade-up animate-delay-200">
                <div className="flex items-center bg-gray-950 rounded-xl px-4 py-3 border border-white/5 shadow-xl glow-accent-sm min-w-0 w-full sm:w-auto">
                  <span className="text-gray-500 font-mono text-sm select-none mr-2">$</span>
                  <code className="font-mono text-sm text-white flex-1 truncate">{installCmd}</code>
                  <CopyButton text={installCmd} />
                </div>
                <Link href="/docs" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap">
                  Read the docs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="flex items-center gap-6 animate-fade-up animate-delay-300">
                {[
                  { n: '60%', l: 'token reduction' },
                  { n: '0ms', l: 'added latency' },
                  { n: '100%', l: 'local' },
                  { n: 'Free', l: 'to start' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold text-gray-900">{s.n}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 whitespace-nowrap">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — animated terminal */}
            <div className="hidden lg:block animate-fade-in animate-delay-300">
              <div className="rounded-2xl bg-gray-950 border border-white/8 shadow-2xl shadow-accent/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">woozcode — terminal</span>
                </div>
                <div className="p-5 space-y-2 min-h-[200px]">
                  {termLines.slice(0, termStep).map((line, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-mono animate-slide-right" style={{ animationDelay: '0ms' }}>
                      {line.prefix && <span className="text-accent select-none">{line.prefix}</span>}
                      <span className={
                        line.type === 'cmd' ? 'text-white' :
                        line.type === 'ok' ? 'text-emerald-400' :
                        line.type === 'result' ? 'text-accent font-semibold' :
                        'text-gray-400'
                      }>
                        {line.text}
                      </span>
                    </div>
                  ))}
                  {termStep < termLines.length && (
                    <span className="inline-block w-2 h-4 bg-accent animate-cursor ml-1" />
                  )}
                  {termStep === termLines.length && (
                    <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-3 animate-fade-in">
                      {[
                        { l: 'Original', v: '1,240 tok', c: 'text-gray-400' },
                        { l: 'Compressed', v: '487 tok', c: 'text-accent' },
                        { l: 'Saved', v: '$0.015', c: 'text-emerald-400' },
                      ].map(s => (
                        <div key={s.l} className="text-center">
                          <div className={`text-sm font-mono font-bold ${s.c}`}>{s.v}</div>
                          <div className="text-[10px] text-gray-600 mt-0.5">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE EMULATOR ── */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Live demo
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                See it work in real-time
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto text-[15px]">
                Pick a sample, hit compress, and watch woozcode strip tokens from real code. Same output — fraction of the cost.
              </p>
            </div>
          </FadeSection>
          <FadeSection>
            <CompressorDemo />
          </FadeSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">How it works</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Fewer tokens. Same results.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-[15px]">
                Woozcode intercepts requests before they leave your machine, removes waste, and forwards a leaner prompt.
              </p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                { label: 'Without woozcode', tokens: '1,240', pct: 100, accent: false, badge: 'bg-red-50 text-red-600', bar: 'bg-red-500', barW: 'w-full', lines: ['// Full context (1,240 tokens)', "import React, { useState, useEffect,", "  useCallback, useRef, useMemo } from 'react'", "import PropTypes from 'prop-types'", "// ... 800 lines · duplicate imports", "// ... unused functions · stale comments"] },
                { label: 'With woozcode', tokens: '487', pct: 39, accent: true, badge: 'bg-accent/10 text-accent', bar: 'bg-accent', barW: 'w-[39%]', lines: ["// wooz: 61% reduction applied", "import { useState, useRef } from 'react'", '', '// ... only relevant functions', '// ... deduplicated imports'] },
              ].map((p) => (
                <div key={p.label} className={`rounded-2xl border p-6 ${p.accent ? 'border-accent/20 bg-white shadow-sm shadow-accent/10' : 'border-gray-200 bg-white'}`}>
                  <div className="mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.badge}`}>{p.label}</span>
                  </div>
                  <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs text-gray-400 leading-relaxed space-y-1 mb-4">
                    {p.lines.map((l, i) => (
                      <div key={i} className={i === 0 ? 'text-gray-500' : i === 4 || i === 5 ? 'text-gray-600' : p.accent && i === 0 ? 'text-accent' : ''}>{l || <br />}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className={`${p.bar} h-1.5 rounded-full ${p.barW}`} />
                    </div>
                    <span className={`text-xs font-semibold ${p.accent ? 'text-accent' : 'text-red-600'}`}>{p.tokens} tokens</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Features</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Built for the local-first stack
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-[15px]">
                No cloud. No exposure. Every byte stays on your machine.
              </p>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeSection key={f.title}>
                <div className="p-5 rounded-2xl border border-gray-100 hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group bg-white h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent/8 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>{f.icon}</svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-accent transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLI TOOLS ── */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-5">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">CLI Tools</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">Five tools. One install.</h2>
              <p className="text-gray-400 max-w-lg mx-auto text-[15px]">
                Each tool solves one problem. Together they cover every angle of token waste.
              </p>
            </div>
          </FadeSection>
          <FadeSection>
            <div className="max-w-2xl mx-auto space-y-2">
              {tools.map((tool, i) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/[0.07] hover:border-white/15 transition-all group cursor-default"
                >
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <code className="font-mono text-sm text-accent whitespace-nowrap">{tool.name}</code>
                  <p className="text-sm text-gray-400 flex-1 min-w-0">{tool.desc}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    tool.badge === 'Pro' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-gray-500'
                  }`}>{tool.badge}</span>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 border-y border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: '300+', l: 'beta testers' },
              { n: '18', l: 'countries' },
              { n: '$0', l: 'cloud dependency' },
              { n: '< 60s', l: 'to install' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-gray-900">{s.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#4320E3_0%,#5B3DF5_50%,#7C5FF7_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        <FadeSection className="relative">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Ready to cut your AI bill?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Free to install. No account. No cloud. Just leaner prompts and lower invoices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all shadow-xl shadow-black/20"
              >
                Download free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition-all"
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
