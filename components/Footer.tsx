import Link from 'next/link'
import Logo from './Logo'

const cols = [
  { title: 'Product', links: [{ l: 'Home', h: '/' }, { l: 'Download', h: '/download' }, { l: 'Pricing', h: '/pricing' }, { l: 'Changelog', h: '/blog' }] },
  { title: 'Docs',    links: [{ l: 'Installation', h: '/docs#installation' }, { l: 'Setup Guide', h: '/docs#setup' }, { l: 'API Usage', h: '/docs#api' }, { l: 'Troubleshooting', h: '/docs#troubleshoot' }] },
  { title: 'Company', links: [{ l: 'Blog', h: '/blog' }, { l: 'Contact', h: '/contact' }, { l: 'Privacy', h: '#' }, { l: 'Terms', h: '#' }] },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <Logo size={26} />
              <span className="font-display font-semibold text-white text-sm tracking-tight">woozcode</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">Cuts AI token costs in half. Runs fully on your machine.</p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(lk => (
                  <li key={lk.l}><Link href={lk.h} className="text-sm text-gray-500 hover:text-white transition-colors">{lk.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} woozcode. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p className="text-xs text-gray-600">Local-first. Zero cloud dependency.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
