import db from '$lib/server/db';

export const load = async () => {
	const groups = await db.group.findMany({
		select: {
			id: true,
			name: true,
			nameLong: true,
			slug: true,
			teams: {
				select: {
					id: true,
					name: true,
					slug: true,
					primaryLogoId: true,
					Logos: {
						select: {
							id: true,
							name: true
						}
					}
				},
				orderBy: {
					name: 'asc'
				},
				where: {
					Logos: {
						some: {
							content: {
								not: undefined
							}
						}
					},
					isDisabled: false
				}
			}
		},
		orderBy: {
			name: 'asc'
		},
		where: {
			teams: {
				some: {
					id: {
						not: undefined
					}
				}
			},
			isDisabled: false
		}
	});

	return {
		groups
	};
};
