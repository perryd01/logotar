<script lang="ts">
	import type { ComponentProps, ComponentType } from 'svelte';
	import { TeamElement } from 'ui';
	import { env } from '$env/dynamic/public';

	type DeepRequired<T> = {
		[K in keyof T]-?: T[K];
	};
	type LogoProps = DeepRequired<ComponentProps<TeamElement>>;

	export let section: string = 'Foo Category';
	export let logos: Array<LogoProps> = [];

	export let hideSectionName = false;
</script>

<section>
	{#if !hideSectionName}
		<h2 class="text-3xl font-semibold mb-4">{section}</h2>
	{/if}
	<div class="grid gap-8" style="grid-template-columns: repeat(auto-fill,minmax(150px,1fr));">
		{#each logos.sort((a, b) => a.teamName.localeCompare(b.teamName)) as logo}
			<TeamElement {...logo} />
		{/each}
	</div>
</section>
