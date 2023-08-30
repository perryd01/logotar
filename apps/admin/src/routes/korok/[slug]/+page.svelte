<script lang="ts">
	import {
		TableSearch,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let logoSearchTerm = '';

	let userSearchTerm = '';
</script>

<svelte:head><title>{data.nameLong ?? data.name}</title></svelte:head>

<h1>{data.name}</h1>
{#if data.nameLong}
	<small>{data.nameLong}</small>
{/if}

<p>id: {data.id}</p>
<p>PéK id: {data.internalId}</p>

<p>slug: {data.slug}</p>

<section>
	<h2>Logók</h2>
	<TableSearch hoverable={true} bind:inputValue={logoSearchTerm}>
		<TableHead>
			<TableHeadCell>logo</TableHeadCell>
			<TableHeadCell>id</TableHeadCell>
			<TableHeadCell>Név</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each data.Logos as logo}
				<TableBodyRow>
					<TableBodyCell>
						<img
							class="w-16 h-16"
							alt={`${logo.name} logo`}
							src={`http://localhost:5174/api/assets/${data.Group.slug}/${data.slug}/${logo.name}.svg`}
						/>
					</TableBodyCell>
					<TableBodyCell>
						{logo.id}
					</TableBodyCell>
					<TableBodyCell>
						{logo.name}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</section>

<section>
	<h2>Tagok</h2>
	<TableSearch hoverable={true} bind:inputValue={userSearchTerm}>
		<TableHead>
			<TableHeadCell>id</TableHeadCell>
			<TableHeadCell>Név</TableHeadCell>
			<TableHeadCell>Role</TableHeadCell>
			<TableHeadCell>Title</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each data.Membership as ms}
				<TableBodyRow>
					<TableBodyCell>
						{ms.User?.id}
					</TableBodyCell>
					<TableBodyCell>
						{ms.User?.surname}
						{ms.User?.givenName}
					</TableBodyCell>
					<TableBodyCell>
						{ms.role}
					</TableBodyCell>
					<TableBodyCell>
						{ms.title.join(', ')}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</section>

<style lang="postcss">
	section {
		@apply my-8;
	}
</style>
