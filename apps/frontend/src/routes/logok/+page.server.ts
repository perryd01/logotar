import db from '$lib/server/db';

export const load = async () => {
	const groups = (
		await db.group.findMany({
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
							},
							where: {
								content: {
									not: undefined
								}
							}
						}
					},
					orderBy: {
						name: 'asc'
					}
				}
			},
			orderBy: {
				name: 'asc'
			}
		})
	).filter((group) => group.teams.length > 0);

	return {
		groups
	};
};
