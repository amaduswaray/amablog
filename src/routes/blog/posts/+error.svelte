<script lang="ts">
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
		<h1 class="mb-4 text-6xl font-bold text-neutral-800 dark:text-neutral-200">404</h1>
		<h2 class="mb-2 text-3xl font-semibold text-neutral-700 dark:text-neutral-300">
			Post Not Found
		</h2>
		<p class="text-lg text-neutral-600 dark:text-neutral-400">
			Sorry, the blog post you're looking for doesn't exist. It may have been moved or deleted.
		</p>
	</div>

	{#if recentPosts.length > 0}
		<div class="mb-8">
			<h3 class="mb-6 text-xl font-semibold text-neutral-700 dark:text-neutral-300">
				You might enjoy these recent posts:
			</h3>
			<div class="flex flex-col items-center gap-6">
				{#each recentPosts as post}
					<PostCard
						img={post.image}
						slug={post.slug}
						title={post.title}
						recent={true}
						description={post.description}
						date={post.date}
					/>
				{/each}
			</div>
		</div>
	{/if}

	<div class="flex justify-center gap-4">
		<a
			href="/blog"
			class="rounded-lg bg-neutral-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300"
		>
			View All Posts
		</a>
		<a
			href="/"
			class="rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
		>
			Go Home
		</a>
	</div>
</div>
