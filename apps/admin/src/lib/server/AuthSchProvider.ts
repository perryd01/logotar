import type { Provider } from '@auth/core/providers';

export enum AuthSchScopeEnum {
	BASIC = 'basic',
	DISPLAY_NAME = 'displayName',
	EMAIL = 'mail',
	SURNAME = 'sn',
	GIVEN_NAME = 'givenName',
	EDU_PERSON_ENTITLEMENT = 'eduPersonEntitlement'
}

type AuthSchProviderOptions = {
	clientId: string;
	clientSecret: string;
	scope?: Array<AuthSchScopeEnum>;
};

export type AuthSchEduPersonEntitlement = {
	id: string;
	name: string;
	title: string[];
	status: 'körvezető' | 'tag' | 'öregtag';
	start: string;
	end: string | null;
};

export type AuthSchProfile = {
	internal_id: string;
	displayName?: string;
	mail?: string;
	sn?: string;
	givenName?: string;
	eduPersonEntitlement?: AuthSchEduPersonEntitlement[];
};

function AuthSchProvider({ clientId, clientSecret, scope }: AuthSchProviderOptions): Provider {
	return {
		id: 'authsch',
		name: 'AuthSch',
		type: 'oauth',
		authorization: {
			url: 'https://auth.sch.bme.hu/site/login',
			params: {
				scope: scope?.join(' ')
			}
		},
		token: 'https://auth.sch.bme.hu/oauth2/token',
		userinfo: {
			url: 'https://auth.sch.bme.hu/api/profile',
			async request({ tokens, provider }: { tokens: any; provider: any }) {
				const url = new URL(provider.userinfo?.url as URL);
				url.searchParams.append('access_token', tokens.access_token);

				const profile = await fetch(url.toString()).then((res) => res.json());

				return profile;
			}
		},
		profile(profile: AuthSchProfile) {
			return {
				id: profile.internal_id,
				email: profile?.mail,
				displayName: profile?.displayName,
				eduPersonEntitlement: profile?.eduPersonEntitlement
			};
		},
		options: {
			clientId,
			clientSecret
		}
	};
}

export default AuthSchProvider;
