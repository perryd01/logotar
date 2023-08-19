<script lang="ts">
	import CategoryPreviewSection from '$lib/components/CategoryPreviewSection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { group } = data;
</script>

<h1 class="text-3xl font-semibold">
	{group.nameLong ?? group.name}
	{#if group.nameLong}
		<small class="">({group.name})</small>
	{/if}
</h1>

<CategoryPreviewSection
	hideSectionName
	logos={group.teams.map((t) => {
		const logo = t.Logos[0] ?? '';

		return {
			teamName: t.name,
			href: `/logok/${t.slug}`,
			image: `/api/assets/${group.slug}/${t.slug}/${logo.name}.svg`
		};
	})}
/>
