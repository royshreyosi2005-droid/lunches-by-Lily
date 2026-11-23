/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#F7F4EC',
          cream: '#EFE9DC',
          forest: '#263D30',
          forestLight: '#324E3E',
          forestDark: '#1C2E24',
          sage: '#A5AD91',
          sageLight: '#CAD0BD',
          terracotta: '#C87551',
          terracottaDark: '#AC5D3C',
          charcoal: '#252721',
          charcoalLight: '#3C3F37',
          charcoalMuted: '#686B62'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(37, 39, 33, 0.05)',
        'elevated': '0 10px 30px -4px rgba(37, 39, 33, 0.08), 0 4px 12px -2px rgba(37, 39, 33, 0.04)',
        'modal': '0 25px 50px -12px rgba(37, 39, 33, 0.25)',
      }
    },
  },
  plugins: [],
};
