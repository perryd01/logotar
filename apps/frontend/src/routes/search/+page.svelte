<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { LogoElement } from 'ui';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Loader2 } from 'lucide-svelte';

	export let data: PageData;

	let logoType: 'ALL' | 'LIGHT' | 'DARK' = 'ALL';
	let keyword = '';
	let limit = String(data.limit ?? 20);

	let timeout: null | NodeJS.Timeout = null;
	let searching = false;

	$: if ($navigating?.complete && !searching) {
		if ($page.url.search === '') {
			keyword = '';
		}
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

		updateUrl();
		searching = false;
	}

	function updateUrl() {
		const newUrl = new URL($page.url);
		if (keyword) {
			newUrl?.searchParams?.set('keyword', keyword);
			newUrl?.searchParams?.delete('skip');
		} else {
			newUrl?.searchParams.delete('keyword');
		}
		newUrl?.searchParams?.set('logoType', logoType);
		newUrl?.searchParams?.set('limit', limit);
		goto(newUrl, {
			keepFocus: true,
			invalidateAll: true
		});
	}

	function createPaginationUrl(index: number) {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('keyword', keyword);
		newUrl?.searchParams?.set('limit', limit);
		newUrl?.searchParams?.set('skip', String(data.limit * index));
		return newUrl.toString();
	}

	function trackChange(field: 'limit' | 'logoType') {
		const newUrl = new URL($page.url);
		if (field === 'logoType') newUrl?.searchParams?.set(field, logoType);
		if (field === 'limit') {
			newUrl?.searchParams?.set(field, limit);
		}
		newUrl?.searchParams?.delete('skip');

		goto(newUrl, {
			keepFocus: true
		});
	}
</script>

<svelte:head>
	<title>Keresés</title>
</svelte:head>

<h1>Keresés</h1>

<div class="flex flex-row justify-between">
	<div class="flex flex-row gap-2 items-center">
		<input class="max-w-[15rem]" type="text" bind:value={keyword} on:input={handleSearch} />

		<select bind:value={logoType} class="w-fit inline" on:change={() => trackChange('logoType')}>
			<option value="ALL">Összes</option>
			<option value="LIGHT">Világos</option>
			<option value="DARK">Sötét</option>
		</select>

		{#if searching}
			<Loader2 class="animate-spin" />
		{/if}
	</div>
	<div>
		<select bind:value={limit} class="w-fit inline" on:change={() => trackChange('limit')}>
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="50">50</option>
			<option value="100">100</option>
		</select>
	</div>
</div>

<div class="grid gap-8 my-4" style="grid-template-columns: repeat(auto-fill,minmax(180px,1fr));">
	{#each data.logos ?? [] as logo}
		<LogoElement
			host={data.host}
			groupSlug={logo.Team?.Group.slug}
			teamSlug={logo.Team?.slug}
			{logo}
		/>
	{/each}
</div>

{#if data.pages > 1}
	<div class="pagination">
		{#each Array(data.pages) as _, idx}
			{@const url = createPaginationUrl(idx)}
			<a
				class:active={(data.params.skip && Number(data.params.skip) == data.limit * idx) ||
					(data.params.skip === 0 && idx === 0)}
				class="item"
				href={url}
			>
				{idx + 1}
			</a>
		{/each}
	</div>
{/if}

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
	.pagination {
		@apply flex flex-row gap-2 items-center justify-center py-8;
	}

	.pagination > .item {
		@apply rounded-lg border-0 shadow-md px-4 py-2;
	}

	.pagination > .active {
		@apply bg-logotar-primary text-white;
	}
</style>
