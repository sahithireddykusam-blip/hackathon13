/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          navy: '#101828',
          deep: '#172235',
          surface: '#1D2939',
          border: '#283548',
          subtle: '#223044'
        },
        electric: {
          teal: '#36D6C5',
          'teal-hover': '#2bc2b2',
          'teal-dim': 'rgba(54, 214, 197, 0.15)',
          'teal-glow': 'rgba(54, 214, 197, 0.25)'
        },
        warm: {
          amber: '#F5B942',
          'amber-hover': '#e4a730',
          'amber-dim': 'rgba(245, 185, 66, 0.15)',
          'amber-glow': 'rgba(245, 185, 66, 0.25)'
        },
        light: {
          bg: '#F7F6F2',
          card: '#FFFFFF',
          text: '#172033',
          muted: '#667085',
          border: '#E4E7EC',
          surface: '#EEF2F5'
        },
        status: {
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      boxShadow: {
        'midnight': '0 4px 20px -2px rgba(16, 24, 40, 0.4)',
        'teal-glow': '0 0 20px -3px rgba(54, 214, 197, 0.35)',
        'amber-glow': '0 0 20px -3px rgba(245, 185, 66, 0.35)',
        'card-light': '0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05)',
        'card-dark': '0 4px 12px 0 rgba(0, 0, 0, 0.35)'
      }
    },
  },
  plugins: [],
}
