<script lang="ts">
	import type { PageData } from './$types';
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Tooltip
	} from 'flowbite-svelte';

	export let data: PageData;

	let searchTerm = '';

	$: filteredItems = data.groups.filter((item) => {
		const term = searchTerm.trim().toLowerCase();
		return item.name.toLowerCase().includes(term);
	});
</script>

<svelte:head><title>Kategóriák</title></svelte:head>

<a class="link-button" href="/kategoriak/uj">Új kategória hozzáadása</a>
<TableSearch hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>ID</TableHeadCell>
		<TableHeadCell>Név</TableHeadCell>
		<TableHeadCell>slug</TableHeadCell>
		<TableHeadCell>Csapatok száma</TableHeadCell>
		<TableHeadCell>Letiltva</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as group}
			<TableBodyRow>
				<TableBodyCell>
					{group.id}
				</TableBodyCell>
				<TableBodyCell>
					<a href={`/kategoriak/${group.slug}`} class="text-logotar-primary underline">
						{group.name}
					</a>
					<p class="text-xs truncate max-w-[15em]">{group.nameLong}</p>
					<Tooltip>{group.nameLong}</Tooltip>
				</TableBodyCell>
				<TableBodyCell>
					{group.slug}
				</TableBodyCell>
				<TableBodyCell>
					{group.teams.length}
				</TableBodyCell>
				<TableBodyCell>
					{group.isDisabled ? 'igen' : 'nem'}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
