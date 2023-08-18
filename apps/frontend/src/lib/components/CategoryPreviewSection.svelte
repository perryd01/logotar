<script lang="ts">
	import type { ComponentProps, ComponentType } from 'svelte';
	import { TeamElement } from 'ui';

	type DeepRequired<T> = {
		[K in keyof T]-?: T[K];
	};
	type LogoProps = DeepRequired<ComponentProps<TeamElement>>;

	export let section: string = 'Foo Category';
	export let logos: Array<LogoProps> = [];
</script>

<section>
	<h2 class="text-3xl font-semibold mb-4">{section}</h2>
	<div class="grid gap-8" style="grid-template-columns: repeat(auto-fill,minmax(150px,1fr));">
		{#each logos.sort((a, b) => a.teamName.localeCompare(b.teamName)) as logo}
			<TeamElement {...logo} />
		{/each}
	</div>
</section>
