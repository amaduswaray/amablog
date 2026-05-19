<script>
	import { page } from '$app/state';
	import { navbarTitle } from '$lib/stores/navbar';
	import { toggleMode, mode } from 'mode-watcher';
	import { SunIcon, MoonIcon } from '@lucide/svelte';

	let currentPath = $derived(page.url.pathname);
	let isBlogPost = $derived(currentPath.startsWith('/posts/'));
	let isBlogList = $derived(currentPath === '/posts');
	let isHome = $derived(currentPath === '/');
</script>

<header
	class="border-border bg-background/95 fixed top-0 left-0 z-50 flex h-14 w-full items-center border-b backdrop-blur-lg"
>
	<div class="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
		<div class="flex min-w-0 items-center gap-5">
			{#if isBlogPost}
				<a href="/" class="hidden shrink-0 items-center sm:flex">
					<img src="/logo.png" alt="" class="h-8 w-8" />
				</a>
			{:else}
				<a href="/" class="shrink-0 items-center">
					<img src="/logo.png" alt="" class="h-8 w-8" />
				</a>
			{/if}

			<nav class="flex min-w-0 items-center gap-2 text-sm">
				<a
					href="/"
					class="hover:text-primary shrink-0 transition-colors"
					class:text-foreground={isHome}
					class:underline={isHome}
					class:underline-offset-4={isHome}
					class:text-muted-foreground={!isHome}
				>
					Home
				</a>
				<span class="text-muted-foreground shrink-0">|</span>
				{#if isBlogPost}
					<a
						href="/posts"
						class="text-muted-foreground hover:text-primary shrink-0 transition-colors"
					>
						Posts
					</a>
					<span class="text-muted-foreground shrink-0">/</span>
					<span class="text-foreground truncate font-medium" title={$navbarTitle}>
						{$navbarTitle}
					</span>
				{:else}
					<a
						href="/posts"
						class="hover:text-primary shrink-0 transition-colors"
						class:text-foreground={isBlogList}
						class:underline={isBlogList}
						class:underline-offset-4={isBlogList}
						class:text-muted-foreground={!isBlogList}
					>
						Posts
					</a>
				{/if}
			</nav>
		</div>

		<button
			class="hover:text-primary hidden shrink-0 cursor-pointer sm:block"
			onclick={toggleMode}
			aria-label="Toggle theme"
		>
			{#if mode.current == 'light'}
				<MoonIcon class="h-[1.2rem] w-[1.2rem]" />
			{:else}
				<SunIcon class="h-[1.2rem] w-[1.2rem]" />
			{/if}
		</button>
	</div>
</header>
