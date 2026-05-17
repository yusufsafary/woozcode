import type { Metadata } from 'next'
import Link from 'next/link'

const posts: Record<string, { title: string; date: string; readTime: string; tag: string; body: string }> = {
  'how-we-cut-token-costs-60-percent': {
    title: 'How we cut token costs by 60% without changing models',
    date: 'May 12, 2025',
    readTime: '7 min',
    tag: 'Engineering',
    body: `When we started building woozcode, the goal was simple: reduce what developers pay to run AI without changing a single line of their workflow. No model swaps, no prompt rewriting, no cloud dependency.

The number we kept coming back to was context size. Most AI requests in development environments carry enormous amounts of redundant content: repeated imports, commented-out blocks, full file trees when only a function is relevant. That redundancy compounds directly into cost.

## What we actually compress

The compression pipeline works in three stages.

**Stage 1: Structural pruning.** We parse the input as code and remove elements that carry no semantic weight in the current context. Commented-out lines, duplicate import declarations, and empty blocks go first. This alone accounts for 20-30% of the reduction in typical TypeScript projects.

**Stage 2: Context windowing.** Long files get trimmed to the relevant scope. If the query concerns a specific function, we keep that function, its direct dependencies, and a narrow surrounding window. The rest is summarized with a token-efficient placeholder.

**Stage 3: Deduplication.** In multi-turn conversations, the same boilerplate often gets resent with every message. We diff against the previous turn and strip unchanged segments, replacing them with a compact reference.

Combined, these stages produce a 40-60% reduction on typical developer prompts.

## What we do not touch

We never compress the user's explicit instruction. The directive stays verbatim. We also preserve anything the model would need to reason structurally, such as type signatures, interface definitions, and error messages.

## Results in the wild

Across our beta cohort, median token reduction was 54%. The range was wide: projects with lots of documentation comments saw 68% reductions; lean, well-factored codebases with few comments saw around 35%. Either way, the bill went down.

The one consistent surprise: teams using woozcode with GPT-4o reported no measurable quality degradation at balanced compression. At aggressive compression, about 8% of teams reported occasional context gaps, which they resolved by switching specific tasks back to balanced mode.

## What comes next

We are working on a smarter context selection model that learns which parts of your codebase are relevant to which kinds of tasks. Early results on our internal dataset are promising. Expect a post when we have more to share.`,
  },
  'local-first-ai-tooling': {
    title: 'The case for local-first AI tooling',
    date: 'Apr 28, 2025',
    readTime: '5 min',
    tag: 'Product',
    body: `There is a quiet trend in developer tooling that does not get enough attention: the move back toward the local machine.

For the past three years, every interesting developer tool seemed to assume the cloud. Compute lived on servers. Data flowed through APIs. The local machine was just a display terminal for remote work.

That model has real advantages. But it also has real costs, and those costs are becoming harder to ignore.

## What local-first gets right

When processing happens on your machine, several things become easier.

**Latency drops to near zero for local operations.** There is no round trip. When woozcode compresses a prompt, it happens in two to four milliseconds. No network timeout. No cold start.

**Your data stays yours.** Every prompt you send to a hosted compression layer is a prompt you have disclosed to a third party. With local processing, nothing leaves unless you explicitly send it. For teams working on proprietary codebases, this matters.

**Costs become predictable.** Cloud usage is billed per request, per token, per gigabyte. Local processing is billed once, at hardware cost, and that cost is already paid.

## The real trade-off

Local-first is not free. You are trading server-side elasticity for fixed local capacity. A compression daemon that runs fine on your 16-core workstation may behave differently on a budget CI runner.

We have tried to design around this. Woozcode's resource footprint is intentionally small. The daemon uses under 50MB of memory at idle and throttles its CPU usage below a configurable ceiling.

The other trade-off is setup. Local-first tools require installation and configuration. We have tried to reduce this to a single command, but it is still more friction than a hosted API.

## Where this is going

The tools that win the next cycle will be the ones that run closest to the developer. Local processing, local storage, local reasoning where possible. The cloud becomes a transport layer, not an execution environment.

Woozcode is our contribution to that direction. We are building for developers who want control over their toolchain, not just convenience.`,
  },
  'semantic-cache-explained': {
    title: 'Semantic cache: skip the API call entirely',
    date: 'Apr 10, 2025',
    readTime: '9 min',
    tag: 'Engineering',
    body: `The most expensive API call is the one you make twice.

In production AI applications, a surprising percentage of requests are near-duplicates. A user asks the same question in slightly different words. A code assistant gets called on the same function twice in an afternoon. A summarization pipeline reprocesses documents that have barely changed.

Semantic caching addresses this by matching new requests against previous ones based on meaning, not exact text.

## How it works

When a request comes in, we generate an embedding. This is a vector representation of the prompt's meaning, produced by a small local embedding model. We then perform a nearest-neighbor search against our cache index.

If the similarity score exceeds the threshold (0.92 by default), we return the cached response immediately. The API never gets called.

If the score falls below the threshold, we compress and forward the request as usual, then store the result in the cache with its embedding for future lookups.

## Choosing the threshold

The threshold is the single most important parameter. Set it too high and you will miss valid cache hits. Set it too low and you will return incorrect responses for semantically different queries.

In our testing, 0.92 strikes the right balance for code-related prompts. For conversational or open-ended prompts, we recommend 0.95. The threshold is configurable per request type in your .woozcode.json.

## What to expect

In a typical development session with a lot of iteration on the same codebase, semantic cache hit rates run between 15% and 35%. That range sounds modest, but each hit eliminates an API call entirely, including its latency.

The cache is stored locally as a flat binary index. It persists across sessions and can be cleared with wooz cache clear. You can also inspect cache statistics with wooz cache stats.

## Limitations

Semantic caching is not suitable for prompts that depend on real-time data, user-specific state, or random variation. For these, disable caching on a per-call basis using the skipCache: true option.`,
  },
  'token-economics-2025': {
    title: 'Token economics in 2025: what developers actually pay',
    date: 'Mar 22, 2025',
    readTime: '6 min',
    tag: 'Insights',
    body: `We analyzed 100 anonymized codebases from our beta cohort. We wanted to understand where token spend actually goes in real development workflows.

The results reshaped how we think about compression.

## Where the tokens go

The biggest surprise was how much context gets repeated. Across the dataset, 41% of tokens sent to an AI API were exact or near-exact duplicates of content sent in a previous message within the same session.

The breakdown:
- 22% repeated import blocks and type definitions
- 11% commented-out code that developers had not yet deleted
- 8% documentation strings on unchanged functions
- 41% intentional context

That last number is the floor. Even with perfect compression, you are paying for that 41% of meaningful tokens. Everything else is recoverable.

## Which languages waste the most

TypeScript and Python stood out as the most wasteful, for different reasons.

TypeScript projects tend to include large type definition files that get attached as context even when the relevant types are only a small fraction of the file.

Python projects suffer from verbose docstrings. Well-documented Python code is often 40-50% comments by token count.

Go and Rust projects were the leanest. Idiomatic code in these languages tends to be dense and explicit, with less ambient verbosity.

## What this means for tooling

If you are paying attention to AI costs, the first thing to optimize is not your model choice. It is your context construction.

The model price differences between GPT-4o, Claude Sonnet, and Mistral Large are significant, but they are fixed per token. The number of tokens you send is entirely within your control.

Woozcode exists because this optimization is mechanical and tedious to do by hand. We have automated the parts that are safe to automate, and left the judgment calls to developers.`,
  },
  'woozcode-v1-release': {
    title: 'Announcing woozcode v1.0',
    date: 'Mar 5, 2025',
    readTime: '4 min',
    tag: 'Release',
    body: `After six months in private beta with 300 developers across 18 countries, woozcode is now available to everyone.

## What we built

Woozcode is a local plugin that compresses AI prompts before they leave your machine. It reduces token usage by 40-60% on typical development workloads with no change to model, workflow, or output quality.

The v1.0 release includes:
- wooz compress: core prompt compression
- wooz context: intelligent file context selection
- wooz diff: incremental prompt diffing for multi-turn sessions
- Local daemon with REST API and Node.js SDK
- Usage dashboard with per-session analytics
- Support for OpenAI, Anthropic, Mistral, and any OpenAI-compatible endpoint

## What we learned in beta

The beta taught us two things we had not expected.

First, the quality concern is smaller than developers expect. We heard from beta users that they expected compression to degrade output quality noticeably. In practice, at balanced compression level, the difference is imperceptible on the vast majority of tasks. The model is robust to missing whitespace, duplicate imports, and commented-out dead code.

Second, the savings are larger than the headline numbers suggest. A 60% reduction in prompt tokens reduces both input and output costs, since shorter prompts correlate with shorter outputs in many task types. Several beta users reported total bill reductions of 70-75%.

## Where we go next

The roadmap for v1.1 includes the semantic cache (currently in Pro beta), a VSCode extension for inline usage visibility, and support for streaming compression so the daemon can work on tokens as they arrive rather than waiting for the full prompt.

Woozcode is free for individuals. Pro plans are available for teams with higher volume and advanced tooling needs. We are grateful to every developer who tested the beta, filed issues, and pushed the tool to its limits.`,
  },
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.body.slice(0, 155) + '...',
  }
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug]

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Post not found</h1>
          <Link href="/blog" className="text-accent hover:underline text-sm">Back to blog</Link>
        </div>
      </div>
    )
  }

  const paragraphs = post.body.split('\n\n')

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{post.tag}</span>
            <span className="text-xs text-gray-400">{post.date}</span>
            <span className="text-xs text-gray-400">{post.readTime} read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
            {post.title}
          </h1>
        </header>

        <article className="space-y-5">
          {paragraphs.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-bold text-gray-900 mt-10 mb-2">
                  {block.slice(3)}
                </h2>
              )
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter((l) => l.startsWith('- '))
              return (
                <ul key={i} className="space-y-2 pl-4">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600 text-[15px] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {item.slice(2)}
                    </li>
                  ))}
                </ul>
              )
            }
            if (block.startsWith('**') && block.includes(':**')) {
              const [bold, ...rest] = block.split(':**')
              return (
                <p key={i} className="text-[15px] text-gray-600 leading-relaxed">
                  <strong className="font-semibold text-gray-900">{bold.replace('**', '')}:</strong>
                  {rest.join(':**')}
                </p>
              )
            }
            return (
              <p key={i} className="text-[15px] text-gray-600 leading-relaxed">
                {block}
              </p>
            )
          })}
        </article>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Written by the woozcode team</p>
            <p className="text-xs text-gray-400 mt-0.5">Building tools for developers who care about costs.</p>
          </div>
          <Link
            href="/download"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-600 transition-all active:scale-95"
          >
            Try woozcode free
          </Link>
        </div>
      </div>
    </div>
  )
}
