<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layouts/Navbar.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="author" content="Amadu" />
	<meta name="theme-color" content="#090B10" />
	<link rel="icon" href="/logo.png" />
</svelte:head>

<div class="relative h-[100dvh] overflow-hidden">
	<Navbar />
	<main class="h-full overflow-y-auto pt-14 pb-16">
		<ModeWatcher />
		{@render children()}
	</main>
	<Footer />
</div>
