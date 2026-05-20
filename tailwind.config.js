/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04060a',
        ink: '#07090d',
        surface: 'rgba(255,255,255,0.03)',
        panel: '#0d1118',
        line: 'rgba(255,255,255,0.07)',
        'line-bright': 'rgba(255,255,255,0.14)',
        mist: '#8b92a5',
        signal: '#22d3ee',
        'signal-dim': 'rgba(34,211,238,0.12)',
        citrus: '#fbbf24',
        ember: '#f97316',
        violet: '#a78bfa',
        'violet-dim': 'rgba(167,139,250,0.12)',
        moss: '#34d399',
        'moss-dim': 'rgba(52,211,153,0.12)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', '"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(34,211,238,0.08)',
        'glow-md': '0 0 60px rgba(34,211,238,0.12)',
        panel: '0 24px 80px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
    },
  },
  plugins: [],
};
