<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { posts }: { posts: any[] } = $props();
</script>

<div class="flex flex-col">
	{#each posts as post (post.slug)}
		<a
			href={`/posts/${post.slug}`}
			class="group border-border hover:border-primary flex items-start gap-4 border-l-2 py-4 pl-4 transition-colors"
		>
			<div class="flex-1">
				<h3 class="group-hover:text-primary font-semibold transition-colors">{post.title}</h3>
				<p class="text-muted-foreground mt-1 line-clamp-2 text-sm">{post.description}</p>
			</div>
			<span class="text-muted-foreground shrink-0 text-xs">{post.date}</span>
		</a>
	{/each}
</div>
