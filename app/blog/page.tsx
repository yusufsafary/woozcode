import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on AI tooling, token economics, and local-first development from the woozcode team.',
}

const posts = [
  {
    slug: 'how-we-cut-token-costs-60-percent',
    title: 'How we cut token costs by 60% without changing models',
    date: 'May 12, 2026',
    readTime: '7 min',
    tag: 'Engineering',
    excerpt:
      'A breakdown of the compression techniques we use internally, and why context pruning beats prompt engineering for cost reduction.',
  },
  {
    slug: 'local-first-ai-tooling',
    title: 'The case for local-first AI tooling',
    date: 'Apr 28, 2026',
    readTime: '5 min',
    tag: 'Product',
    excerpt:
      'Why every serious development team should be running AI infrastructure on their own hardware, and what trade-offs to expect.',
  },
  {
    slug: 'semantic-cache-explained',
    title: 'Semantic cache: skip the API call entirely',
    date: 'Apr 10, 2026',
    readTime: '9 min',
    tag: 'Engineering',
    excerpt:
      'A deep dive into how embedding-based caching works, when it helps, and how we tune the similarity threshold for precision.',
  },
  {
    slug: 'token-economics-2026',
    title: 'Token economics in 2026: what developers actually pay',
    date: 'Mar 22, 2026',
    readTime: '6 min',
    tag: 'Insights',
    excerpt:
      'We analyzed 100 anonymized codebases to understand where token spend goes. The results were surprising.',
  },
  {
    slug: 'woozcode-v1-release',
    title: 'Announcing woozcode v1.0',
    date: 'Mar 5, 2026',
    readTime: '4 min',
    tag: 'Release',
    excerpt:
      'After six months in private beta, woozcode is now available to everyone. Here is what we built and where we are going next.',
  },
]

const tagColors: Record<string, string> = {
  Engineering: 'bg-blue-50 text-blue-700',
  Product: 'bg-purple-50 text-purple-700',
  Insights: 'bg-amber-50 text-amber-700',
  Release: 'bg-green-50 text-green-700',
}

export default function BlogPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-14">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">Blog</span>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Writing
          </h1>
          <p className="text-gray-500">
            Thoughts on AI tooling, token economics, and local-first development.
          </p>
        </div>

        {/* Tag filter strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Engineering', 'Product', 'Insights', 'Release'].map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-default ${
                tag === 'All'
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-4 py-6 hover:bg-gray-50/50 -mx-3 px-3 rounded-xl transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${tagColors[post.tag] || 'bg-gray-100 text-gray-600'}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">{post.readTime} read</span>
                </div>
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-accent transition-colors mb-1.5 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
