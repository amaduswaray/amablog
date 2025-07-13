import type { MarkdownPost } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const slug = params.slug;

	const markdownPost: MarkdownPost = await import(`../../../../posts/${slug}.md`);

	return {
		metadata: markdownPost.metadata
	};
};
