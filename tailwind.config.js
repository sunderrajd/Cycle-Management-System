/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p1: '#41bc2e',
        p2: '#f9fff1',
        p4: '#e7ffc7',
        p3: '#12141D',
      },
    },
  },
  plugins: [],
}
