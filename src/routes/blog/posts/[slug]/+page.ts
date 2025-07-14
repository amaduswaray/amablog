import type { MarkdownPost } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const markdownPost: MarkdownPost = await import(`../../../../posts/${slug}.md`);

	return {
		post: markdownPost.default
	};
};
