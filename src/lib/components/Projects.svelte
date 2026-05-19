<script lang="ts">
	const projects = [
		{
			title: 'amablog',
			description:
				'A terminal-inspired personal blog built with SvelteKit, Tailwind CSS, and a whole lot of caffeine. Features rose-pine theming, monospace typography, and a vim-like aesthetic.',
			language: 'Svelte',
			stars: 12,
			url: '#'
		},
		{
			title: 'dotfiles',
			description:
				'My carefully curated Neovim, tmux, and shell configurations. Optimized for speed, minimalism, and the perfect dark mode experience across all tools.',
			language: 'Lua',
			stars: 8,
			url: '#'
		}
	];
</script>

<div class="flex flex-col gap-4">
	{#each projects as project (project.title)}
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group border-border hover:border-primary relative overflow-hidden border p-5 transition-all duration-300"
		>
			<!-- Corner accent -->
			<div
				class="bg-primary absolute top-0 right-0 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
				style="clip-path: polygon(100% 0, 0 0, 100% 100%);"
			></div>

			<div class="flex items-start justify-between">
				<div class="flex-1">
					<div class="mb-2 flex items-center gap-2">
						<svg
							class="text-muted-foreground h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							/>
						</svg>
						<h3
							class="text-foreground group-hover:text-primary text-lg font-semibold transition-colors"
						>
							{project.title}
						</h3>
					</div>

					<p class="text-muted-foreground mb-3 text-sm leading-relaxed">
						{project.description}
					</p>

					<div class="text-muted-foreground flex items-center gap-4 text-xs">
						<span class="flex items-center gap-1.5">
							<span class="bg-primary h-2 w-2 rounded-full"></span>
							{project.language}
						</span>
						<span class="flex items-center gap-1">
							<svg
								class="h-3.5 w-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polygon
									points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
								/>
							</svg>
							{project.stars}
						</span>
					</div>
				</div>
			</div>

			<!-- Arrow indicator -->
			<div
				class="text-muted-foreground absolute right-4 bottom-4 opacity-0 transition-all group-hover:opacity-100"
			>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17l9.2-9.2M17 8v9" />
				</svg>
			</div>
		</a>
	{/each}
</div>
