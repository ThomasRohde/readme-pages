/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#137fec',
				'background-light': '#f6f7f8',
				'background-dark': '#0f172a',
				'surface-dark': '#1e293b',
				'border-dark': '#334155',
			},
			fontFamily: {
				display: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem',
				full: '9999px',
			},
		},
	},
	plugins: [],
}
