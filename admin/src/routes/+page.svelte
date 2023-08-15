<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Főoldal | logótár admin</title>
</svelte:head>

<h1>Logótár Admin</h1>
<p>{data.isLogged ? 'Bejelentkezve' : 'Kijelentkezve'}</p>

<p>Logged in as {$page.data?.session?.user?.displayName}</p>
<p>Körök: {$page.data?.session?.user?.eduPersonEntitlement?.map((e) => e.name).join(', ')}</p>

<button disabled={data.isLogged} on:click={() => signIn('authsch')}>Bejelentkezés</button>

<button disabled={!data.isLogged} on:click={() => signOut()}>Kijelentkezés</button>
