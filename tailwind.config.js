/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#3B82F6'
			},
			minHeight: {
				touch: '44px'
			}
		}
	},
	plugins: []
};
