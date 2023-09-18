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
					primaryLogoId: true,
					Logos: {
						select: {
							id: true,
							name: true,
							content: false
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
			},
			isDisabled: false
		}
	});

	const g = groups.map((group) => ({
		...group,
		teams: group.teams.filter((team) => team.Logos.length > 0)
	}));

	return {
		groups: g
	};
};
