<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layouts/Navbar.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();
	let isPostsRoute = $derived(page.url.pathname === '/posts' || page.url.pathname.startsWith('/posts/'));

	onNavigate(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="author" content="Amadu" />
	<meta name="theme-color" content="#090B10" />
	<link rel="icon" href="/logo.png" />
</svelte:head>

<div class="relative min-h-[100dvh]">
	<Navbar />
	<main class={isPostsRoute ? 'pt-14' : 'min-h-[100dvh] pt-14 pb-16'}>
		<ModeWatcher />
		{@render children()}
	</main>
	<Footer fixed={!isPostsRoute} />
</div>
