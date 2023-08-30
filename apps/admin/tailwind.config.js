import shared from 'config/tailwind.config';

export default {
	...shared,
	content: [...shared.content, "'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'"],
	plugins: [require('flowbite/plugin')]
};
