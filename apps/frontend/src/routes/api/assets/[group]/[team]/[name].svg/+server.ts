import db from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (context) => {
	const { group, team, name } = context.params;

	const logo = await db.logo.findFirst({
		where: {
			name,
			Team: {
				slug: team,
				Group: {
					slug: group
				}
			}
		}
	});

	if (!logo) {
		return new Response(String('no logo was found'), {
			status: 404
		});
	}

	const response = new Response(String(logo?.content.toString()), {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});

	return response;
};
