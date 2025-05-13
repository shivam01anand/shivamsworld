import React from 'react';

const MarkdownImage = ({ src, alt, caption }) => {
  return (
    <figure className="my-6 flex flex-col items-center">
      <img 
        src={src} 
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-md object-contain"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MarkdownImage; 