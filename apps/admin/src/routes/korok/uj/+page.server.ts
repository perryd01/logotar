import db from '$lib/server/db';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	name: z.string().min(2).max(64),
	nameLong: z.string().min(3).max(256).optional(),
	slug: z.string().min(2).max(64),
	internalId: z.number().int().positive().optional(),
	primaryLogoId: z.number().int().positive().optional(),
	groupId: z.number().int().positive()
});

export const load = async () => {
	const form = await superValidate(schema);

	const teams = await db.team.findMany({
		select: {
			name: true,
			nameLong: true,
			slug: true
		}
	});

	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			name: 'asc'
		}
	});

	const logos = await db.logo.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			name: 'asc'
		}
	});

	return { form, teams, groups, logos };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, nameLong, slug, groupId, internalId, primaryLogoId } = form.data;

		const team = await db.team.create({
			data: {
				name,
				nameLong,
				slug,
				groupId,
				internalId,
				primaryLogoId
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
