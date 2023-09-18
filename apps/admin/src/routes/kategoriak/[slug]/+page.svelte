<script lang="ts">
	import { Skull } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import {
		Button,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Tooltip
	} from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	export let data: PageServerData;

	let teamSearchTerm = '';
</script>

<svelte:head><title>{data.nameLong ?? data.name}</title></svelte:head>

<h1>{data.name}</h1>
<small>{data.nameLong}</small>

<p>id: {data.id}</p>
<p>slug: {data.slug}</p>
<p>letilva: {data.isDisabled ? 'igaz' : 'hamis'}</p>

<p>csapatok száma: {data.teams.length}</p>

<div class="flex flex-row gap-2">
	<Button color="light" on:click={() => (defaultModal = true)}>Szerkesztés</Button>
	<form method="POST" action="?/delete" use:enhance>
		<Button color="red" type="submit">
			{#if data.isDisabled}
				Végleges törlés
				<Skull size={16} />
			{:else}
				Letiltás
			{/if}
		</Button>
	</form>

	{#if data.isDisabled}
		<form method="POST" action="?/reactivate" use:enhance>
			<Button color="green" type="submit">Visszaállítás</Button>
		</form>
	{/if}
</div>

<h2>Csapatok</h2>
<TableSearch hoverable={true} bind:inputValue={teamSearchTerm}>
	<TableHead>
		<TableHeadCell>id</TableHeadCell>
		<TableHeadCell>PéK id</TableHeadCell>
		<TableHeadCell>Név</TableHeadCell>
		<TableHeadCell>Slug</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each data.teams as team}
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
					<a href={`/korok/${team.slug}`} class="text-logotar-primary underline">
						{team.name}
					</a>
					{#if team.nameLong}
						<p class="text-xs truncate max-w-[15em]">{team.nameLong}</p>
						<Tooltip>{team.nameLong}</Tooltip>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					{team.slug}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
