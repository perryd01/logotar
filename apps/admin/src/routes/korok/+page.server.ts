import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const teams = await db.team.findMany({
		select: {
			id: true,
			internalId: true,
			Group: {
				select: {
					name: true
				}
			},
			slug: true,
			name: true,
			nameLong: true,
			Logos: {
				select: {
					id: true
				}
			}
		}
	});

	return {
		teams
	};
};
