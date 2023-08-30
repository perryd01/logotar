import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const group = await db.group.findFirst({
		where: {
			slug
		},
		include: {
			teams: true
		}
	});

	if (!group) {
		throw error(404, 'Group not found');
	}

	return {
		...group
	};
};
