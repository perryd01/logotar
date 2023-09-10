import db from '$lib/server/db';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2).max(64),
	nameLong: z.string().min(3).max(256).optional(),
	slug: z.string().min(2).max(64)
});

export const load = async () => {
	const form = await superValidate(schema);

	const teams = await db.group.findMany({
		select: {
			name: true,
			nameLong: true,
			slug: true
		}
	});

	return { form, teams };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, nameLong, slug } = form.data;

		const team = await db.group.create({
			data: {
				name,
				nameLong,
				slug
			}
		});

		const status = {
			data: team,
			success: true,
			error: undefined
		};

		return { form, status };
	}
};
