import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the correct paths relative to the script location
const postsDirectory = path.join(__dirname, '../src/content');
const publicDirectory = path.join(__dirname, '../dist'); // Output to Vite's build dir

async function generateRssFeed() {
  const site_url = 'https://shivamsworld.com'; // Updated with your domain
  const feed = new RSS({
    title: 'Shivams World', // Updated title
    description: 'A personal blog by Shivam Anand.', // Updated description
    feed_url: `${site_url}/rss.xml`,
    site_url: site_url,
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContents);
      const slug = filename.replace(/\.mdx$/, '');
      return {
        slug,
        frontmatter,
      };
    })
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)); // Sort newest first

  posts.forEach(post => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url: `${site_url}/posts/${post.slug}`,
      guid: post.slug, // Unique identifier for the item
      date: new Date(post.frontmatter.date).toUTCString(), // Use the post's date
      // author: 'Your Name', // Optional: Add author per post if needed
    });
  });

  const rssXml = feed.xml({ indent: true });

  // Ensure the dist directory exists before writing the file
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), rssXml);
  console.log('RSS feed generated successfully at dist/rss.xml');
}

// Check if the script is being run directly
if (process.argv[1] === __filename) {
  generateRssFeed().catch(error => {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  });
}

export default generateRssFeed; // Export if needed elsewhere, though unlikely
