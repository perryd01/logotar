<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { RefreshCcw } from 'lucide-svelte';
	import slugify from 'slugify';
	import type { Group } from 'database';
	import { Button } from 'flowbite-svelte';

	export let data: {
		group?: Partial<Group>;
		form?: any;
	} = {};

	export let action: string | undefined = undefined;

	const { form, constraints, enhance } = superForm(data.form);

	function generateSlug() {
		if (!$form.name) return;

		form.update(($form) => {
			$form.slug = slugify($form.name, { lower: true, strict: true });
			return $form;
		});
	}

	form.update(($form) => {
		if (data.group) {
			return {
				name: data.group.name ?? $form.name,
				nameLong: data.group.nameLong ?? $form.nameLong,
				slug: data.group.slug ?? $form.slug
			};
		}
		return $form;
	});
</script>

<svelte:head>
	<title>{data?.group?.name ?? ''} kategória szerkesztése</title>
</svelte:head>

<form method="POST" action={action || null} class="grid gap-2 max-w-lg" use:enhance>
	<div>
		<label for="name">Kategória neve{$constraints.name?.required ? '*' : ''}</label>
		<input
			type="text"
			name="name"
			bind:value={$form.name}
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
			bind:value={$form.nameLong}
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
				bind:value={$form.slug}
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
		<Button type="submit" class="bg-logotar-primary text-white">Küldés</Button>
		<Button color="light" on:click={() => history.back()}>Mégse</Button>
	</div>
</form>
