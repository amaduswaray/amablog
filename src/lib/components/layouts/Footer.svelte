<script lang="ts">
	import Connect from '../Connect.svelte';

	const date = new Date();
</script>

<footer
	class="border-border bg-background/95 fixed bottom-0 left-0 z-40 flex h-16 w-full items-center border-t backdrop-blur-lg"
>
	<div class="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
		<div class="flex flex-col leading-none">
			<a href="/" class="hover:text-primary text-sm font-semibold tracking-wide transition-colors">
				AMADU'S &amp; DON'TS
			</a>
			<span class="text-muted-foreground mt-0.5 text-[10px]">Blog by Chef Ama</span>
		</div>

		<span class="text-muted-foreground text-xs">
			&copy; {date.getFullYear()} Amadu. All rights reserved.
		</span>

		<Connect />
	</div>
</footer>
