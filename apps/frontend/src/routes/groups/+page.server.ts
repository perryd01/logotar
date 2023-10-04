import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true,
			slug: true
		},
		orderBy: {
			name: 'asc'
		},
		where: {
			isDisabled: false
		}
	});

	return {
		groups
	};
};
