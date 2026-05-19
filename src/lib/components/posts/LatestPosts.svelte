<script lang="ts">
	import PostCard from '$lib/components/posts/PostCard.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { posts }: { posts: any[] } = $props();
</script>

<div class="flex flex-col">
	{#each posts as post (post.slug)}
		<a
			href={`/posts/${post.slug}`}
			class="group flex items-start gap-4 border-l-2 border-border py-4 pl-4 transition-colors hover:border-primary"
		>
			<div class="flex-1">
				<h3 class="font-semibold transition-colors group-hover:text-primary">{post.title}</h3>
				<p class="mt-1 text-sm text-muted-foreground line-clamp-2">{post.description}</p>
			</div>
			<span class="shrink-0 text-xs text-muted-foreground">{post.date}</span>
		</a>
	{/each}
</div>
