import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.slug;
	const team = await db.team.findFirst({
		include: {
			Group: {
				select: {
					slug: true,
					name: true,
					nameLong: true
				}
			},
			Logos: {
				select: {
					id: true,
					name: true,
					content: false,
					type: true
				},
				where: {
					content: {
						not: undefined
					}
				}
			}
		},
		where: {
			slug
		}
	});

	if (!team) {
		throw error(404, 'Team not found');
	}

	return {
		...team
	};
};
