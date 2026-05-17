import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'woozcode — Cut your AI costs in half',
    template: '%s | woozcode',
  },
  description:
    'woozcode is a developer plugin that reduces AI token costs and runs fully on your machine. Install with one command and start saving.',
  keywords: ['AI', 'token reduction', 'local processing', 'developer tools', 'plugin'],
  authors: [{ name: 'woozcode' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://woozcode.com',
    siteName: 'woozcode',
    title: 'woozcode — Cut your AI costs in half',
    description: 'A plugin that reduces AI token costs and runs fully on your machine.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'woozcode — Cut your AI costs in half',
    description: 'A plugin that reduces AI token costs and runs fully on your machine.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
