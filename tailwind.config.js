/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: 'var(--text)',
            lineHeight: '1.8',
            fontSize: '1.0625rem',
            a: {
              color: 'var(--accent)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              fontWeight: 'inherit',
              '&:hover': {
                color: 'var(--accent-hover)',
              },
            },
            strong: {
              color: 'var(--text)',
              fontWeight: 600,
            },
            'h1, h2, h3, h4': {
              color: 'var(--text)',
              fontFamily: "'Newsreader', Georgia, serif",
              fontWeight: 500,
              letterSpacing: '-0.02em',
            },
            blockquote: {
              borderLeftColor: 'var(--border)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            },
            code: {
              color: 'var(--text)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.875em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            hr: {
              borderColor: 'var(--border)',
            },
            'ul > li::marker': {
              color: 'var(--text-muted)',
            },
            'ol > li::marker': {
              color: 'var(--text-muted)',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--text)',
            '--tw-prose-counters': 'var(--text-muted)',
            '--tw-prose-bullets': 'var(--text-muted)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--text-secondary)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-code': 'var(--text)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
