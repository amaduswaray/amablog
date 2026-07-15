import type { PageServerLoad } from './$types';
import type { Post, Project } from '$lib/types';

const featuredRepos = [
	'amaduswaray/shellql',
	'amaduswaray/nvim',
	'amaduswaray/tmux-zen'
] as const;

const fallbackProjects: Project[] = [
	{
		title: 'shellql',
		description: 'Query your shell history with SQL.',
		language: 'Rust',
		stars: 0,
		url: 'https://github.com/amaduswaray/shellql'
	},
	{
		title: 'nvim',
		description: 'My Neovim configuration.',
		language: 'Lua',
		stars: 0,
		url: 'https://github.com/amaduswaray/nvim'
	},
	{
		title: 'tmux-zen',
		description: 'A tmux setup for focused, distraction-free terminal sessions.',
		language: 'Shell',
		stars: 0,
		url: 'https://github.com/amaduswaray/tmux-zen'
	}
];

type GitHubRepo = {
	name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	html_url: string;
};

const getFeaturedProjects = async (fetch: typeof globalThis.fetch): Promise<Project[]> => {
	return Promise.all(
		featuredRepos.map(async (repo, index) => {
			const fallback = fallbackProjects[index];

			try {
				const response = await fetch(`https://api.github.com/repos/${repo}`, {
					headers: {
						Accept: 'application/vnd.github+json'
					}
				});

				if (!response.ok) return fallback;

				const githubRepo = (await response.json()) as GitHubRepo;

				return {
					title: githubRepo.name,
					description: githubRepo.description ?? fallback.description,
					language: githubRepo.language ?? fallback.language,
					stars: githubRepo.stargazers_count,
					url: githubRepo.html_url
				};
			} catch {
				return fallback;
			}
		})
	);
};

export const load: PageServerLoad = async ({ fetch }) => {
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

	posts = posts.slice(0, 4);

	return {
		posts,
		projects: await getFeaturedProjects(fetch)
	};
};
