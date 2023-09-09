<script lang="ts">
	import CategoryPreviewSection from '$lib/components/CategoryPreviewSection.svelte';
	import { getLogoWithParams } from 'ui';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Logók</title>
</svelte:head>

<div class="grid gap-16">
	{#each data.groups as group}
		<CategoryPreviewSection
			section={group.nameLong ?? group?.name}
			logos={group.teams.map((t) => {
				const logo = t.Logos[0];

				return {
					teamName: t.name,
					slug: t.slug,
					href: `/logok/${t.slug}`,
					image: getLogoWithParams({
						group: group.slug,
						team: t.slug,
						logo: logo?.name
					})
				};
			})}
		/>
	{/each}
</div>
