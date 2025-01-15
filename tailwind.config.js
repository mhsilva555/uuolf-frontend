/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#c1946a',
        'color-2': '#754716',
        'color-3': '#272727',
        'color-4': '#e8e8e8',
      }
    },
  },
  plugins: [],
}

