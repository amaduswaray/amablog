<script lang="ts">
	import Connect from '../Connect.svelte';
	import { page } from '$app/state';
	import { toggleMode, mode } from 'mode-watcher';
	import { SunIcon, MoonIcon } from '@lucide/svelte';

	const date = new Date();
	let currentPath = $derived(page.url.pathname);
	let isPostsPage = $derived(currentPath.startsWith('/posts'));
</script>

<footer
	class="border-border bg-background/95 fixed bottom-0 left-0 z-40 flex h-16 w-full items-center border-t backdrop-blur-lg"
>
	<div class="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
		<div class="hidden flex-col leading-none sm:flex">
			<a href="/" class="hover:text-primary text-sm font-semibold tracking-wide transition-colors">
				AMADU'S &amp; DON'TS
			</a>
			<span class="text-muted-foreground mt-0.5 text-[10px]">Blog by Chef Ama</span>
		</div>

		<span class="text-muted-foreground text-xs">
			&copy; {date.getFullYear()} All rights reserved.
		</span>

		<div class="flex items-center gap-3">
			<div class="hidden sm:block">
				<Connect />
			</div>
			{#if isPostsPage}
				<button
					class="hover:text-primary block shrink-0 cursor-pointer sm:hidden"
					onclick={toggleMode}
					aria-label="Toggle theme"
				>
					{#if mode.current == 'light'}
						<MoonIcon class="h-[1.2rem] w-[1.2rem]" />
					{:else}
						<SunIcon class="h-[1.2rem] w-[1.2rem]" />
					{/if}
				</button>
			{/if}
		</div>
	</div>
</footer>
