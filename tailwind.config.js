/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./src/*.{html,js,svelte,ts}', './src/**/*.{html,js,svelte,ts}'],
	content: ['./src/*.{html,js,svelte,ts}', './src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: []
}
