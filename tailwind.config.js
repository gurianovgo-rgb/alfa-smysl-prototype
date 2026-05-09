/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'alfa-red': '#FF3B30',
        'alfa-green': '#30D158',
        'alfa-gray': '#8E8E93',
        'alfa-card': '#1a1a1a',
        'alfa-card2': '#2a2a2a',
      },
    },
  },
  plugins: [],
}
