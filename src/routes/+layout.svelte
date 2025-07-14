<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layouts/Navbar.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="mx-auto w-full flex-grow pt-28 [:where(&)]:max-w-3xl">
		<ModeWatcher />
		{@render children()}
	</main>
	<Footer />
</div>
