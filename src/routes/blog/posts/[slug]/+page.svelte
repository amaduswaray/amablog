<script lang="ts">
	import type { PageLoad } from './$types';
	import './code-syntax-highlight.css';
	import CopyInjector from '$lib/components/codeCopy/CopyInjector.svelte';

	let { data }: PageLoad = $props();
	const { post: Post } = data;
</script>

<CopyInjector>
	<Post />
</CopyInjector>
