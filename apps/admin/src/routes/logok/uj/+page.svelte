<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	export let data: PageData;
	export let form: ActionData;
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const { form: sForm, constraints } = superForm(data.form);

	import { dev } from '$app/environment';
</script>

<svelte:head>
	<title>Új logó hozzáadása</title>
</svelte:head>

<h1>Új logó hozzáadása</h1>

{#if dev}
	<SuperDebug data={$sForm} />
{/if}

{#if !form?.status?.success}
	<form method="POST" class="grid gap-2 max-w-lg" enctype="multipart/form-data">
		<div>
			<label for="name">Logó neve{$constraints.name?.required ? '*' : ''}</label>
			<input
				type="text"
				name="name"
				bind:value={$sForm.name}
				{...$constraints.name}
				autocomplete="off"
			/>
		</div>
		<div>
			<label for="content"
				>Logó{$constraints.content?.required ? '*' : ''}
				<input
					class="block"
					type="file"
					name="content"
					accept="image/svg+xml"
					bind:value={$sForm.content}
					{...$constraints.content}
					autocomplete="off"
				/>
			</label>
		</div>
		<div>
			<label for="type">Logó típusa{$constraints.content?.required ? '*' : ''}</label>
			<select name="type" bind:value={$sForm.type}>
				{#each ['Light', 'Dark'] as o}
					<option value={o.toUpperCase()}>{o}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="teamId">Csapat{$constraints.content?.required ? '*' : ''}</label>
			<select name="teamId" bind:value={$sForm.teamId}>
				{#each data.teams as team}
					<option value={team.id}>{team.name}</option>
				{/each}
			</select>
		</div>

		<div>
			<button type="submit" class="py-2 px-4 bg-logotar-primary rounded-lg text-white"
				>Küldés</button
			>
		</div>
	</form>
{/if}

{#if form?.status?.success}
	<p>siker!</p>
	<a href="/kategoriak">Vissza a kategóriákhoz</a>
	<a href={`/kategoriak/${form?.status.data.slug}`}>Tovább az új kategóroiához</a>
{/if}
