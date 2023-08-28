<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	import { MyTestButton, TeamElement } from 'ui';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Főoldal | logótár admin</title>
</svelte:head>

<p>{data.isLogged ? 'Bejelentkezve' : 'Kijelentkezve'}</p>

<p>Logged in as {$page.data?.session?.user?.displayName}</p>
<p>Körök: {$page.data?.session?.user?.eduPersonEntitlement?.map((e) => e.name).join(', ')}</p>

<button disabled={data.isLogged} on:click={() => signIn('authsch')}>Bejelentkezés</button>

<button disabled={!data.isLogged} on:click={() => signOut()}>Kijelentkezés</button>

<MyTestButton />
<div class="w-60">
	<TeamElement
		logo={`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" />
  </svg>`}
		slug="slug"
		team="schdesign"
	/>
</div>
