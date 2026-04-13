/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app/app.vue",
    "./app/error.vue"
  ],
  theme: {
    extend: {
      colors: {
        butter: 'var(--bg-page)',
        daisy: 'var(--color-secondary)',
        blush: 'var(--color-primary)',
        mint: 'var(--color-tertiary)',
        coal: 'var(--text-main)',
        primary: {
          DEFAULT: 'var(--color-primary-strong)',
          strong: 'var(--color-primary-strong)',
          deep: 'var(--color-primary-deep)',
        }
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
