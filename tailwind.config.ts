import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'aiko-gradient': 'linear-gradient(to bottom right, #3B82F6, #2563EB)',
      },
      keyframes: {
        'glow-spin': {
          '0%': {
            transform: 'rotate(0deg)',
            boxShadow: '0 0 20px #3B82F6, 0 0 40px #3B82F6',
          },
          '50%': {
            boxShadow: '0 0 40px #60A5FA, 0 0 60px #60A5FA',
          },
          '100%': {
            transform: 'rotate(360deg)',
            boxShadow: '0 0 20px #3B82F6, 0 0 40px #3B82F6',
          },
        },
      },
      animation: {
        'glow-spin': 'glow-spin 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
} satisfies Config;
