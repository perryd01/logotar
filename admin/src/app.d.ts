// See https://kit.svelte.dev/docs/types#app

import type { AuthSchEduPersonEntitlement } from '$lib/server/AuthSchProvider';

type ISODateString = string;
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Session {
			user: {
				internal_id?: string;
				displayName?: string;
				eduPersonEntitlement?: AuthSchEduPersonEntitlement[];
				name?: string | null;
				email?: string | null;
				image?: string | null;
			};
			expires: ISODateString;
		}
	}
}

export {};
