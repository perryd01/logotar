import type { AuthSchEduPersonEntitlement } from '$lib/server/AuthSchProvider';
import type { MembershipRole } from 'database';

type SchMembershipStatus = AuthSchEduPersonEntitlement['status'];

const statuses = {
	körvezető: 'LEADER',
	tag: 'MEMBER',
	öregtag: 'SENIOR'
} as {
	[key in SchMembershipStatus]: MembershipRole;
};

export function remapRole(role: SchMembershipStatus): MembershipRole {
	return statuses[role];
}
