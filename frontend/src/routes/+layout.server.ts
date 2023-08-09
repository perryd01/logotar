import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	return {
		version: '1.0.0'
	};
}) satisfies LayoutServerLoad;
