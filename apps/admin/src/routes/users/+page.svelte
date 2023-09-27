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

	$: filteredItems = data.users.filter((item) => {
		const term = searchTerm.trim().toLowerCase();
		return (
			item.givenName?.toLowerCase().includes(term) || item.surname?.toLowerCase().includes(term)
		);
	});
</script>

<svelte:head><title>Felhasználók</title></svelte:head>

<TableSearch hoverable={true} bind:inputValue={searchTerm}>
	<TableHead>
		<TableHeadCell>ID</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Given</TableHeadCell>
		<TableHeadCell>Surname</TableHeadCell>
		<TableHeadCell>Role</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each filteredItems as group}
			<TableBodyRow>
				<TableBodyCell>
					{group.id}
				</TableBodyCell>
				<TableBodyCell>
					{group.email}
				</TableBodyCell>
				<TableBodyCell>
					{group.givenName}
				</TableBodyCell>
				<TableBodyCell>
					{group.surname}
				</TableBodyCell>
				<TableBodyCell>
					{group.role}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
