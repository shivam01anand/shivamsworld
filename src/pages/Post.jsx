import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getAllPosts } from '../utils/postUtils';
import MarkdownImage from '../components/MarkdownImage'; // Import the image component
import { MDXProvider } from '@mdx-js/react';

// Make the image component available to MDX
const components = { 
  MarkdownImage 
};

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]); // To find next/prev
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      try {
        const postData = await getPostBySlug(slug);
        const postsList = await getAllPosts(); // Fetch all for next/prev links
        
        if (!postData) {
          setError('Post not found');
          // Optional: Redirect to 404 page or home
          // navigate('/'); 
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
    return <p className="text-center py-10">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  }

  if (!post) {
    // This case should ideally be handled by the error state or a redirect
    return <p className="text-center py-10">Post not found.</p>; 
  }

  // Find next and previous posts
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const { frontmatter, readingTime, ContentComponent } = post;
  const date = new Date(frontmatter.date);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  const canonicalUrl = `${window.location.origin}/posts/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "datePublished": frontmatter.date,
    // "dateModified": frontmatter.lastModifiedDate, // Add if available
    "author": {
      "@type": "Person",
      "name": "Shivam Anand" // Updated author name
    },
    "image": frontmatter.coverImage ? `${window.location.origin}${frontmatter.coverImage}` : undefined,
    "description": frontmatter.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto py-8 max-w-3xl">
      <Helmet>
        <title>{frontmatter.title} - Shivam Anand</title>
        <meta name="description" content={frontmatter.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        {frontmatter.coverImage && <meta property="og:image" content={`${window.location.origin}${frontmatter.coverImage}`} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        {/* Add JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <header className="mb-8 border-b pb-4 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-serif font-bold !mb-2">{frontmatter.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Published on {formattedDate} &bull; {readingTime} min read
        </p>
      </header>

      {/* Render the MDX content */}
      <MDXProvider components={components}>
        <Suspense fallback={<div>Loading content...</div>}>
           {ContentComponent ? <ContentComponent /> : <p>Error rendering content.</p>}
        </Suspense>
      </MDXProvider>
      
      {/* Navigation Links */}
      <nav className="mt-12 pt-6 border-t dark:border-gray-700 flex justify-between text-sm">
        <div>
          {prevPost && (
            <Link to={`/posts/${prevPost.slug}`} className="text-primary hover:text-accent dark:text-accent dark:hover:text-primary">
              &larr; Previous: {prevPost.frontmatter.title}
            </Link>
          )}
        </div>
        <div>
          {nextPost && (
            <Link to={`/posts/${nextPost.slug}`} className="text-primary hover:text-accent dark:text-accent dark:hover:text-primary">
              Next: {nextPost.frontmatter.title} &rarr;
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
};

export default Post; 