<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-4xl font-semibold">Kategóriák</h1>

<ul>
	{#each data.groups as group}
		<a href="groups/{group.slug}">
			<li>
				{group.nameLong ?? group.name}
			</li>
		</a>
	{/each}
</ul>
