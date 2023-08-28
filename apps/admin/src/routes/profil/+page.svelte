<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<button on:click={() => signIn('authsch')}>Bejelentkezés</button>

<button on:click={() => signOut()}>Kijelentkezés</button>
