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
        <meta property="og:description" content="Personal blog by Shivam Anand — thoughts on building, life, and everything in between." />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="pt-12 pb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
          Hey, I'm Shivam.
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
          I build things and write about the process. This is my corner of the internet.
        </p>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-sm font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-6">
          Writing
        </h2>

        {loading ? (
          <p className="text-stone-400">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="space-y-1">
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
                  className="group flex items-baseline justify-between py-3 -mx-3 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                >
                  <span className="text-stone-800 dark:text-stone-200 group-hover:text-stone-950 dark:group-hover:text-stone-50 transition-colors">
                    {post.frontmatter.title}
                  </span>
                  <span className="text-sm text-stone-400 dark:text-stone-500 ml-4 shrink-0 tabular-nums">
                    {formattedDate}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-stone-400">No posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
