import type { MetadataRoute } from 'next'

const posts = [
  'how-we-cut-token-costs-60-percent',
  'local-first-ai-tooling',
  'semantic-cache-explained',
  'token-economics-2025',
  'woozcode-v1-release',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.woozcode.fun'
  const staticRoutes = ['', '/pricing', '/docs', '/download', '/blog', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))
  const postRoutes = posts.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  return [...staticRoutes, ...postRoutes]
}
