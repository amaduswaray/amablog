<script>
	import { toggleMode, mode } from 'mode-watcher';
	import { page } from '$app/state';
	import { SunIcon, MoonIcon } from '@lucide/svelte';
	let currentPath = $derived(page.url.pathname);
</script>

<header
	class="border-border bg-background/80 fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-xl border shadow-lg backdrop-blur-lg transition-colors duration-300"
>
	<nav class="flex h-20 items-center justify-between px-6">
		<a
			href="/"
			class="hover:text-primary flex items-center space-x-3 text-xl font-semibold tracking-wide transition-colors"
		>
			<span>
				<img src="/logo.png" alt="" class="h-12 w-12" width="24" height="24" loading="lazy" />
			</span>
		</a>

		<div class="text-foreground flex space-x-8 font-medium">
			<a
				href="/"
				class="hover:text-primary decoration-2 underline-offset-8 transition-colors"
				class:underline={currentPath === '/'}>Home</a
			>
			<a
				href="/blog"
				class="hover:text-primary decoration-2 underline-offset-8 transition-colors"
				class:underline={currentPath === '/blog'}>Blog</a
			>
			<a
				href="/about"
				class="hover:text-primary decoration-2 underline-offset-8 transition-colors"
				class:underline={currentPath === '/about'}>About</a
			>
		</div>

		<div class=" hidden cursor-pointer items-center space-x-4 sm:flex">
			<button
				class="hover:text-primary cursor-pointer"
				onclick={toggleMode}
				aria-label="Toggle theme"
			>
				{#if mode.current == 'light'}
					<MoonIcon
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
					/>
				{:else}
					<SunIcon
						class="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
					/>
				{/if}
			</button>
		</div>
	</nav>
</header>
