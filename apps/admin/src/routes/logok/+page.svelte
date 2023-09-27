<script lang="ts">
	import { getLogoWithParams } from 'ui';
	import type { PageData } from './$types';
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	export let data: PageData;

	let searchTerm = '';

	$: filteredItems = data.logos.filter((item) => {
		const term = searchTerm.trim().toLowerCase();
		return (
			item.name.toLowerCase().includes(term) ||
			item.Team?.name.toLowerCase().includes(term) ||
			item.Team?.Group.slug.toLowerCase().includes(term)
		);
	});
</script>

<svelte:head><title>Logók</title></svelte:head>

<a class="link-button" href="/logok/uj">Új logó hozzáadása</a>
<TableSearch hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>Logo</TableHeadCell>
		<TableHeadCell>Id</TableHeadCell>
		<TableHeadCell>Név</TableHeadCell>
		<TableHeadCell>Csapat</TableHeadCell>
		<TableHeadCell>Típus</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as logo}
			<TableBodyRow>
				<TableBodyCell>
					<a
						href={`http://localhost:5174/api/assets/${logo.Team?.Group.slug}/${logo.Team?.slug}/${logo.name}.svg`}
						target="_blank"
					>
						<img
							class="w-16 h-16"
							alt={`${logo.name} logo`}
							src={getLogoWithParams({
								host: data.host,
								group: logo.Team?.Group.slug ?? '',
								team: logo.Team?.slug ?? '',
								logo: logo.name
							})}
						/>
					</a>
				</TableBodyCell>
				<TableBodyCell>
					{logo.id}
				</TableBodyCell>
				<TableBodyCell>
					{logo.name}
				</TableBodyCell>
				<TableBodyCell>
					{logo.Team?.name}
				</TableBodyCell>
				<TableBodyCell>
					{logo.type}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
