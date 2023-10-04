import db from '$lib/server/db';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2).max(64),
	content: z.any(),
	type: z.enum(['LIGHT', 'DARK']),
	teamId: z.number().int().positive()
});

export const load: PageServerLoad = async () => {
	const formPromise = superValidate(schema);

	const teamsPromise = db.team.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			name: 'asc'
		}
	});

	const [form, teams] = await Promise.all([formPromise, teamsPromise]);

	return { form, teams };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, schema);

		if (!form.valid) {
			console.error('form not valid', form);
			console.log(typeof formData.get('content'), formData.get('content'));

			return fail(400, { form });
		}

		const file = formData.get('content') as File;
		if (!(file instanceof File)) {
			console.error('file is not File', form);
			console.log(typeof file);

			return fail(400, { form });
		}

		const fileBuff = Buffer.from(await file.text());

		const logo = await db.logo.create({
			data: {
				name: form.data.name,
				content: fileBuff,
				type: form.data.type,
				teamId: form.data.teamId
			}
		});

		console.log('db', logo);

		if (!logo) return fail(500, { form });

		const status = {
			data: {
				id: logo.id,
				name: logo.name,
				type: logo.type,
				teamId: logo.teamId
			},
			success: true,
			error: undefined
		};

		return { form, status };
	}
};
