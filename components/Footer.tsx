import Link from 'next/link'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Landing', href: '/' },
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
    title: 'Socials',
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'Discord', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'License', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">
                w
              </span>
              <span className="font-bold text-white tracking-tight text-[15px]">woozcode</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              The plugin that cuts your AI costs in half. Runs fully on your machine.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
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

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
