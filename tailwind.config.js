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
        'color-1': '#13213c',
        'color-2': '#fca311',
        'color-3': '#d2d2d2',
        'color-4': '#ffffff',
      }
    },
  },
  plugins: [],
}

