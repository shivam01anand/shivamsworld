import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/postUtils';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shivam Anand</title>
        <meta name="description" content="Personal blog by Shivam Anand — thoughts on building, life, and everything in between." />
        <link rel="canonical" href={window.location.origin} />
        <meta property="og:title" content="Shivam Anand" />
        <meta property="og:description" content="Personal blog by Shivam Anand." />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '56px' }}>
        <h1 style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: 'clamp(32px, 5vw, 44px)',
          fontWeight: 500,
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          Hey, I'm Shivam.
        </h1>
        <p style={{
          fontSize: '17px',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: '480px',
        }}>
          I build things and write about the process. This is my corner of the internet.
        </p>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '40px' }} />

      {/* Posts */}
      <section style={{ paddingBottom: '64px' }}>
        <h2 style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '24px',
        }}>
          Writing
        </h2>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        ) : posts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {posts.map((post) => {
              const date = new Date(post.frontmatter.date);
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <Link
                  key={post.slug}
                  to={`/posts/${post.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '12px',
                    margin: '0 -12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ color: 'var(--text)', fontSize: '16px' }}>
                    {post.frontmatter.title}
                  </span>
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    marginLeft: '16px',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {formattedDate}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
