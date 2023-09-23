<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { RefreshCcw } from 'lucide-svelte';
	import slugify from 'slugify';
	import type { Team, Logo, Group } from 'database';
	import { Button } from 'flowbite-svelte';

	export let data: {
		form?: any;
		team?: Partial<Team>;
		logos?: Partial<Logo>[];
		groups?: Partial<Group>[];
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
		if (data.team) {
			return {
				name: data.team.name ?? $form.name,
				nameLong: data.team.nameLong ?? $form.nameLong,
				slug: data.team.slug ?? $form.slug,
				groupId: data.team.groupId ?? $form.groupId,
				internalId: data.team.internalId ?? $form.internalId,
				primaryLogoId: data.team.primaryLogoId ?? $form.primaryLogoId
			};
		}
		return $form;
	});
</script>

<form method="POST" action={action || null} class="grid gap-2 max-w-lg" use:enhance>
	<div>
		<label for="name">Csapat neve{$constraints.name?.required ? '*' : ''}</label>
		<input
			type="text"
			name="name"
			bind:value={$form.name}
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
			bind:value={$form.nameLong}
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
		<label for="internalId">InternalID</label>
		<input
			type="number"
			name="internalId"
			bind:value={$form.internalId}
			autocomplete="off"
			{...$constraints.internalId}
		/>
	</div>

	<!-- <div>
		<label for="primaryLogoId">Elsődleges logó</label>
		<select name="primaryLogoId" bind:value={$form.primaryLogoId}>
			<option value={undefined}>Nincs</option>
			{#each data.logos ?? [] as logo}
				<option value={logo.id}>{logo.name}</option>
			{/each}
		</select>
	</div> -->

	<div>
		<label for="groupId">Csoport</label>
		<select name="groupId" bind:value={$form.groupId}>
			{#each data.groups ?? [] as group}
				<option value={group.id}>{group.name}</option>
			{/each}
		</select>
	</div>

	<div>
		<Button type="submit" class="bg-logotar-primary text-white">Küldés</Button>
		<Button color="light" on:click={() => history.back()}>Mégse</Button>
	</div>
</form>
