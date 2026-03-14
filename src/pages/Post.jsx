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
    return <p style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>Loading...</p>;
  }

  if (error || !post) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{error || 'Post not found.'}</p>
        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }}>
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
    "author": { "@type": "Person", "name": "Shivam Anand" },
    "image": frontmatter.coverImage ? `${window.location.origin}${frontmatter.coverImage}` : undefined,
    "description": frontmatter.excerpt,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
  };

  return (
    <article style={{ padding: '32px 0' }}>
      <Helmet>
        <title>{frontmatter.title} — Shivam Anand</title>
        <meta name="description" content={frontmatter.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        {frontmatter.coverImage && <meta property="og:image" content={`${window.location.origin}${frontmatter.coverImage}`} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Back */}
      <Link
        to="/"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none',
          marginBottom: '48px', transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Link>

      {/* Header */}
      <header style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: 'clamp(28px, 4.5vw, 40px)',
          fontWeight: 500, color: 'var(--text)',
          lineHeight: 1.25, marginBottom: '12px', letterSpacing: '-0.02em',
        }}>
          {frontmatter.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          {formattedDate} &middot; {readingTime} min read
        </p>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert lg:prose-lg max-w-none">
        <MDXProvider components={components}>
          <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading content...</div>}>
            {ContentComponent ? <ContentComponent /> : <p>Error rendering content.</p>}
          </Suspense>
        </MDXProvider>
      </div>

      {/* Nav */}
      {(prevPost || nextPost) && (
        <nav style={{
          marginTop: '64px', paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', fontSize: '14px',
        }}>
          <div>
            {prevPost && (
              <Link to={`/posts/${prevPost.slug}`}
                style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >&larr; {prevPost.frontmatter.title}</Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link to={`/posts/${nextPost.slug}`}
                style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{nextPost.frontmatter.title} &rarr;</Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
};

export default Post;
