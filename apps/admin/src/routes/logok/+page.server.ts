import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const logos = await db.logo.findMany({
		include: {
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
		logos: logos.map((logo) => ({
			...logo,
			content: logo.content.toString()
		}))
	};
};
