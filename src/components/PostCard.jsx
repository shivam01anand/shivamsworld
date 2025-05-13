import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { slug, frontmatter } = post;
  const date = new Date(frontmatter.date);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

  return (
    <Link 
      to={`/posts/${slug}`}
      className="block p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-2xl font-serif font-semibold mb-2 text-indigo-600 dark:text-indigo-500">{frontmatter.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{formattedDate}</p>
      {/* <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{frontmatter.excerpt}</p> */}
    </Link>
  );
};

export default PostCard; 