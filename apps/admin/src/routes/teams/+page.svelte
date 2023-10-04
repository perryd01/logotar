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

<a class="link-button" href="/teams/new">Új csapat hozzáadása</a>
<TableSearch hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>id</TableHeadCell>
		<TableHeadCell>PéK id</TableHeadCell>
		<TableHeadCell>Név</TableHeadCell>
		<TableHeadCell>Kategória</TableHeadCell>
		<TableHeadCell>slug</TableHeadCell>
		<TableHeadCell>Logók száma</TableHeadCell>
		<TableHeadCell>Letiltva</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as team}
			<TableBodyRow>
				<TableBodyCell>
					{team.id}
				</TableBodyCell>
				<TableBodyCell>
					{#if team.internalId && team.internalId > 0}
						<a
							target="_blank"
							href={`https://pek.sch.bme.hu/groups/${team.internalId}`}
							class="text-xs block text-logotar-primary underline">{team.internalId}</a
						>
					{:else}
						üres
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<a href={`/teams/${team.slug}`} class="text-logotar-primary underline">
						{team.name}
					</a>
					{#if team.nameLong}
						<p class="text-xs truncate max-w-[15em]">{team.nameLong}</p>
						<Tooltip>{team.nameLong}</Tooltip>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					{team.Group.name}
				</TableBodyCell>
				<TableBodyCell>
					{team.slug}
				</TableBodyCell>
				<TableBodyCell>
					{team.Logos.length}
				</TableBodyCell>
				<TableBodyCell>
					{team.isDisabled ? 'igen' : 'nem'}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
