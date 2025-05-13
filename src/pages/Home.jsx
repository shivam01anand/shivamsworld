import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PostCard from '../components/PostCard';
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
        // Handle error state here, maybe show a message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full">
      <Helmet>
        <title>Shivam Anand - Blog</title>
        <meta name="description" content="A personal blog by Shivam Anand about tech, design, and more." />
        <link rel="canonical" href={window.location.origin} />
        {/* Add other SEO tags like Open Graph here */}
        <meta property="og:title" content="Shivam Anand - Blog" />
        <meta property="og:description" content="A personal blog by Shivam Anand about tech, design, and more." />
        {/* <meta property="og:image" content="URL_TO_YOUR_DEFAULT_OG_IMAGE" /> */}
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="block w-full text-4xl font-serif font-bold mb-8 text-center">Latest Posts</h1>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">No posts found.</p>
      )}
    </div>
  );
};

export default Home; 