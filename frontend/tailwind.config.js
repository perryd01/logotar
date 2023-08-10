/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			colors: {
				logotar: {
					primary: '#F8485E',
					gray: {
						50: '#FAFAFA',
						100: '#B9B9B9'
					},
					dark: '#1D1D1D'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
