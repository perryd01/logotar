export const adminUserEmails =
	(import.meta.env.VITE_ADMIN_USER_EMAILS as string | undefined)?.split(',') ?? [];
