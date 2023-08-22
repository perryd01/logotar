import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true,
			slug: true,
			teams: {
				select: {
					_count: true
				}
			}
		}
	});

	return {
		groups
	};
};
