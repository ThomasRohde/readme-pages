import typography from '@tailwindcss/typography';

/**
 * Tailwind CSS Configuration for readme-pages
 *
 * Design System: "Architect's Journal"
 * A sophisticated editorial aesthetic with geometric modernism
 *
 * Typography:
 * - Display: Playfair Display (elegant serif for headlines)
 * - Body/UI: DM Sans (clean, readable geometric sans)
 * - Code: JetBrains Mono
 *
 * Color Palette: "Midnight Ink"
 * - Primary: Deep indigo with warm copper accents
 * - Light mode: Warm cream background with charcoal text
 * - Dark mode: Rich navy with gold/amber accents
 */

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Primary palette - Deep indigo foundation
				primary: {
					DEFAULT: '#1a1f4e',
					50: '#f0f1f8',
					100: '#e0e2f0',
					200: '#c1c5e1',
					300: '#9299cc',
					400: '#636bb3',
					500: '#454d99',
					600: '#363d7a',
					700: '#2d3266',
					800: '#1a1f4e',
					900: '#141739',
					950: '#0c0e24',
				},
				// Accent - Warm copper/bronze
				accent: {
					DEFAULT: '#c9784e',
					50: '#fdf6f3',
					100: '#fbeae3',
					200: '#f7d5c7',
					300: '#f1b69f',
					400: '#e88f6d',
					500: '#c9784e',
					600: '#b5613a',
					700: '#974e30',
					800: '#7c422c',
					900: '#673a29',
					950: '#381c12',
				},
				// Gold accent for dark mode
				gold: {
					DEFAULT: '#d4a957',
					50: '#fbf8ef',
					100: '#f5edd5',
					200: '#ead8a7',
					300: '#ddbf72',
					400: '#d4a957',
					500: '#c68f38',
					600: '#b0732e',
					700: '#925628',
					800: '#784627',
					900: '#643b24',
					950: '#391e11',
				},
				// Light mode backgrounds - warm cream tones
				cream: {
					DEFAULT: '#faf8f5',
					50: '#fdfcfb',
					100: '#faf8f5',
					200: '#f5f0e8',
					300: '#ebe3d6',
					400: '#d9cbb7',
					500: '#c7b399',
				},
				// Dark mode backgrounds - rich navy
				navy: {
					DEFAULT: '#0f1629',
					50: '#f3f4f9',
					100: '#e8ebf4',
					200: '#d5daea',
					300: '#b7c0d9',
					400: '#94a0c4',
					500: '#7a84b1',
					600: '#676fa1',
					700: '#585e8c',
					800: '#1c2340',
					900: '#0f1629',
					950: '#080b15',
				},
				// Ink colors for text
				ink: {
					DEFAULT: '#2c2c3a',
					light: '#4a4a5c',
					muted: '#6e6e82',
					faint: '#9898a8',
				},
				// Legacy support
				'background-light': '#faf8f5',
				'background-dark': '#0f1629',
				'surface-dark': '#1c2340',
				'border-dark': '#2d3654',
			},
			fontFamily: {
				display: ['Playfair Display', 'Georgia', 'serif'],
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
			},
			fontSize: {
				// Display scale - dramatic sizing for headlines
				'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
				'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
				'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem',
				'2xl': '1rem',
				full: '9999px',
			},
			boxShadow: {
				'card': '0 2px 8px -2px rgba(26, 31, 78, 0.08), 0 4px 16px -4px rgba(26, 31, 78, 0.12)',
				'card-hover': '0 8px 24px -4px rgba(26, 31, 78, 0.12), 0 16px 40px -8px rgba(26, 31, 78, 0.16)',
				'card-dark': '0 2px 8px -2px rgba(0, 0, 0, 0.3), 0 4px 16px -4px rgba(0, 0, 0, 0.4)',
				'card-dark-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 16px 40px -8px rgba(0, 0, 0, 0.5)',
			},
			animation: {
				'fade-up': 'fadeUp 0.6s ease-out forwards',
				'fade-in': 'fadeIn 0.4s ease-out forwards',
				'slide-in': 'slideIn 0.5s ease-out forwards',
				'scale-in': 'scaleIn 0.3s ease-out forwards',
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideIn: {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.ink.DEFAULT'),
						'--tw-prose-headings': theme('colors.primary.800'),
						'--tw-prose-links': theme('colors.accent.600'),
						'--tw-prose-bold': theme('colors.ink.DEFAULT'),
						'--tw-prose-code': theme('colors.primary.700'),
						'--tw-prose-pre-bg': theme('colors.cream.200'),
						'--tw-prose-pre-code': theme('colors.primary.800'),
						maxWidth: 'none',
						fontSize: '1.0625rem',
						lineHeight: '1.8',
						fontFamily: 'DM Sans, system-ui, sans-serif',
						// Code blocks
						pre: {
							backgroundColor: 'var(--tw-prose-pre-bg)',
							padding: theme('spacing.6'),
							borderRadius: theme('borderRadius.lg'),
							overflowX: 'auto',
							fontSize: '0.875rem',
							lineHeight: '1.7',
							fontFamily: 'JetBrains Mono, Consolas, monospace',
							border: `1px solid ${theme('colors.cream.300')}`,
						},
						code: {
							color: 'var(--tw-prose-code)',
							fontWeight: '500',
							fontSize: '0.875em',
							fontFamily: 'JetBrains Mono, Consolas, monospace',
							'&::before': { content: '""' },
							'&::after': { content: '""' },
						},
						// Inline code (not in pre)
						':not(pre) > code': {
							backgroundColor: theme('colors.cream.200'),
							padding: `${theme('spacing.1')} ${theme('spacing[1.5]')}`,
							borderRadius: theme('borderRadius.DEFAULT'),
							fontWeight: '500',
						},
						// Headings - using Playfair Display
						h1: {
							fontFamily: 'Playfair Display, Georgia, serif',
							fontSize: '2.5rem',
							fontWeight: '700',
							lineHeight: '1.2',
							letterSpacing: '-0.02em',
							marginTop: '0',
							marginBottom: theme('spacing.8'),
							color: theme('colors.primary.800'),
						},
						h2: {
							fontFamily: 'Playfair Display, Georgia, serif',
							fontSize: '2rem',
							fontWeight: '600',
							lineHeight: '1.3',
							letterSpacing: '-0.01em',
							marginTop: theme('spacing.14'),
							marginBottom: theme('spacing.6'),
							color: theme('colors.primary.800'),
						},
						h3: {
							fontFamily: 'Playfair Display, Georgia, serif',
							fontSize: '1.5rem',
							fontWeight: '600',
							lineHeight: '1.4',
							marginTop: theme('spacing.10'),
							marginBottom: theme('spacing.4'),
							color: theme('colors.primary.800'),
						},
						h4: {
							fontFamily: 'Playfair Display, Georgia, serif',
							fontSize: '1.25rem',
							fontWeight: '600',
							lineHeight: '1.4',
							marginTop: theme('spacing.8'),
							marginBottom: theme('spacing.3'),
							color: theme('colors.primary.800'),
						},
						// Links with elegant underline
						a: {
							color: 'var(--tw-prose-links)',
							textDecoration: 'none',
							fontWeight: '500',
							borderBottom: `1px solid ${theme('colors.accent.300')}`,
							transition: 'border-color 0.2s ease',
							'&:hover': {
								borderBottomColor: theme('colors.accent.600'),
							},
						},
						// Lists
						ul: {
							listStyleType: 'disc',
						},
						ol: {
							listStyleType: 'decimal',
						},
						// Blockquotes - elegant styling
						blockquote: {
							fontFamily: 'Playfair Display, Georgia, serif',
							fontStyle: 'italic',
							fontWeight: '400',
							fontSize: '1.125rem',
							borderLeftColor: theme('colors.accent.400'),
							borderLeftWidth: '3px',
							paddingLeft: theme('spacing.6'),
							color: theme('colors.ink.light'),
						},
						// Strong text
						strong: {
							fontWeight: '600',
							color: theme('colors.ink.DEFAULT'),
						},
					},
				},
				invert: {
					css: {
						'--tw-prose-body': theme('colors.slate.300'),
						'--tw-prose-headings': theme('colors.cream.100'),
						'--tw-prose-links': theme('colors.gold.400'),
						'--tw-prose-bold': theme('colors.cream.100'),
						'--tw-prose-code': theme('colors.gold.300'),
						'--tw-prose-pre-bg': theme('colors.navy.800'),
						'--tw-prose-pre-code': theme('colors.cream.200'),
						':not(pre) > code': {
							backgroundColor: theme('colors.navy.800'),
						},
						pre: {
							borderColor: theme('colors.border-dark'),
						},
						blockquote: {
							borderLeftColor: theme('colors.gold.500'),
							color: theme('colors.slate.400'),
						},
						a: {
							borderBottomColor: theme('colors.gold.600'),
							'&:hover': {
								borderBottomColor: theme('colors.gold.400'),
							},
						},
						h1: { color: theme('colors.cream.100') },
						h2: { color: theme('colors.cream.100') },
						h3: { color: theme('colors.cream.100') },
						h4: { color: theme('colors.cream.100') },
					},
				},
			}),
		},
	},
	plugins: [typography],
}
