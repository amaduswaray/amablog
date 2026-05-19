<script lang="ts">
	import { page } from '$app/stores';
	import type { Post } from '$lib/types';
	import PostCard from '$lib/components/posts/PostCard.svelte';

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	let posts: Post[] = [];

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	const recentPosts = posts.slice(0, 3);
</script>

<div class="mx-auto max-w-3xl px-6 py-16 text-center">
	<div class="mb-8">
		<h1 class="dark:text-foreground mb-4 text-6xl font-bold text-neutral-800">
			{$page.status}
		</h1>
		<h2 class="dark:text-foreground/80 mb-2 text-3xl font-semibold text-neutral-700">
			Page Not Found
		</h2>
		<p class="dark:text-muted-foreground text-lg text-neutral-600">
			Sorry, the page you're looking for doesn't exist. It may have been moved, deleted, or the URL
			might be incorrect.
		</p>
	</div>

	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
		<a
			href="/"
			class="dark:bg-primary dark:text-background dark:hover:bg-primary/90 rounded-sm bg-neutral-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700"
		>
			Go Home
		</a>
		<a
			href="/posts"
			class="dark:border-border dark:text-foreground dark:hover:bg-muted rounded-sm border border-neutral-300 px-6 py-3 font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
		>
			View Posts
		</a>
	</div>

	{#if recentPosts.length > 0}
		<div class="mb-8">
			<h3 class="dark:text-foreground/80 mb-6 text-xl font-semibold text-neutral-700">
				Or check out some recent posts:
			</h3>
			<div class="flex flex-col items-center gap-6">
				{#each recentPosts as post (post.slug)}
					<PostCard
						slug={post.slug}
						title={post.title}
						description={post.description}
						date={post.date}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
