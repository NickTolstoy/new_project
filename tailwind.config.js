/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0D0F',
        'bg-secondary': '#141414',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B3B3B3',
        'accent-blue': '#00B7FF',
        'accent-green': '#00E38C',
        'cta-hover': '#00CBAD', // mix between blue and green
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 32px rgba(0, 183, 255, 0.35)',
        'neon-green': '0 0 32px rgba(0, 227, 140, 0.35)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
} 