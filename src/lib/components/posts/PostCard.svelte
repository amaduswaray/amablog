<script lang="ts">
	let { img, slug, title, recent, description, date } = $props();
	// const date = new Date();
</script>

{#if recent === true}
	<div
		class="w-full max-w-3xl transform rounded-lg border border-border p-6 transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02] hover:shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"
	>
		<a href={`/blog/posts/${slug}`} class="group block space-y-3">
			<h2 class="text-xl font-semibold transition-colors group-hover:text-primary">
				{title}
			</h2>

			<!-- <p class="text-sm">{date}</p> -->
			<time datetime="time">
				{date}
			</time>

			<hr class="w-12 border-gray-400" />

			<p class="text-base leading-relaxed">{description}</p>
		</a>
	</div>
{:else}
	<div
		class="w-full max-w-3xl overflow-hidden rounded-lg border border-border shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:text-primary hover:shadow-2xl"
	>
		<a href={`/blog/posts/${slug}`} aria-label={`Read more about ${title}`}>
			<img
				src={img}
				alt={`Thumbnail for ${title}`}
				class="w-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
				style="height: 280px;"
			/>
		</a>

		<a href={`/blog/posts/${slug}`} class="group block">
			<div class="px-6 py-6">
				<h2 class="text-2xl font-semibold transition-colors duration-300">
					{title}
				</h2>
				<p class="mt-3 text-sm leading-relaxed transition-colors duration-300">{description}</p>

				<div
					class="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm transition-colors duration-300"
				>
					<div class="flex items-center space-x-3">
						<img
							src="/profile.jpeg"
							alt="Author: Amadu"
							class="h-8 w-8 rounded-full object-cover"
						/>
						<span class="font-semibold">By Amadu Swaray</span>
					</div>
					<div>
						<time datetime="time">
							{date}
						</time>
					</div>
				</div>
			</div>
		</a>
	</div>
{/if}
