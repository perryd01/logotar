import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const host = import.meta.env.PUBLIC_CDN_HOST ?? process.env['PUBLIC_CDN_HOST'];

	return {
		host
	};
}) satisfies LayoutServerLoad;
