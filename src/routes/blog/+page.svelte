<script lang="ts">
	import PostList from '$lib/components/posts/PostList.svelte';
	const { data } = $props();
	const { posts } = data;
</script>

<div
	class="items centerborder-b relative flex justify-center border-neutral-200 p-8 pb-8 xl:flex-1 dark:border-neutral-700"
>
	<h1 class="text-5xl font-stretch-expanded underline decoration-2 underline-offset-8">BLOGS</h1>
</div>
<div class="relative h-full flex-1/2 rounded-xl border-neutral-200 p-8 dark:border-neutral-700">
	<PostList {posts} />
</div>
