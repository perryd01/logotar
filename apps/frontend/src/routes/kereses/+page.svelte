<script lang="ts">
	import { page } from '$app/stores';
	import { LogoElement } from 'ui';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Loader2 } from 'lucide-svelte';

	export let data: PageData;
	let pageLoaded = false;

	let logoType: 'ALL' | 'LIGHT' | 'DARK' = 'ALL';
	let keyword = '';

	let timeout: null | NodeJS.Timeout = null;
	let searching = false;

	onMount(() => {
		console.log('onMount called');
		keyword = $page.url.searchParams.get('keyword') ?? '';
		logoType = ($page.url.searchParams.get('logoType') as 'ALL' | 'LIGHT' | 'DARK' | null) ?? 'ALL';
		filterData();
		pageLoaded = true;
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

	function handleSearch() {
		searching = true;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(getLogos, 300);
	}

	function getLogos() {
		if (!keyword) {
			searching = false;
		}

		filterData();
		updateUrl();
		searching = false;
	}

	function updateUrl() {
		const newUrl = new URL($page.url);
		if (keyword) {
			newUrl?.searchParams?.set('keyword', keyword);
		} else {
			newUrl?.searchParams.delete('keyword');
		}
		newUrl?.searchParams?.set('logoType', logoType);
		goto(newUrl, {
			keepFocus: true
		});
	}

	$: logoType,
		(() => {
			if (pageLoaded) {
				filterData();
				updateUrl();
			}
		})();
</script>

<svelte:head>
	<title>Keresés</title>
</svelte:head>

<h1>Keresés</h1>

<div class="flex flex-row gap-2 items-center">
	<input class="max-w-[15rem]" type="text" bind:value={keyword} on:input={handleSearch} />

	<select bind:value={logoType} class="w-fit inline">
		<option value="ALL">Összes</option>
		<option value="LIGHT">Világos</option>
		<option value="DARK">Sötét</option>
	</select>

	{#if searching}
		<Loader2 class="animate-spin" />
	{/if}
</div>

<div class="grid gap-8 my-4" style="grid-template-columns: repeat(auto-fill,minmax(180px,1fr));">
	{#if pageLoaded}
		{#each filteredData as logo}
			<LogoElement
				host={data.host}
				groupSlug={logo.Team?.Group.slug}
				teamSlug={logo.Team?.slug}
				{logo}
			/>
		{/each}
	{/if}
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
</style>
