/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'stone': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.700'),
            lineHeight: '1.8',
            fontSize: '1.125rem',
            a: {
              color: theme('colors.stone.900'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: theme('colors.stone.300'),
              '&:hover': {
                textDecorationColor: theme('colors.stone.900'),
              },
            },
            'h1, h2, h3': {
              fontFamily: theme('fontFamily.serif').join(', '),
              color: theme('colors.stone.900'),
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.stone.300'),
              color: theme('colors.stone.600'),
              fontStyle: 'italic',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.stone.300'),
            a: {
              color: theme('colors.stone.100'),
              textDecorationColor: theme('colors.stone.600'),
              '&:hover': {
                textDecorationColor: theme('colors.stone.100'),
              },
            },
            'h1, h2, h3': {
              color: theme('colors.stone.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.stone.700'),
              color: theme('colors.stone.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
