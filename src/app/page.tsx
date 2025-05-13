import Link from 'next/link'
import { format } from 'date-fns'

// This will be replaced with actual blog post fetching logic
const posts = [
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: '2024-03-20',
    excerpt: 'This is the first post on my new blog. I\'ll be sharing my thoughts, essays, and writings here.',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-serif font-bold mb-8">Latest Writings</h1>
      </div>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <Link href={`/posts/${post.slug}`} className="block group">
              <h2 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-gray-700 mb-2">
                {post.title}
              </h2>
              <time className="text-sm text-gray-500">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              <p className="mt-3 text-gray-600">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 