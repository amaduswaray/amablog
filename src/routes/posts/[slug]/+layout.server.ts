import type { MarkdownPost } from '$lib/types';
import type { Component } from 'svelte';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const calculateTime = (item: Component) => {
	const text = item.toString();
	const words = text.trim().split(/\s+/).length;
	const mins = Math.max(1, Math.round(words / 500));
	return mins;
};

export const load: LayoutServerLoad = async ({ params }) => {
	const slug = params.slug;

	try {
		const markdownPost: MarkdownPost = await import(`../../../posts/${slug}.md`);
		const readTime = calculateTime(markdownPost.default);

		return {
			metadata: markdownPost.metadata,
			readTime
		};
	} catch (_) {
		throw error(404, {
			message: 'Post not found'
		});
	}
};
