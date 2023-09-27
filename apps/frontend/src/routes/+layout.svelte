<script lang="ts">
	import { Header, Footer } from 'ui';
	import '../app.css';

	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { version } from '$app/environment';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="font-poppins flex flex-col justify-between min-h-[100svh]">
	<Header {browser} {navigating} />
	<main class="grow max-w-screen-xl mx-auto w-full px-4 my-16">
		<slot />
	</main>
	<Footer {version} />
</div>
