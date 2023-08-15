<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	const user = $page.data?.session?.user;
	const isLogged = !!user;
</script>

<svelte:head>
	<title>Bejelentkezés | logótár admin</title>
</svelte:head>

<button disabled={isLogged} on:click={() => signIn('authsch')}>Bejelentkezés</button>
<button disabled={!isLogged} on:click={() => signOut()}>Kijelentkezés</button>
