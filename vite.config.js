import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter
      ],
      /* mdx options */
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'public/*',
          dest: '.'
        }
      ]
    })
  ],
  optimizeDeps: {
    include: ['react/jsx-runtime']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
}); 