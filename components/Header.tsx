'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const nav = [
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Download', href: '/download' },
]

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_0_0_#f3f4f6]' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="font-display font-semibold text-gray-900 text-sm tracking-tight">woozcode</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {nav.map(item => (
            <Link key={item.href} href={item.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${pathname === item.href ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/Woozcode"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @Woozcode on X"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <XIcon size={15} />
          </a>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</Link>
          <Link href="/download" className="inline-flex items-center px-4 py-1.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black active:scale-95 transition-all">
            Get started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-gray-100 transition-colors">
          <span className={`block w-4.5 h-px bg-gray-800 rounded transition-all duration-200 ${open ? 'rotate-45 translate-y-[5px] w-[18px]' : 'w-[18px]'}`} />
          <span className={`block h-px bg-gray-800 rounded transition-all duration-200 ${open ? 'opacity-0 w-[18px]' : 'w-[14px]'}`} />
          <span className={`block h-px bg-gray-800 rounded transition-all duration-200 ${open ? '-rotate-45 -translate-y-[5px] w-[18px]' : 'w-[18px]'}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-5 pb-4 pt-1 animate-fade-in">
          <nav className="flex flex-col gap-0.5">
            {nav.map(item => (
              <Link key={item.href} href={item.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${pathname === item.href ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">Contact</Link>
            <a
              href="https://x.com/Woozcode"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <XIcon size={14} />
              Follow on X
            </a>
            <Link href="/download" className="mt-2 flex items-center justify-center px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors">
              Get started
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
