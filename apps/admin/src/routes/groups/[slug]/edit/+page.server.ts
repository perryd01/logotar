import { schema } from '$lib/forms/group';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';

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

	const form = await superValidate(schema);

	return {
		form,
		group
	};
};
