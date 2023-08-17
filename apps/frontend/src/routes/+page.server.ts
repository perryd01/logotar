import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true,
			slug: true,
			teams: {
				select: {
					id: true,
					name: true,
					slug: true,
					Logos: {
						select: {
							id: true,
							name: true,
							content: true
						},
						where: {
							content: {
								not: undefined
							}
						}
					}
				}
			}
		},
		where: {
			slug: {
				in: ['simonyi', 'schonherz']
			}
		}
	});

	return {
		groups
	};
};
