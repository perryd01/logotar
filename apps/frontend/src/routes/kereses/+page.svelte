<script lang="ts">
	import { page } from '$app/stores';
	import { LogoElement } from 'ui';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageServerData;

	let logoType: 'ALL' | 'LIGHT' | 'DARK' = 'ALL';
	let keyword = '';
	onMount(() => {
		console.log('onMount called');
		keyword = $page.url.searchParams.get('keyword') ?? '';
		logoType = ($page.url.searchParams.get('logoType') as 'ALL' | 'LIGHT' | 'DARK' | null) ?? 'ALL';
		filterData();
	});

	let filteredData = data.logos;

	function filterData() {
		filteredData = data.logos
			.filter((logo) => (logoType === 'ALL' ? true : logoType === logo.type))
			.filter(
				(l) =>
					l.name.toLowerCase().includes(keyword.toLowerCase()) ||
					l.Team?.name.toLowerCase().includes(keyword.toLowerCase())
			);
	}

	function submitSearch() {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('keyword', keyword);
		newUrl?.searchParams?.set('logoType', logoType);
		goto(newUrl);
		filterData();
	}
</script>

<svelte:head>
	<title>Keresés</title>
</svelte:head>

<h1>Keresés</h1>

<div class="flex flex-row gap-2">
	<input
		class="max-w-[15rem]"
		type="text"
		bind:value={keyword}
		on:keypress={(e) => {
			if (e.key === 'Enter') {
				submitSearch();
			}
		}}
	/>

	<select bind:value={logoType} class="w-fit inline">
		<option value="ALL">Összes</option>
		<option value="LIGHT">Világos</option>
		<option value="DARK">Sötét</option>
	</select>
	<button on:click={() => submitSearch()}>Keresés</button>
</div>

<div class="grid gap-8 my-4" style="grid-template-columns: repeat(auto-fill,minmax(180px,1fr));">
	{#each filteredData as logo}
		<LogoElement groupSlug={logo.Team?.Group.slug} teamSlug={logo.Team?.slug} {logo} />
	{/each}
</div>

<style lang="postcss">
	h1 {
		@apply text-3xl font-bold mb-8;
	}
	input,
	select {
		@apply rounded-lg border-0 shadow-md px-4 py-2;
	}

	select {
		@apply pr-8;
	}

	button {
		@apply p-2 transition-all bg-logotar-primary rounded-lg text-white shadow-md;
	}
</style>
