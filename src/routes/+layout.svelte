<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layouts/Navbar.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white dark:bg-zinc-800">
	<Navbar />
	<main class="mx-auto w-full flex-grow text-zinc-800 dark:text-white [:where(&)]:max-w-7xl">
		{@render children()}
	</main>
	<Footer />
</div>
