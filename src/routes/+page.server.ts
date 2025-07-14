// import type { MarkdownPost } from '$lib/types';
import type { PageServerLoad } from './$types';

interface Post {
	title: string;
	slug: string;
	description: string;
	image?: string;
	date: string;
	categories: string[];
	published: boolean;
}

export const load: PageServerLoad = async () => {
	let posts: Post[] = [];
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	posts = posts.slice(0, 3);

	return {
		posts: posts
	};
};
