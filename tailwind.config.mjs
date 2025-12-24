import typography from '@tailwindcss/typography';

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
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.slate.700'),
						'--tw-prose-headings': theme('colors.slate.900'),
						'--tw-prose-links': theme('colors.primary'),
						'--tw-prose-bold': theme('colors.slate.900'),
						'--tw-prose-code': theme('colors.slate.900'),
						'--tw-prose-pre-bg': theme('colors.slate.50'),
						'--tw-prose-pre-code': theme('colors.slate.800'),
						maxWidth: 'none',
						fontSize: '1rem',
						lineHeight: '1.75',
					fontFamily: 'Inter, sans-serif',
						// Code blocks
						pre: {
							backgroundColor: 'var(--tw-prose-pre-bg)',
							padding: theme('spacing.6'),
							borderRadius: theme('borderRadius.lg'),
							overflowX: 'auto',
							fontSize: '0.875rem',
							lineHeight: '1.7',
						fontFamily: 'JetBrains Mono, monospace',
					},
					code: {
						color: 'var(--tw-prose-code)',
						fontWeight: '500',
						fontSize: '0.875em',
						fontFamily: 'JetBrains Mono, monospace',
							'&::before': { content: '""' },
							'&::after': { content: '""' },
						},
						// Inline code (not in pre)
						':not(pre) > code': {
							backgroundColor: theme('colors.slate.100'),
							padding: `${theme('spacing.1')} ${theme('spacing[1.5]')}`,
							borderRadius: theme('borderRadius.DEFAULT'),
							fontWeight: '500',
						},
						// Headings
						h1: {
							fontSize: '2.25rem',
							fontWeight: '700',
							lineHeight: '1.2',
							marginTop: '0',
							marginBottom: theme('spacing.8'),
						},
						h2: {
							fontSize: '1.875rem',
							fontWeight: '600',
							lineHeight: '1.3',
							marginTop: theme('spacing.12'),
							marginBottom: theme('spacing.6'),
						},
						h3: {
							fontSize: '1.5rem',
							fontWeight: '600',
							lineHeight: '1.4',
							marginTop: theme('spacing.10'),
							marginBottom: theme('spacing.4'),
						},
						// Links
						a: {
							color: 'var(--tw-prose-links)',
							textDecoration: 'none',
							fontWeight: '500',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						// Lists
						ul: {
							listStyleType: 'disc',
						},
						ol: {
							listStyleType: 'decimal',
						},
						// Blockquotes
						blockquote: {
							fontStyle: 'normal',
							borderLeftColor: theme('colors.primary'),
							borderLeftWidth: '4px',
							paddingLeft: theme('spacing.6'),
							color: theme('colors.slate.600'),
						},
					},
				},
				invert: {
					css: {
						'--tw-prose-body': theme('colors.slate.300'),
						'--tw-prose-headings': theme('colors.white'),
						'--tw-prose-links': theme('colors.primary'),
						'--tw-prose-bold': theme('colors.white'),
						'--tw-prose-code': theme('colors.slate.200'),
						'--tw-prose-pre-bg': theme('colors.slate.900'),
						'--tw-prose-pre-code': theme('colors.slate.200'),
						':not(pre) > code': {
							backgroundColor: theme('colors.slate.800'),
						},
						blockquote: {
							borderLeftColor: theme('colors.primary'),
							color: theme('colors.slate.400'),
						},
					},
				},
			}),
		},
	},
	plugins: [typography],
}
