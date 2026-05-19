<script lang="ts">
	import Giscus from '@giscus/svelte';
	import type { LayoutData, LayoutProps } from './$types';
	import { page } from '$app/state';
	import { mode } from 'mode-watcher';
	import { navbarTitle } from '$lib/stores/navbar';
	import { onDestroy } from 'svelte';

	let { data, children }: LayoutProps = $props();
	const relData = data as LayoutData;
	const { metadata, readTime } = relData;

	navbarTitle.set(metadata.title);

	onDestroy(() => {
		navbarTitle.set('');
	});
</script>

<svelte:head>
	<title>{metadata.title} | Amadu's and Don'ts</title>
	<meta name="description" content={metadata.description} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={page.url.href} />
	{#if metadata.image}
		<meta property="og:image" content={metadata.image} />
	{/if}
	<meta property="article:published_time" content={metadata.date} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metadata.title} />
	<meta name="twitter:description" content={metadata.description} />
	{#if metadata.image}
		<meta name="twitter:image" content={metadata.image} />
	{/if}
</svelte:head>

<article class="mx-auto w-full max-w-3xl px-6 py-8">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<h1 class="text-3xl font-bold sm:text-4xl">{metadata.title}</h1>
	</div>

	<div class="text-muted-foreground mt-4 flex shrink-0 justify-between text-sm sm:text-right">
		<span>{readTime} min read</span>
		<span>{metadata.date}</span>
	</div>

	<hr class="dark:border-border my-6 border-neutral-200" />

	<div class="prose dark:prose-invert dark:text-foreground text-justify text-lg text-neutral-800">
		{@render children()}
	</div>
</article>

<hr class="dark:border-border border-neutral-200" />

<div class="mx-auto max-w-3xl px-4 py-4">
	<Giscus
		id="comments"
		repo="amaduswaray/amablog"
		repoId="R_kgDOPMafjg"
		category="General"
		categoryId="DIC_kwDOPMafjs4CtPx4"
		mapping="specific"
		term={page.url.pathname}
		reactionsEnabled="1"
		emitMetadata="0"
		inputPosition="bottom"
		theme={mode.current === 'light' ? 'light' : 'dark'}
		lang="en"
		loading="lazy"
	/>
</div>
