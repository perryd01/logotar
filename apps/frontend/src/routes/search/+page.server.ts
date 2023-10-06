import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

const paramSchema = z.object({
	keyword: z.string().optional(),
	logoType: z.enum(['ALL', 'LIGHT', 'DARK']).optional().default('ALL'),
	skip: z.coerce.number().int().optional().default(0),
	limit: z.coerce.number().optional().default(20)
});

export const load: PageServerLoad = async ({ url }) => {
	const keywordParam = url.searchParams.get('keyword') ?? undefined;
	const logoTypeParam = url.searchParams.get('logoType') ?? undefined;
	const skipParam = url.searchParams.get('skip') ?? undefined;
	const limitParam = url.searchParams.get('limit') ?? undefined;

	const query = paramSchema.safeParse({
		keyword: keywordParam,
		logoType: logoTypeParam,
		skip: skipParam,
		limit: limitParam
	});

	if (!query.success) {
		console.log(query.error.errors.map((e) => e.message));
		const message = query.error.errors.map((e) => e.message).join(', ');
		throw error(400, message);
	}
	console.log(query.data);

	const count = await db.logo.count({
		where: {
			content: {
				not: undefined
			},
			name: {
				contains: query.data.keyword
			},
			type: query.data.logoType === 'ALL' ? undefined : query.data.logoType
		}
	});

	const logos = await db.logo.findMany({
		select: {
			id: true,
			name: true,
			type: true,
			Team: {
				select: {
					id: true,
					name: true,
					nameLong: true,
					slug: true,
					Group: {
						select: {
							id: true,
							name: true,
							nameLong: true,
							slug: true
						}
					}
				}
			}
		},
		orderBy: {
			Team: {
				name: 'asc'
			}
		},
		where: {
			content: {
				not: undefined
			},
			name: {
				contains: query.data.keyword
			},
			type: query.data.logoType === 'ALL' ? undefined : query.data.logoType
		},
		take: query.data.limit,
		skip: query.data.skip
	});

	return {
		logos,
		pages: Math.ceil(count / query.data.limit),
		skip: query.data.skip,
		limit: query.data.limit,
		params: {
			...query.data
		}
	};
};
