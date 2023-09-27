<script lang="ts">
	import { getLogoWithParams } from 'ui';
	import type { PageServerData, PageServerParentData } from './$types';
	import LogoElement from 'ui/components/LogoElement.svelte';
	import Modal from 'ui/components/Modal.svelte';

	export let data: PageServerData & PageServerParentData;

	const sections = [
		{
			title: 'Világos háttérre ajánlott logók',
			type: 'LIGHT'
		},
		{
			title: 'Sötét háttérre ajánlott logók',
			type: 'DARK'
		}
	] as {
		title: string;
		type: PageServerDataLogo['type'];
	}[];

	type ArrayDeref<T extends unknown[]> = T[number];
	type PageServerDataLogo = ArrayDeref<PageServerData['Logos']>;

	let showModal = false;
	let selectedLogo: PageServerDataLogo | null = null;
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<h1 class="text-3xl font-semibold">
	{data.nameLong ?? data.name}
	{#if data.nameLong}
		<small class="">({data.name})</small>
	{/if}
</h1>

<a href={`/kategoriak/${data.Group.slug}`} class="text-logotar-primary underline"
	>{data.Group.nameLong ?? data.Group.name}</a
>

<div class="grid gap-8 my-4">
	{#each sections as section}
		{#if data.Logos.filter((e) => e.type === section.type).length > 0}
			<section>
				<h2>{section.title}</h2>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="grid gap-8" style="grid-template-columns: repeat(auto-fill,minmax(200px,1fr));">
					{#each data.Logos.filter((e) => e.type === section.type) ?? [] as logo}
						<LogoElement
							host={data.host}
							groupSlug={data.Group.slug}
							teamSlug={data.slug}
							{logo}
							onClick={() => {
								showModal = true;
								selectedLogo = logo;
							}}
						/>
					{/each}
				</div>
			</section>
		{/if}
	{/each}
</div>

<Modal bind:showModal>
	<div slot="header">
		<h2>{selectedLogo?.name}</h2>
	</div>
	{#if selectedLogo}
		<div class="grid md:grid-cols-2">
			<img
				src={getLogoWithParams({
					group: data.Group.slug,
					team: data.slug,
					logo: selectedLogo.name
				})}
				class="object-contain aspect-square"
				alt={selectedLogo.name}
			/>

			<aside class="p-2">
				<h2>{selectedLogo?.name}</h2>
				<h3>{selectedLogo?.type}</h3>
			</aside>
		</div>
	{/if}
</Modal>

<style lang="postcss">
	h2 {
		@apply text-2xl font-semibold;
	}
</style>
