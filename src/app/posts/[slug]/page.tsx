import { format } from 'date-fns'
import Image from 'next/image'

// This will be replaced with actual blog post fetching logic
const getPost = (slug: string) => {
  return {
    title: 'Welcome to My Blog',
    date: '2024-03-20',
    content: `
      <p>Welcome to my new blog! This is where I'll be sharing my thoughts, essays, and writings.</p>
      
      <h2>What to Expect</h2>
      <p>I'll be writing about various topics that interest me, sharing my perspectives, and documenting my journey through life.</p>
      
      <h2>About Me</h2>
      <p>I'm passionate about writing and sharing ideas. This blog is my digital garden where I can cultivate and share my thoughts with the world.</p>
    `,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </time>
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
} 