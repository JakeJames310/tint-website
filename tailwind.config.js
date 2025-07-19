/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        innovation: '#25FC11',
        trust: '#0C8102',
        neutral: '#222222',
        background: '#000000',
        foreground: '#ffffff',
        muted: '#222222',
        'muted-foreground': '#a1a1aa',
        border: '#27272a',
        input: '#27272a',
        ring: '#25FC11',
        accent: '#25FC11',
        'accent-foreground': '#000000',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        success: '#0C8102',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
      boxShadow: {
        'glow-innovation': '0 0 20px rgba(37, 252, 17, 0.3)',
        'glow-innovation-strong': '0 0 40px rgba(37, 252, 17, 0.5)',
        'glow-trust': '0 0 20px rgba(12, 129, 2, 0.3)',
        'glow-primary': '0 0 20px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(37, 252, 17, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(37, 252, 17, 0.6)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
} 