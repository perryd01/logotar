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
						Logos: {
							select: {
								id: true,
								name: true,
								content: false
							},
							where: {
								content: {
									not: undefined
								}
							}
						}
					}
				}
			},
			orderBy: {
				name: 'asc'
			}
		})
	)
		.map((group) => ({
			...group,
			teams: group.teams.sort((a, b) => a.name.localeCompare(b.name))
		}))
		.filter((group) => group.teams.length > 0);

	return {
		groups
	};
};
