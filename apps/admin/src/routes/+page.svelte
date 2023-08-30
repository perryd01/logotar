<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Főoldal | logótár admin</title>
</svelte:head>

<p>{data.isLogged ? 'Bejelentkezve' : 'Kijelentkezve'}</p>

<p>Logged in as {$page.data?.session?.user?.displayName}</p>
<p>Körök: {$page.data?.session?.user?.eduPersonEntitlement?.map((e) => e.name).join(', ')}</p>
