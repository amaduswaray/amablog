<script lang="ts">
	import PostList from '$lib/components/posts/PostList.svelte';
	const { data } = $props();
	const { posts } = data;
</script>

<svelte:head>
	<title>Posts | Amadu's and Don'ts</title>
	<meta
		name="description"
		content="All posts from Amadu's and Don'ts — a blog about software, DevOps, and technology."
	/>
	<meta property="og:title" content="Blog | Amadu's and Don'ts" />
	<meta
		property="og:description"
		content="All posts from Amadu's and Don'ts — a blog about software, DevOps, and technology."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://amaduswaray.github.io/posts" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Blog | Amadu's and Don'ts" />
	<meta
		name="twitter:description"
		content="All posts from Amadu's and Don'ts — a blog about software, DevOps, and technology."
	/>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-8">
	<PostList {posts} />
</div>
