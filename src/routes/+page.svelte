<script lang="ts">
	import Connect from '$lib/components/Connect.svelte';
	import Book from '$lib/components/featured/Book.svelte';
	import Music from '$lib/components/featured/Music.svelte';
	import LatestPosts from '$lib/components/posts/LatestPosts.svelte';
	//import Projects from '$lib/components/Projects.svelte';
	const { data } = $props();
	const { posts } = data;
</script>

<svelte:head>
	<title>Amadu's and Don'ts</title>
	<meta
		name="description"
		content="Amadu's and Don'ts — a personal blog about software, DevOps, technology, and life. Writing refines your thoughts."
	/>
	<meta property="og:title" content="Amadu's and Don'ts" />
	<meta
		property="og:description"
		content="Amadu's and Don'ts — a personal blog about software, DevOps, technology, and life."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://amaduswaray.github.io" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Amadu's and Don'ts" />
	<meta
		name="twitter:description"
		content="Amadu's and Don'ts — a personal blog about software, DevOps, technology, and life."
	/>
</svelte:head>

<div class="border-border mx-auto flex min-h-full max-w-7xl flex-col border-x xl:flex-row">
	<!-- Left panel -->
	<div class="border-border flex flex-col border-b p-8 xl:w-1/2 xl:border-r xl:border-b-0">
		<div class="mb-2 flex items-center gap-3">
			<span class="bg-primary/10 text-primary inline-block rounded-sm px-2 py-0.5 text-xs"
				>NORMAL</span
			>
			<span class="text-muted-foreground text-xs">~/index.md</span>
			<span class="text-muted-foreground text-xs">utf-8</span>
		</div>

		<h1 class="my-4 flex items-center gap-4 text-5xl font-semibold">AMADU'S & DON'TS</h1>
		<p class="text-muted-foreground py-2">
			I'm Amadu, also known as Chef Ama (pronounced: ey-mey).
		</p>
		<p class="text-muted-foreground mb-4 py-2">
			Stephen King once said writing refines your thoughts, so this is where I sharpen mine :)
		</p>
		<Connect />

		<div class="mt-8 space-y-6">
			<h2 class="text-foreground mb-1 text-sm font-semibold">TLDR;</h2>
			<p class="text-muted-foreground text-sm leading-relaxed">
				Norway based developer with a passion for building things.
			</p>

			<section>
				<h2 class="text-foreground mb-1 text-sm font-semibold">Developer Life</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Avid <span class="text-primary font-medium">Vim</span> user and
					<span class="text-primary font-medium">Terminal</span> enjoyer.
				</p>
			</section>

			<section>
				<h2 class="text-foreground mb-1 text-sm font-semibold">What I'm Doing Now</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Currently a developer at
					<span class="text-primary font-medium">Orgbrain</span>. Outside of work, I'm diving into
					systems programming and creating hobby projects in
					<span class="text-primary font-medium">Rust</span>
					and
					<span class="text-primary font-medium">Elixir</span>.
				</p>
			</section>

			<section>
				<h2 class="text-foreground mb-1 text-sm font-semibold">Beyond Code</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Outside of programming, I enjoy listening to music and discovering new genres and artists.
					Lately, I've also taken an interest in reading as a way to unplug from social media and
					recharge.
				</p>
			</section>
		</div>

		<div class="flex-1"></div>

		<div class="mt-8 flex flex-col gap-4">
			<Book />
			<Music />
		</div>
	</div>

	<!-- Right panel -->

	<!-- Right panel -->
	<div class="flex flex-1 flex-col justify-between gap-8 p-8">
		<!-- <div> -->
		<!-- 	<h2 class="text-muted-foreground mb-6 text-xs font-semibold tracking-widest uppercase"> -->
		<!-- 		Projects -->
		<!-- 	</h2> -->
		<!-- 	<Projects /> -->
		<!-- </div> -->
		<div>
			<h2 class="text-muted-foreground mb-6 text-xs font-semibold tracking-widest uppercase">
				Latest Posts
			</h2>
			<LatestPosts {posts} />
			<a
				href="/posts"
				class="text-muted-foreground hover:text-primary mt-6 block w-full text-right text-sm transition-colors"
			>
				Read more →
			</a>
		</div>
	</div>
</div>
