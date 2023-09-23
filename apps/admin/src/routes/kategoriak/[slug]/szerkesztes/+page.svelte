<script lang="ts">
	import GroupForm from '$lib/components/forms/GroupForm.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	const action = `/kategoriak/${data?.group?.slug}?/edit`;
</script>

<h1>{data.group.name} kategória szerkesztése</h1>
<GroupForm {data} {action} />
