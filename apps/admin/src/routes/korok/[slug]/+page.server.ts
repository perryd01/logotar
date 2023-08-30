import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const team = await db.team.findFirst({
		where: {
			slug
		},
		include: {
			Membership: {
				include: {
					User: {
						select: {
							id: true,
							givenName: true,
							surname: true,
							internalId: true
						}
					}
				}
			},
			Logos: {
				select: {
					id: true,
					name: true
				}
			},
			Group: {
				select: {
					id: true,
					name: true,
					slug: true
				}
			}
		}
	});

	if (!team) {
		throw error(404, 'Team not found');
	}

	return {
		...team
	};
};
