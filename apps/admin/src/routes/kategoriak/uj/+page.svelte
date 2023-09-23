<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import slugify from 'slugify';
	import GroupForm from '$lib/components/forms/GroupForm.svelte';
	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Új kategória hozzáadása</title>
</svelte:head>

<h1>Új kategória hozzáadása</h1>

{#if !form?.status?.success}
	<div class="">
		<GroupForm {data} />
	</div>
{/if}

{#if form?.status?.success}
	<p>siker!</p>
	<a href="/kategoriak">Vissza a kategóriákhoz</a>
	<a href={`/kategoriak/${form?.status.data.slug}`}>Tovább az új kategóroiához</a>
{/if}
