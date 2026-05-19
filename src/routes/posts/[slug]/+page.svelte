<script lang="ts">
	import type { PageProps } from './$types';
	import './code-syntax-highlight.css';
	import CopyInjector from '$lib/components/codeCopy/CopyInjector.svelte';

	let { data }: PageProps = $props();
	const { post: Post } = data;
</script>

<CopyInjector>
	<Post />
</CopyInjector>
