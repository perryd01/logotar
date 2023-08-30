<script lang="ts">
	import { page } from '$app/stores';
	import AuthButton from '$lib/components/AuthButton.svelte';
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
			<AuthButton type="login" disabled={isLogged} />
			<AuthButton type="logout" disabled={!isLogged} />
		</div>
	</div>
</section>
