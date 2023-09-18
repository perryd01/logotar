import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(2).max(64),
	nameLong: z.string().min(3).max(256).optional(),
	slug: z.string().min(2).max(64)
});
