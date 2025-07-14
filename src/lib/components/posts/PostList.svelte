<script lang="ts">
	import PostCard from '$lib/components/posts/PostCard.svelte';
	// import type { Post } from '../../types';

	type Post = {
		title: string;
		description: string;
		slug: string;
		image?: string;
		date: string;
		categories: string[];
		published: boolean;
	};
	const { posts }: { posts: Post[] } = $props();
</script>

<div>
	<div class="grid w-full grid-cols-1 justify-items-center gap-6 xl:gap-10">
		{#each posts as post (post.slug)}
			<PostCard
				recent={false}
				title={post.title}
				slug={post.slug}
				img={post.image}
				description={post.description}
				date={post.date}
			/>
		{/each}
	</div>
</div>
