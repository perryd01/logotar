import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import AuthSchProvider, {
	AuthSchScopeEnum,
	type AuthSchProfile
} from '$lib/server/AuthSchProvider';

import { AUTHSCH_CLIENT_ID, AUTHSCH_CLIENT_SECRET } from '$env/static/private';

async function authorization({ event, resolve }: { event: any; resolve: any }) {
	const session = await event.locals.getSession();

	if (event.url.pathname && event.url.pathname !== '/auth') {
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	if (session && event.url.pathname === '/auth') {
		throw redirect(303, '/');
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			AuthSchProvider({
				clientId: AUTHSCH_CLIENT_ID,
				clientSecret: AUTHSCH_CLIENT_SECRET,
				scope: [
					AuthSchScopeEnum.BASIC,
					AuthSchScopeEnum.DISPLAY_NAME,
					AuthSchScopeEnum.EMAIL,
					AuthSchScopeEnum.SURNAME,
					AuthSchScopeEnum.GIVEN_NAME,
					AuthSchScopeEnum.EDU_PERSON_ENTITLEMENT
				]
			})
		],
		callbacks: {
			async jwt({ token, account, profile }) {
				const p = profile as AuthSchProfile;
				// Persist the OAuth access_token to the token right after signin
				if (account) {
					token.internal_id = account.providerAccountId;
					token.accessToken = account.access_token;
					token.displayName = p.displayName;
					token.eduPersonEntitlement = p.eduPersonEntitlement;
				}
				return token;
			},
			async session({ session, token }: { session: any; token: any }) {
				// Send properties to the client, like an access_token from a provider.
				session.accessToken = token.accessToken;
				session.user.internal_id = token.sub;
				session.user.displayName = token.displayName;
				session.user.eduPersonEntitlement = token.eduPersonEntitlement;
				return session;
			}
		}
	}),
	authorization
);
