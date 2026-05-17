import Link from 'next/link'
import Logo from './Logo'

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
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <Logo size={28} />
              <span className="font-bold text-white tracking-tight text-[15px]">woozcode</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The plugin that cuts your AI costs in half. Runs fully on your machine.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
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
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-xs text-gray-600">Local-first. Zero cloud dependency.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
