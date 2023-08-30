<script lang="ts">
	import type { LayoutServerData } from '../$types';
	import AuthButton from '$lib/components/AuthButton.svelte';

	export let data: LayoutServerData;
</script>

<AuthButton type="login" disabled={!!data.session} />
<AuthButton type="logout" disabled={!data.session} />
