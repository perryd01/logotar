<script lang="ts">
	import CategoryPreviewSection from '$lib/components/CategoryPreviewSection.svelte';
	import { getLogoWithParams } from 'ui';
	import type { PageServerData, PageServerParentData } from './$types';

	export let data: PageServerData & PageServerParentData;
	console.log(data);
</script>

<svelte:head>
	<title>Logók</title>
</svelte:head>

<div class="grid gap-16">
	{#each data.groups as group}
		<CategoryPreviewSection
			section={group.nameLong ?? group?.name}
			logos={group.teams.map((t) => {
				const primaryLogo = t.Logos.find((l) => t.primaryLogoId === l.id);
				const logo = primaryLogo ?? t.Logos[0];

				return {
					teamName: t.name,
					href: `/teams/${t.slug}`,
					image: getLogoWithParams({
						host: data.host,
						group: group.slug,
						team: t.slug,
						logo: logo?.name
					})
				};
			})}
		/>
	{/each}
</div>
