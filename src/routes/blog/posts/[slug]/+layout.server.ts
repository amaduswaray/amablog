import type { MarkdownPost } from '$lib/types';
import type { Component } from 'svelte';
import type { LayoutServerLoad } from './$types';

const calculateTime = (item: Component) => {
	const text = item.toString();
	const words = text.trim().split(/\s+/).length;
	const mins = Math.max(1, Math.round(words / 300));
	return mins;
};

export const load: LayoutServerLoad = async ({ params }) => {
	const slug = params.slug;
	const markdownPost: MarkdownPost = await import(`../../../../posts/${slug}.md`);
	const readTime = calculateTime(markdownPost.default);

	return {
		metadata: markdownPost.metadata,
		readTime
	};
};
