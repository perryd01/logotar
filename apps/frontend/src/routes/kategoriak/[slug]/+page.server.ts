import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (context) => {
	const group = await db.group.findFirst({
		where: {
			slug: context.params.slug
		},
		include: {
			teams: {
				include: {
					Logos: true
				}
			}
		},
		orderBy: {
			name: 'asc'
		}
	});

	if (!group) {
		throw error(404, 'Group not found');
	}

	return {
		group: {
			...group,
			teams: group.teams.map((team) => ({
				...team,
				Logos: team.Logos.map((logo) => ({
					...logo,
					content: logo.content.toString()
				}))
			}))
		}
	};
};
