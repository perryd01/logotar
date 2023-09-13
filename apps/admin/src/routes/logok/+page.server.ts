import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const logos = await db.logo.findMany({
		select: {
			id: true,
			name: true,
			type: true,
			Team: {
				select: {
					name: true,
					slug: true,
					Group: {
						select: {
							slug: true
						}
					}
				}
			}
		},
		orderBy: {
			id: 'asc'
		}
	});

	return {
		logos
	};
};
