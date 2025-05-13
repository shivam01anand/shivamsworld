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
        'text': '#111111',
        'background': '#fdfdfd',
        'primary': '#3b82f6', // Example primary color, adjust as needed
        'secondary': '#6b7280', // Example secondary color
        'accent': '#10b981', // Example accent color
        'indigo': { // Adding indigo shades
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            lineHeight: '1.75', // leading-relaxed
            fontSize: '18px', // min 18px body
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.accent'),
              },
            },
            'h1, h2': {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            // Dark mode styles for typography
            '&[data-theme="dark"]': {
              color: theme('colors.background'),
              a: {
                color: theme('colors.accent'),
                '&:hover': {
                  color: theme('colors.primary'),
                },
              },
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