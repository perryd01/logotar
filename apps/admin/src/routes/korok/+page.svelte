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

	$: filteredItems = data.teams.filter((item) => {
		const term = searchTerm.trim().toLowerCase();
		return item.name.toLowerCase().includes(term);
	});
</script>

<svelte:head><title>Körök</title></svelte:head>

<TableSearch hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>id</TableHeadCell>
		<TableHeadCell>PéK id</TableHeadCell>
		<TableHeadCell>Név</TableHeadCell>
		<TableHeadCell>Kategória</TableHeadCell>
		<TableHeadCell>slug</TableHeadCell>
		<TableHeadCell>Logók száma</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as group}
			<TableBodyRow>
				<TableBodyCell>
					{group.id}
				</TableBodyCell>
				<TableBodyCell>
					{#if group.internalId && group.internalId > 0}
						<a
							target="_blank"
							href={`https://pek.sch.bme.hu/groups/${group.internalId}`}
							class="text-xs block text-logotar-primary underline">{group.internalId}</a
						>
					{:else}
						üres
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					{group.name}
					{#if group.nameLong}
						<p class="text-xs truncate max-w-[15em]">{group.nameLong}</p>
						<Tooltip>{group.nameLong}</Tooltip>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					{group.Group.name}
				</TableBodyCell>
				<TableBodyCell>
					{group.slug}
				</TableBodyCell>
				<TableBodyCell>
					{group.Logos.length}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
