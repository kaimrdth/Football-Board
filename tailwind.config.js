/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          green: '#7eec70',
          line: 'rgba(0, 0, 0, 0.42)',
        },
        team: {
          red: 'rgba(255, 68, 68, 0.8)',
          blue: 'rgba(68, 68, 255, 0.8)',
        }
      },
      animation: {
        'player-hover': 'scale 0.2s ease',
      }
    },
  },
  plugins: [],
}