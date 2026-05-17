import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download woozcode and start reducing your AI token costs in under 60 seconds.',
}

const releases = [
  {
    version: 'v1.0.2',
    date: 'May 14, 2025',
    tag: 'Latest',
    notes: [
      'Fixed semantic cache index corruption on Windows',
      'Improved compression ratio for Python docstrings',
      'Added --dry-run flag to wooz compress',
    ],
  },
  {
    version: 'v1.0.1',
    date: 'Apr 30, 2025',
    tag: null,
    notes: [
      'Fixed daemon restart loop on macOS Ventura',
      'Reduced memory usage by 22% during idle',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'Mar 5, 2025',
    tag: 'Initial release',
    notes: [
      'First public release',
      'Core compression engine',
      'wooz compress, wooz context, wooz diff tools',
      'Local daemon with REST API',
      'Node.js SDK',
    ],
  },
]

export default function DownloadPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Download</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3">Get woozcode</h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Install in under 60 seconds. No account required. Runs entirely on your machine.
          </p>
        </div>

        {/* Install options */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'npm', cmd: 'npm install -g woozcode', icon: 'N' },
            { label: 'yarn', cmd: 'yarn global add woozcode', icon: 'Y' },
            { label: 'pnpm', cmd: 'pnpm add -g woozcode', icon: 'P' },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-2xl border border-gray-200 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 transition-all group">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-md bg-gray-100 group-hover:bg-accent/10 text-gray-500 group-hover:text-accent text-xs font-bold flex items-center justify-center transition-all">
                  {item.icon}
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span>
              </div>
              <pre className="font-mono text-sm text-gray-700 bg-gray-50 rounded-lg p-3 overflow-x-auto">
                <code>$ {item.cmd}</code>
              </pre>
            </div>
          ))}
        </div>

        {/* Quick start */}
        <div className="bg-gray-950 rounded-2xl p-6 mb-12">
          <h2 className="text-base font-bold text-white mb-5">Quick start</h2>
          <div className="space-y-3">
            {[
              { step: '1', cmd: 'npm install -g woozcode', label: 'Install globally' },
              { step: '2', cmd: 'wooz init', label: 'Initialize in your project' },
              { step: '3', cmd: 'wooz start', label: 'Start the local daemon' },
              { step: '4', cmd: 'wooz status', label: 'Verify it is running' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </span>
                <pre className="font-mono text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2 border border-white/8 flex-1 overflow-x-auto">
                  <code>$ {item.cmd}</code>
                </pre>
                <span className="text-xs text-gray-600 hidden sm:block whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Binary downloads */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Direct download</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { os: 'macOS (Apple Silicon)', file: 'woozcode-macos-arm64.tar.gz' },
              { os: 'macOS (Intel)', file: 'woozcode-macos-x64.tar.gz' },
              { os: 'Linux x64', file: 'woozcode-linux-x64.tar.gz' },
              { os: 'Linux ARM64', file: 'woozcode-linux-arm64.tar.gz' },
              { os: 'Windows x64', file: 'woozcode-win-x64.zip' },
            ].map((item) => (
              <button key={item.os} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-accent/30 hover:bg-gray-50 text-left transition-all group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-800">{item.os}</div>
                  <div className="text-xs text-gray-400 font-mono">{item.file}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Release notes */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Release notes</h2>
          <div className="space-y-4">
            {releases.map((r) => (
              <div key={r.version} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <code className="text-sm font-mono font-bold text-gray-900">{r.version}</code>
                  {r.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">{r.tag}</span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                </div>
                <ul className="space-y-1.5">
                  {r.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
