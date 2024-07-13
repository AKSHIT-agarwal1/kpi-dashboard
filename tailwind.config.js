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
    }
  },
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'lg:grid-cols-1',
    'lg:grid-cols-2',
    'lg:grid-cols-3',
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
