import Link from 'next/link'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Download', href: '/download' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/blog' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Installation', href: '/docs#installation' },
      { label: 'Setup Guide', href: '/docs#setup' },
      { label: 'API Usage', href: '/docs#api' },
      { label: 'Troubleshooting', href: '/docs#troubleshoot' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/yusufsafary/woozcode' },
      { label: 'Twitter / X', href: 'https://x.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'License (MIT)', href: 'https://github.com/yusufsafary/woozcode' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">
                w
              </span>
              <span className="font-bold text-white tracking-tight text-[15px]">woozcode</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              The plugin that cuts your AI costs in half. Runs fully on your machine.
            </p>
            <a
              href="https://github.com/yusufsafary/woozcode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} woozcode. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built for developers who care about costs.
          </p>
        </div>
      </div>
    </footer>
  )
}
