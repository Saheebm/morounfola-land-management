import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecf8f2',
          100: '#d2efe1',
          200: '#a6dfc4',
          300: '#6fc8a1',
          400: '#3aab7d',
          500: '#178f62',
          600: '#0b7350',
          700: '#0a5c41',
          800: '#0b4935',
          900: '#0a3c2d',
        },
        accent: {
          500: '#d72638',
          600: '#b91c2c',
        },
        ink: {
          DEFAULT: '#0f1f1a',
          soft: '#3d4f49',
          muted: '#5f6f6a',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f5f8f6',
          sunken: '#eaf0ec',
        },
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,31,26,.04)',
      },
    },
  },
  plugins: [],
} satisfies Config;
