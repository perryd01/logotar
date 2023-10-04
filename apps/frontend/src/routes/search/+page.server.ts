import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const logos = await db.logo.findMany({
		select: {
			id: true,
			name: true,
			type: true,
			Team: {
				select: {
					id: true,
					name: true,
					nameLong: true,
					slug: true,
					Group: {
						select: {
							id: true,
							name: true,
							nameLong: true,
							slug: true
						}
					}
				}
			}
		},
		orderBy: {
			Team: {
				name: 'asc'
			}
		},
		where: {
			content: {
				not: undefined
			}
		}
	});
	return { logos };
};
