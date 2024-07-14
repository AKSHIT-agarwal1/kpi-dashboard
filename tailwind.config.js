/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#119F97',
      destructive: '#FF5D39',
      white: '#ffff',
      black: '#000000CC'
    },
    fontSize: {
      sm: ['0.875rem', {
        lineHeight: '1.25rem',
        fontWeight: '400',
      }],
      base: ['0.875rem', {
        lineHeight: '1.25rem',
        fontWeight: '500',
      }],
      lg: ['1.75rem', {
        lineHeight: '2.25rem',
        fontWeight: '500',
      }],
    }
  },
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'lg:grid-cols-1',
    'lg:grid-cols-2',
    'lg:grid-cols-3',
    'sm:grid-cols-2',
    'sm:grid-cols-1',
    'border-r',
    'border-black',
    'text-[#119F97]',
    'text-[#FF5D39]',
    'text-[#000000CC]',
    'pr-6'
  ],
  variants: {
    extend: {
      visibility: ['hover'],
    },
  },
  plugins: [],
}
