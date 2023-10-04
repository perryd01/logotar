<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import { RefreshCcw } from 'lucide-svelte';
	import slugify from 'slugify';
	import TeamForm from '$lib/components/forms/TeamForm.svelte';
	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Új csapat hozzáadása</title>
</svelte:head>

<h1>Új csapat hozzáadása</h1>

{#if !form?.status?.success}
	<div class="">
		<TeamForm {data} />
	</div>
{/if}

{#if form?.status?.success}
	<p>siker!</p>
	<a href="/teams">Vissza a csapatokhoz</a>
	<a href={`/teams/${form?.status.data.slug}`}>Tovább az új csapathoz</a>
{/if}
