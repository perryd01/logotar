import { schema } from '$lib/forms/team';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const team = await db.team.findFirst({
		where: {
			slug
		}
	});

	const logos = await db.team.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true
		}
	});

	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true
		}
	});

	if (!team) {
		console.log('Team not found', slug);
		throw error(404, 'Team not found');
	}

	const form = await superValidate(schema);

	return {
		form,
		team,
		logos,
		groups
	};
};
