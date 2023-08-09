<script lang="ts">
	import logo from '$lib/assets/logo_white.svg?raw';
	export let version: string | undefined = '0.0.1';
	const routes = [
		{
			name: 'főoldal',
			path: '/'
		},
		{
			name: 'logók',
			path: '/logok'
		},
		{
			name: 'kategóriák',
			path: '/kategoriak'
		},
		{
			name: 'keresés',
			path: '/kereses'
		},
		{
			name: 'gyik',
			path: '/gyik'
		}
	];
</script>

<footer>
	<div class="footerContent">
		<a href="/">logotar.schdesgin.hu</a>
		<ul class="flex flex-row gap-4 text-logotar-gray-100">
			{#each routes as r}
				<li>
					<a href={r.path}>{r.name}</a>
				</li>
			{/each}
		</ul>
		<span>made with sveltekit & tailwindcss</span>
		<span>{`logotar v${version}`}</span>
		<span>
			{@html logo}
		</span>
	</div>
</footer>

<style lang="postcss">
	footer {
		@apply bg-logotar-dark py-8 px-2 text-white;
	}

	.footerContent {
		@apply flex flex-col items-center gap-3 container mx-auto;
	}
</style>
