import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	const isLogged = !!(session && session.user);
	const host = import.meta.env.PUBLIC_CDN_HOST ?? process.env['PUBLIC_CDN_HOST'];

	return {
		session,
		isLogged,
		host
	};
};
