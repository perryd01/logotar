import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from '$lib/forms/team';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const team = await db.team.findFirst({
		where: {
			slug
		},
		include: {
			Membership: {
				include: {
					User: {
						select: {
							id: true,
							givenName: true,
							surname: true,
							internalId: true
						}
					}
				}
			},
			Logos: {
				select: {
					id: true,
					name: true
				}
			},
			Group: {
				select: {
					id: true,
					name: true,
					slug: true
				}
			}
		}
	});

	if (!team) {
		throw error(404, 'Team not found');
	}

	return {
		...team
	};
};

export const actions: Actions = {
	async edit({ request, params }) {
		const { slug } = params;

		const team = await db.team.findFirst({
			where: {
				slug
			}
		});

		if (!team) {
			return error(404, 'Team not found');
		}

		const form = await superValidate(request, schema);

		if (!form.valid) {
			return error(400, 'Invalid form data');
		}

		const data = form.data as Partial<typeof form.data>;

		const updatedTeam = await db.team.update({
			where: {
				slug
			},
			data
		});

		if (!updatedTeam) {
			return error(500, 'Failed to update team');
		}

		return {
			data: updatedTeam,
			success: true
		};
	},
	async reactivate({ params }) {
		const { slug } = params;

		const team = await db.team.findFirst({
			where: {
				slug
			}
		});

		if (!team) {
			return error(404, 'Team not found');
		}

		await db.team.update({
			where: {
				slug
			},
			data: {
				isDisabled: false
			}
		});
	},
	async delete({ params }) {
		const { slug } = params;

		const team = await db.team.findFirst({
			where: {
				slug
			}
		});

		if (!team) {
			return error(404, 'Team not found');
		}

		if (!team.isDisabled) {
			await db.team.update({
				where: {
					slug
				},
				data: {
					isDisabled: true
				}
			});
		} else {
			await db.team.delete({
				where: {
					slug
				}
			});
			throw redirect(303, '/logok');
		}
	}
};
