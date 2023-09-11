<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import { RefreshCcw } from 'lucide-svelte';
	import slugify from 'slugify';
	export let data: PageData;
	export let form: ActionData;

	const { form: sForm, constraints } = superForm(data.form);

	function generateSlug() {
		if (!$sForm.name) return;

		sForm.update(($form) => {
			$form.slug = slugify($form.name, { lower: true, strict: true });
			return $form;
		});
	}
</script>

<svelte:head>
	<title>Új csapat hozzáadása</title>
</svelte:head>

<h1>Új csapat hozzáadása</h1>

{#if !form?.status?.success}
	<div class="">
		<form method="POST" class="grid gap-2 max-w-lg">
			<div>
				<label for="name">Csapat neve{$constraints.name?.required ? '*' : ''}</label>
				<input
					type="text"
					name="name"
					bind:value={$sForm.name}
					{...$constraints.name}
					autocomplete="off"
				/>
			</div>

			<div>
				<label for="nameLong"
					>Csapat hosszabb neve (ha létezik) {$constraints.nameLong?.required ? '*' : ''}</label
				>
				<input
					type="text"
					name="nameLong"
					bind:value={$sForm.nameLong}
					{...$constraints.nameLong}
					autocomplete="off"
				/>
			</div>

			<div>
				<label for="slug">Csapat slug{$constraints.slug?.required ? '*' : ''} </label>
				<div class="flex flex-col lg:flex-row gap-2">
					<input
						type="text"
						name="slug"
						class="w-full"
						bind:value={$sForm.slug}
						{...$constraints.slug}
						autocomplete="off"
					/>
					<button
						type="button"
						on:click={generateSlug}
						class=" py-2 px-4 bg-white rounded-lg border w-full"
						>slug generálása <RefreshCcw class="inline-block" size={18} /></button
					>
				</div>
			</div>

			<div>
				<label for="internalId">InternalID</label>
				<input
					type="number"
					name="internalId"
					bind:value={$sForm.internalId}
					autocomplete="off"
					{...$constraints.internalId}
				/>
			</div>

			<div>
				<label for="primaryLogoId">Elsődleges logó</label>
				<select name="primaryLogoId" bind:value={$sForm.primaryLogoId}>
					<option value={undefined}>Nincs</option>
					{#each data.logos as logo}
						<option value={logo.id}>{logo.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="groupId">Csoport</label>
				<select name="groupId" bind:value={$sForm.groupId}>
					{#each data.groups as group}
						<option value={group.id}>{group.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<button type="submit" class="py-2 px-4 bg-logotar-primary rounded-lg text-white"
					>Küldés</button
				>
			</div>
		</form>
	</div>
{/if}

{#if form?.status?.success}
	<p>siker!</p>
	<a href="/korok">Vissza a csapatokhoz</a>
	<a href={`/korok/${form?.status.data.slug}`}>Tovább az új csapathoz</a>
{/if}
