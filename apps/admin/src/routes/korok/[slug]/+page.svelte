<script lang="ts">
	import {
		TableSearch,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Button
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { Skull } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { getLogoWithParams } from 'ui';

	export let data: PageData;

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
<p>Letiltva: {data.isDisabled}</p>

<p>slug: {data.slug}</p>

<div class="flex flex-row gap-2">
	<Button href={`/korok/${data.slug}/szerkesztes`} color="light">Szerkesztés</Button>
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
							src={getLogoWithParams({
								host: data.host,
								group: data.Group.slug,
								team: data.slug,
								logo: logo.name
							})}
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

{#if data.internalId}
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
{/if}

<style lang="postcss">
	section {
		@apply my-8;
	}
</style>
