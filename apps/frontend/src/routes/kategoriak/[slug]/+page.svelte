<script lang="ts">
	import CategoryPreviewSection from '$lib/components/CategoryPreviewSection.svelte';
	import { getLogoWithParams } from 'ui';
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
		const primaryLogo = t.Logos.find((l) => t.primaryLogoId === l.id);
		const logo = primaryLogo ?? t.Logos[0];

		return {
			teamName: t.name,
			href: `/logok/${t.slug}`,
			image: getLogoWithParams({
				host: data.host,
				group: group.slug,
				team: t.slug,
				logo: logo.name
			})
		};
	})}
/>
