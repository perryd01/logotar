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
	<title>Új kategória hozzáadása</title>
</svelte:head>

<h1>Új kategória hozzáadása</h1>

{#if !form?.status?.success}
	<div class="">
		<form method="POST" class="grid gap-2 max-w-lg">
			<div>
				<label for="name">Kategória neve{$constraints.name?.required ? '*' : ''}</label>
				<input
					type="text"
					name="name"
					bind:value={$sForm.name}
					{...$constraints.name}
					autocomplete="off"
				/>
			</div>

			<div>
				<label for="name"
					>Kategória hosszabb neve (ha létezik) {$constraints.nameLong?.required ? '*' : ''}</label
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
				<label for="name">Kategória slug{$constraints.slug?.required ? '*' : ''} </label>
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
				<button type="submit" class="py-2 px-4 bg-logotar-primary rounded-lg text-white"
					>Küldés</button
				>
			</div>
		</form>
	</div>
{/if}

{#if form?.status?.success}
	<p>siker!</p>
	<a href="/kategoriak">Vissza a kategóriákhoz</a>
	<a href={`/kategoriak/${form?.status.data.slug}`}>Tovább az új kategóroiához</a>
{/if}
