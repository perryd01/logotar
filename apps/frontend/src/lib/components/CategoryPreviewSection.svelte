<script lang="ts">
	import type { ComponentProps, ComponentType } from 'svelte';
	import TeamElement from '$lib/components/TeamElement.svelte';

	type DeepRequired<T> = {
		[K in keyof T]-?: T[K];
	};
	type LogoProps = DeepRequired<ComponentProps<TeamElement>>;

	import logo from '$lib/assets/logo_mini.svg?raw';

	export let section: string = 'Foo Category';
	export let logos: Array<LogoProps> = [
		{ team: 'schdesign', logo, slug: 'schdesign' },
		{ team: 'schdesign', logo, slug: 'schdesign' },
		{ team: 'schdesign', logo, slug: 'schdesign' },
		{ team: 'mgmt', logo, slug: 'schdesign' },
		{ team: 'lego', logo, slug: 'schdesign' },
		{ team: 'kir-dev', logo, slug: 'schdesign' },
		{ team: 'kir-dev', logo, slug: 'schdesign' },
		{ team: 'kir-dev', logo, slug: 'schdesign' },
		{ team: 'kir-dev', logo, slug: 'schdesign' }
	];
</script>

<section>
	<h2 class="text-3xl font-semibold mb-4">{section}</h2>
	<div class="grid gap-8" style="grid-template-columns: repeat(auto-fill,minmax(150px,1fr));">
		{#each logos.sort((a, b) => a.team.localeCompare(b.team)) as logo}
			<TeamElement {...logo} />
		{/each}
	</div>
</section>
