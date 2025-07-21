<script lang="ts">
	import Connect from '../Connect.svelte';

	const date = new Date();
</script>

<footer
	class="mt-8 bg-background py-10 text-foreground dark:bg-background dark:text-foreground"
>
	<div
		class="container mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row md:gap-0"
	>
		<div class="flex flex-col items-center md:items-start">
			<h2 class="text-2xl font-semibold tracking-wide">AMADU'S &amp; DON'TS</h2>
			<p class="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
				Blog by Chef Ama
			</p>
		</div>
		<Connect />
	</div>

	<div
		class="mt-8 border-t border-border pt-5 text-center text-xs text-muted-foreground dark:text-muted-foreground"
	>
		&copy; {date.getFullYear()} Amadu Swaray. All rights reserved.
	</div>
</footer>
