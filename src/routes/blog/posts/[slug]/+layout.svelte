<script lang="ts">
	import type { LayoutProps } from '../$types';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import Giscus from '@giscus/svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { mode } from 'mode-watcher';

	let { data, children }: LayoutProps = $props();
	const relData = data as LayoutData;
	const { metadata, readTime } = relData;
</script>

<article class="col-span-4 mx-auto w-full px-6 py-8 [:where(&)]:max-w-3xl">
	<div>
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="../">Posts</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>{metadata.title}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<img class="my-2 w-full rounded-lg" src={metadata.image} alt="" />
	<h1 class="mt-10 text-left text-4xl font-bold text-neutral-800 dark:text-neutral-200">
		{metadata.title}
	</h1>
	<div class="mt-2 flex items-center justify-between border-b border-neutral-500">
		<div class="flex items-center py-5 text-base">
			<a href="/home">
				<img
					class="mr-3 h-10 w-10 rounded-full border-2 border-neutral-500"
					src="/profile.jpeg"
					alt="avatar"
				/>
			</a>
			<span class="mr-2 text-neutral-800 dark:text-neutral-200">
				<a href="/about"> Amadu Swaray </a>
			</span>
			<span class="text-sm text-neutral-400">{readTime} min read</span>
		</div>
		<div class=" hidden items-center text-base sm:flex">
			<span class="mr-2 text-neutral-400">{metadata.date}</span>
			<!-- <flux:icon.clock class="size-5 text-neutral-400" /> -->
		</div>
	</div>

	<div
		class="prose dark:prose-invert my-6 py-3 text-justify text-lg text-neutral-800 dark:text-neutral-200"
	>
		{@render children()}
	</div>
</article>
<hr />
<div class="px-4 py-4">
	<Giscus
		id="comments"
		repo="amaduswaray/amablog"
		repoId="R_kgDOPMafjg"
		category="General"
		categoryId="DIC_kwDOPMafjs4CtPx4"
		mapping="specific"
		term={$page.url.pathname}
		reactionsEnabled="1"
		emitMetadata="0"
		inputPosition="bottom"
		theme={mode.current === 'light' ? 'catppuccin_latte' : 'catppuccin_mocha'}
		lang="en"
		loading="lazy"
	/>
</div>
