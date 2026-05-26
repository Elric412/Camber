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
        canvas: {
          dark: '#0A0A0C', // Huly near-black canvas
          deep: '#000000', // True deep black forClosing Orb band
          cream: '#F5F3F1', // Off-white cream reset band
          paper: '#FAF9F7', // Elevated warm cream for mockups
          pill: '#E8E2DA',  // Ivory CTA pill background
        },
        primary: {
          amber: '#FF7A2F',     // Warm amber voltage bloom core
          soft: '#FFB15C',      // Mid-fading amber
          glow: '#FFD08A',      // Outer glowing amber halo
          deep: '#E0571A',      // Saturated hover/press amber
          cocoa: '#5E3B2D',     // Grounded deep cocoa brown for text on warm ivory
        },
        accent: {
          blue: '#5BA8FF',      // Sub-section GitHub editor outline blue
          blueGlow: '#7DBBFF',  // Outer blue halo
          yellow: '#F5C84C',    // Single-moment Sticky Yellow
        },
        ink: {
          light: '#F4F5F8',     // High-contrast text on dark background
          soft: '#C4C7CE',      // Supporting text on dark background
          mute: '#8A8E96',      // Metadata or inactive text on dark
          dim: '#6F727A',       // Fine UI caption text on dark
          dark: '#0A0A0C',      // Dominant text on cream background
          body: '#3F3F45',      // Running prose body on cream background
          mutedLight: '#6F727A', // Captions and subtitles on cream
        },
        hairline: {
          dark: '#27272A',      // 1px borders on dark product UI
          light: '#E4E4E7',     // 1px borders on cream bands
        },
        surface: {
          cardDark: '#141416',  // Feature card surface background
          elevatedDark: '#1F2024', // Kanban items, tag pill backgrounds
        },
        // Muted category tags for Product UI
        tag: {
          low: '#7DBBFF',
          devops: '#FF9B5C',
          marketing: '#D99A6A',
          sales: '#F2C76D',
          research: '#B89BE0',
          qa: '#88C5A8',
        },
        status: {
          todo: '#FF8A3D',
          progress: '#5BA8FF',
          done: '#88C5A8',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        display: ['Inter Display', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'base': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'section': '96px',
        'hero': '128px',
      },
      letterSpacing: {
        'button-track': '0.08em',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
