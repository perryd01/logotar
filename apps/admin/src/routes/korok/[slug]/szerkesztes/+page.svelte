<script lang="ts">
	import TeamForm from '$lib/components/forms/TeamForm.svelte';

	import type { PageServerData } from './$types';
	export let data: PageServerData;

	const action = `/korok/${data?.team?.slug}?/edit`;
</script>

<TeamForm {action} {data} />
