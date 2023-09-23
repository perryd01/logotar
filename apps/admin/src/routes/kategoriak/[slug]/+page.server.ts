import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from '$lib/forms/group';

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
		group,
		form
	};
};

export const actions: Actions = {
	async edit({ request, params }) {
		const { slug } = params;

		const group = await db.group.findFirst({
			where: {
				slug
			}
		});

		if (!group) {
			return error(404, 'Group not found');
		}

		const form = await superValidate(request, schema);

		if (!form.valid) {
			return error(400, 'Invalid form data');
		}

		const data = form.data as Partial<typeof form.data>;

		const updatedGroup = await db.group.update({
			where: {
				slug
			},
			data
		});

		if (!updatedGroup) {
			return error(500, 'Failed to update group');
		}

		throw redirect(303, `/kategoriak/${updatedGroup.slug}`);

		return {
			form,
			data: updatedGroup,
			success: true
		};
	},
	reactivate: async (event) => {
		const { slug } = event.params;

		const group = await db.group.findFirst({
			where: {
				slug
			}
		});

		if (!group) {
			return error(404, 'Group not found');
		}

		await db.group.update({
			where: {
				slug
			},
			data: {
				isDisabled: false
			}
		});
	},
	delete: async (event) => {
		const { slug } = event.params;

		const group = await db.group.findFirst({
			where: {
				slug
			}
		});

		if (!group) {
			return error(404, 'Group not found');
		}

		if (!group.isDisabled) {
			await db.group.update({
				where: {
					slug
				},
				data: {
					isDisabled: true
				}
			});
		} else {
			await db.group.delete({
				where: {
					slug
				}
			});
			throw redirect(303, '/kategoriak');
		}
	}
};
