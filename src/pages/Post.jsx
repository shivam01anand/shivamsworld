import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getAllPosts } from '../utils/postUtils';
import MarkdownImage from '../components/MarkdownImage';
import { MDXProvider } from '@mdx-js/react';

const components = {
  MarkdownImage,
};

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      try {
        const postData = await getPostBySlug(slug);
        const postsList = await getAllPosts();

        if (!postData) {
          setError('Post not found');
        } else {
          setPost(postData);
          setAllPosts(postsList);
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [slug, navigate]);

  if (loading) {
    return <p className="text-center py-20 text-stone-400">Loading...</p>;
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 mb-4">{error || 'Post not found.'}</p>
        <Link to="/" className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm transition-colors">
          &larr; Back home
        </Link>
      </div>
    );
  }

  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const { frontmatter, readingTime, ContentComponent } = post;
  const date = new Date(frontmatter.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const canonicalUrl = `${window.location.origin}/posts/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "datePublished": frontmatter.date,
    "author": {
      "@type": "Person",
      "name": "Shivam Anand"
    },
    "image": frontmatter.coverImage ? `${window.location.origin}${frontmatter.coverImage}` : undefined,
    "description": frontmatter.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <article className="py-8">
      <Helmet>
        <title>{frontmatter.title} — Shivam Anand</title>
        <meta name="description" content={frontmatter.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        {frontmatter.coverImage && <meta property="og:image" content={`${window.location.origin}${frontmatter.coverImage}`} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center text-sm text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3 leading-tight">
          {frontmatter.title}
        </h1>
        <p className="text-sm text-stone-400 dark:text-stone-500">
          {formattedDate} &middot; {readingTime} min read
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert prose-stone max-w-none">
        <MDXProvider components={components}>
          <Suspense fallback={<div className="text-stone-400">Loading content...</div>}>
            {ContentComponent ? <ContentComponent /> : <p>Error rendering content.</p>}
          </Suspense>
        </MDXProvider>
      </div>

      {/* Navigation */}
      {(prevPost || nextPost) && (
        <nav className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 flex justify-between text-sm">
          <div>
            {prevPost && (
              <Link
                to={`/posts/${prevPost.slug}`}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                &larr; {prevPost.frontmatter.title}
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                to={`/posts/${nextPost.slug}`}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                {nextPost.frontmatter.title} &rarr;
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
};

export default Post;
