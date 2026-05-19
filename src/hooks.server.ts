import type { Handle } from '@sveltejs/kit';

const paths = import.meta.glob('/src/posts/*.md', { eager: true });
const postSlugs = new Set<string>();

for (const path in paths) {
	const slug = path.split('/').at(-1)?.replace('.md', '');
	if (slug) {
		postSlugs.add(slug);
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Already on the correct path — don't redirect
	if (pathname.startsWith('/posts/')) {
		return resolve(event);
	}

	// Check if any segment of the path is a valid post slug
	const segments = pathname.split('/').filter(Boolean);
	for (const segment of segments) {
		if (postSlugs.has(segment)) {
			return new Response(null, {
				status: 308,
				headers: {
					location: `/posts/${segment}`
				}
			});
		}
	}

	return resolve(event);
};
