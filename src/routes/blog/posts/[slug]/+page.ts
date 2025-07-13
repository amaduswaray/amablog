// import type { MarkdownPost } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	console.log(slug);

	const markdownPost = await import(`../../../../posts/${slug}.md`);

	return {
		metadata: markdownPost.metadata,
		post: markdownPost.default
	};
};
