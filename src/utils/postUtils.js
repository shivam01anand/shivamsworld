import fm from 'front-matter';

export async function getAllPosts() {
  console.log('Running getAllPosts...'); // Log entry
  const mdxFiles = import.meta.glob('../content/*.mdx', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  });
  console.log('Glob result (mdxFiles):', mdxFiles); // Log the glob result
  
  const posts = Object.entries(mdxFiles).map(([filepath, fileModule]) => {
    console.log(`Processing file: ${filepath}`); // Log each file being processed
    // Ensure rawContent is treated as a string before passing to front-matter
    const rawContent = String(fileModule);
    try {
      // Use front-matter (fm) to parse
      const { attributes: frontmatter } = fm(rawContent);
      const slug = filepath.replace(/^\.\.\/content\/(.*)\.mdx$/, '$1');
      console.log(`  - Slug: ${slug}, Frontmatter:`, frontmatter); // Log success
      return {
        slug,
        frontmatter, // attributes field is the frontmatter
      };
    } catch (e) {
      console.error(`  - Error processing ${filepath}:`, e); // Log errors during processing
      return null; // Return null for errors
    }
  }).filter(post => post !== null); // Filter out any null results from errors

  // Sort posts by date, newest first
  posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  
  console.log('Processed posts:', posts); // Log the final list
  return posts;
}

export async function getPostBySlug(slug) {
  try {
    // 1. Get the raw MDX content string
    const rawFileModule = await import(`../content/${slug}.mdx?raw`);
    const rawContentString = String(rawFileModule.default);

    // 2. Use 'front-matter' (fm) to reliably parse attributes and body from the raw string
    const { attributes: frontmatter, body: contentBody } = fm(rawContentString);

    // 3. Import the MDX module to get the React component for rendering.
    //    The remark plugins (remark-frontmatter, remark-mdx-frontmatter)
    //    should have processed this to remove the frontmatter block from the component.
    const mdxModule = await import(`../content/${slug}.mdx`);
    const ContentComponent = mdxModule.default;
    
    // Optionally check if remark-mdx-frontmatter provided a named export (mdxModule.frontmatter)
    // This can be useful for debugging but we are using fm() for data reliability here.
    if (mdxModule.frontmatter) {
      console.log(`Named 'frontmatter' export found in ${slug}.mdx module:`, mdxModule.frontmatter);
    } else {
      console.warn(`Named 'frontmatter' export NOT found in ${slug}.mdx module. Using fm() parsed data.`);
    }

    // 4. Calculate reading time from the body content obtained by fm()
    const words = contentBody.split(/\s+/g).length;
    const readingTime = Math.ceil(words / 200);

    return {
      slug,
      frontmatter,      // Data from fm()
      content: contentBody,  // Body from fm() (for reading time, etc.)
      ContentComponent, // Component from MDX import (should be clean)
      readingTime
    };
  } catch (e) {
    console.error(`Error in getPostBySlug for ${slug}:`, e);
    return null;
  }
} 