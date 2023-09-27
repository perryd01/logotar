<script lang="ts">
	import CategoryPreviewSection from '$lib/components/CategoryPreviewSection.svelte';
	import { Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { getLogoWithParams } from 'ui';

	export let data: PageData;
</script>

<svelte:head>
	<title>Logotár</title>
</svelte:head>

<section class="text-center pb-8">
	<h1 class="text-5xl font-bold">schdesign logótár</h1>
	<p class="py-6 px-2 md:py-10 md:px-8 text-lg">
		Egy <a href="https://schdesign.hu" target="_blank" class="text-logotar-primary hover:underline"
			>schdesign</a
		> weboldal, ahol megtalálod az összes Schönherz-hez és Simonyi-hoz köthető logót raszteres és vektoros
		formátumban is. Letöltheted őket svg-ként, png-ként és még a mobilnetedet is alig fogyasztja.
	</p>
</section>
<section class="mb-16 mx-auto max-w-md w-full">
	<form class="flex flex-row gap-4">
		<input
			placeholder="Keresés a körök között"
			type="text"
			class="w-full rounded-lg border-0 shadow-md px-4 py-2"
		/>
		<button
			type="submit"
			class="p-2 transition-all bg-white hover:bg-gray-50 shadow-md rounded-lg
		"
		>
			<Search />
		</button>
	</form>
</section>

<div class="grid gap-16">
	{#each data.groups as group}
		<CategoryPreviewSection
			section={group.nameLong ?? group.name}
			logos={group.teams.map((t) => {
				const primaryLogo = t.Logos.find((l) => t.primaryLogoId === l.id);
				const logo = primaryLogo ?? t.Logos[0];

				return {
					teamName: t.name,
					slug: t.slug,
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
	{/each}
</div>
