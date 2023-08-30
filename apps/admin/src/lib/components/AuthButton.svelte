<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	const user = $page.data?.session?.user;
	const isLogged = !!user;

	export let type: 'login' | 'logout' = 'login';
	export let disabled = true;

	const label = type === 'login' ? 'Bejelentkezés' : 'Kijelentkezés';
</script>

<button
	class:disabled
	{disabled}
	on:click={() => (type === 'login' ? signIn('authsch') : signOut())}>{label}</button
>

<style lang="postcss">
	button {
		@apply px-4 py-2 rounded-md bg-black text-white;
	}

	.disabled {
		@apply opacity-50 cursor-not-allowed;
	}
</style>
