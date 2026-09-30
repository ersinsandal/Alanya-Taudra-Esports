import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ate: {
          bg: 'var(--ate-bg)',
          surface: 'var(--ate-surface)',
          panel: 'var(--ate-panel)',
          border: 'var(--ate-border)',
          red: {
            DEFAULT: 'var(--ate-red)',
            bright: 'var(--ate-red-bright)',
            deep: 'var(--ate-red-deep)',
          },
          white: 'var(--ate-white)',
          muted: 'var(--ate-muted)',
          success: 'var(--ate-success)',
          warning: 'var(--ate-warning)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

export default config
