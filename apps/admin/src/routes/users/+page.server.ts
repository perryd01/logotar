import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { UserRole } from 'database';

export const load: PageServerLoad = async ({ locals }) => {
	const s = await locals.getSession();

	if (!s) {
		throw error(401, 'Unauthorized');
	}

	const currentUser = await db.user.findFirst({
		include: {
			memberships: true
		},
		where: {
			internalId: s.user.internal_id
		}
	});

	if (!currentUser) {
		throw error(404, 'User not found');
	}

	const gRole = currentUser.role;

	const users = await db.user.findMany({
		select: {
			id: true,
			givenName: true,
			email: true,
			surname: true,
			role: true
		},
		where: {}
	});

	console.log(users, users.length, gRole);

	return {
		users
	};
};
