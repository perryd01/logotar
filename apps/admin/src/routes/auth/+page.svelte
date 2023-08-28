<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	const user = $page.data?.session?.user;
	const isLogged = !!user;
</script>

<svelte:head>
	<title>Bejelentkezés | logótár admin</title>
</svelte:head>

<section class="flex flex-col justify-center items-center">
	<div class="shadow-lg p-8 rounded-lg">
		<div class="mb-8">
			<h1 class="text-2xl">logótár admin bejelentkezés</h1>
			<span>a bejelentkezés a kollégiumi schauth által történik</span>
		</div>
		<div class="flex flex-col gap-2">
			<button class:disabled={isLogged} disabled={isLogged} on:click={() => signIn('authsch')}
				>Bejelentkezés</button
			>
			<button class:disabled={!isLogged} disabled={!isLogged} on:click={() => signOut()}
				>Kijelentkezés</button
			>
		</div>
	</div>
</section>

<style lang="postcss">
	button {
		@apply px-4 py-2 rounded-md bg-black text-white;
	}

	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
