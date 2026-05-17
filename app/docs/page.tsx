import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for woozcode: installation, setup, API reference, and troubleshooting.',
}

const sections = [
  { id: 'installation', label: 'Installation' },
  { id: 'setup', label: 'Setup Guide' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'api', label: 'API Usage' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
]

export default function DocsPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">On this page</p>
              <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex-shrink-0 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-accent hover:bg-accent/6 transition-colors font-medium"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="hidden lg:block mt-8 p-4 rounded-xl bg-accent/6 border border-accent/15">
                <p className="text-xs font-semibold text-accent mb-1">Need help?</p>
                <p className="text-xs text-gray-500">Open an issue on GitHub or join the Discord community.</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-2xl prose-wooz space-y-16">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Documentation</h1>
              <p className="text-gray-500">Everything you need to install, configure, and extend woozcode in your development workflow.</p>
            </div>

            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Installation</h2>
              <p className="text-gray-600 mb-5">
                Woozcode installs globally as a CLI tool via npm, yarn, or pnpm. Node.js 18 or later is required.
              </p>

              <div className="space-y-3">
                {[
                  { label: 'npm', cmd: 'npm install -g woozcode' },
                  { label: 'yarn', cmd: 'yarn global add woozcode' },
                  { label: 'pnpm', cmd: 'pnpm add -g woozcode' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400 mb-1 font-mono">{item.label}</p>
                    <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono">
                      <code>$ {item.cmd}</code>
                    </pre>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mt-5">
                Verify the installation:
              </p>
              <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono mt-3">
                <code>$ wooz --version{'\n'}1.0.0</code>
              </pre>
            </section>

            {/* Setup */}
            <section id="setup">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Setup Guide</h2>
              <p className="text-gray-600 mb-5">
                Once installed, initialize woozcode in your project directory. This creates a local config file that you can version-control.
              </p>

              <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono mb-5">
                <code>{`$ cd your-project
$ wooz init

  woozcode initialized
  Config written to .woozcode.json
  Run \`wooz start\` to begin compression`}</code>
              </pre>

              <h3 className="text-base font-semibold text-gray-900 mb-3 mt-6">Configuration file</h3>
              <p className="text-gray-600 mb-3">
                The generated <code>.woozcode.json</code> controls compression behavior:
              </p>
              <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono">
                <code>{`{
  "model": "gpt-4o",
  "compression": {
    "level": "balanced",
    "stripComments": true,
    "deduplicateImports": true,
    "contextWindow": 8000
  },
  "cache": {
    "enabled": false,
    "ttl": 3600
  }
}`}</code>
              </pre>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 text-gray-700 font-semibold">Option</th>
                      <th className="text-left py-2 pr-4 text-gray-700 font-semibold">Values</th>
                      <th className="text-left py-2 text-gray-700 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { opt: 'compression.level', vals: 'light / balanced / aggressive', desc: 'Controls how aggressively tokens are trimmed.' },
                      { opt: 'stripComments', vals: 'true / false', desc: 'Removes inline and block comments from code.' },
                      { opt: 'deduplicateImports', vals: 'true / false', desc: 'Collapses duplicate import statements.' },
                      { opt: 'contextWindow', vals: 'number', desc: 'Target token limit for compressed output.' },
                    ].map((row) => (
                      <tr key={row.opt}>
                        <td className="py-2.5 pr-4 font-mono text-accent text-xs">{row.opt}</td>
                        <td className="py-2.5 pr-4 text-gray-500 text-xs">{row.vals}</td>
                        <td className="py-2.5 text-gray-500 text-xs">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Concepts */}
            <section id="concepts">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Concepts</h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Compression pipeline',
                    body: 'Woozcode operates as a proxy layer between your code and any LLM API. When you send a request, the compression pipeline strips tokens that carry no semantic weight: duplicate imports, verbose docstrings, commented-out code, and repeated context. The resulting prompt is functionally identical but 40-60% smaller.',
                  },
                  {
                    title: 'Local-first architecture',
                    body: 'All processing runs in a local daemon (wooz start). No payload ever reaches a woozcode server. Your prompts, source files, and API keys remain entirely on your machine. The daemon communicates with your AI provider directly using your own credentials.',
                  },
                  {
                    title: 'Semantic cache',
                    body: 'When enabled, the cache stores embeddings of previous requests and returns cached responses for semantically similar queries. This can eliminate API calls entirely for repeated or near-repeated questions. Cache entries expire after the configured TTL.',
                  },
                ].map((c) => (
                  <div key={c.title} className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* API */}
            <section id="api">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">API Usage</h2>
              <p className="text-gray-600 mb-5">
                Woozcode exposes a local REST API on port <code>7350</code> when the daemon is running. You can also use the Node.js SDK directly.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mb-3">SDK (Node.js)</h3>
              <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono mb-6">
                <code>{`import { Woozcode } from 'woozcode'

const wooz = new Woozcode()

const result = await wooz.compress({
  prompt: longPromptString,
  level: 'balanced',
})

console.log(result.compressed)    // compressed string
console.log(result.tokensSaved)   // number
console.log(result.ratio)         // 0.61`}</code>
              </pre>

              <h3 className="text-base font-semibold text-gray-900 mb-3">REST API</h3>
              <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm font-mono">
                <code>{`POST http://localhost:7350/v1/compress
Content-Type: application/json

{
  "prompt": "...",
  "level": "balanced"
}

// Response
{
  "compressed": "...",
  "tokensSaved": 760,
  "ratio": 0.61,
  "latencyMs": 2
}`}</code>
              </pre>
            </section>

            {/* Troubleshoot */}
            <section id="troubleshoot">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Troubleshooting</h2>

              <div className="space-y-4">
                {[
                  {
                    q: 'The daemon fails to start',
                    a: 'Ensure port 7350 is free: lsof -i :7350. If another process is using it, either kill it or set a custom port in .woozcode.json with "port": 7351.',
                  },
                  {
                    q: 'Output quality has degraded',
                    a: 'Switch compression.level from "aggressive" to "balanced" or "light". Aggressive mode removes more context and may affect model reasoning on complex tasks.',
                  },
                  {
                    q: 'Token count is not reduced',
                    a: 'Verify that wooz start is running and that your integration points to localhost:7350. Check wooz status for daemon health.',
                  },
                  {
                    q: 'Permission denied errors on macOS',
                    a: 'Run sudo wooz init once to set the required filesystem permissions, then switch back to a non-root user for all subsequent commands.',
                  },
                ].map((item) => (
                  <details key={item.q} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                      {item.q}
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
