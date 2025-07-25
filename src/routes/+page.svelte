<script lang="ts">
	import Connect from '$lib/components/Connect.svelte';
	import Featured from '$lib/components/featured/Featured.svelte';
	import LatestPosts from '$lib/components/posts/LatestPosts.svelte';
	const { data } = $props();
	const { posts } = data;
</script>

<div class="flex h-full w-full flex-1 flex-col gap-2 rounded-xl">
	<div class="relative border-b border-border p-8 pb-8 xl:flex-1">
		<h1 class="text-6xl font-semibold lg:text-8xl">AMADU'S & DON'TS</h1>
		<p class="py-4">Amadu Swaray — aka Chef Ama (pronounced: ey-may).</p>
		<p class="py-4">
			Stephen King once said writing refines your thoughts. This blog is where I sharpen mine.
		</p>
		<p class="py-4">Developer @ Orgbrain</p>
		<Connect />
	</div>
	<Featured />
	<!-- <livewire:featured.list /> -->
	<div class="relative h-full flex-1/2 rounded-xl border-neutral-200 p-8 dark:border-neutral-700">
		<h2 class="mb-8 text-3xl">Latest Blogs</h2>
		<LatestPosts {posts} />
	</div>
	<a href="/blog"
		><p class="hover:text-primary flex w-full justify-end px-8 underline-offset-8 hover:underline">
			Read More
		</p></a
	>
</div>
