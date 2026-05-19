<script lang="ts">
	let { slug, title, description, date } = $props();
	// const date = new Date();
</script>

<div
	class="border-border w-full max-w-3xl transform rounded-sm border p-6 transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02] hover:shadow-[4px_4px_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_20px_rgba(0,0,0,0.3)]"
>
	<a href={`/posts/${slug}`} class="group block space-y-3">
		<h2 class="group-hover:text-primary text-xl font-semibold transition-colors">
			{title}
		</h2>

		<time datetime="time" class="text-muted-foreground text-sm">
			{date}
		</time>

		<hr class="border-border w-12" />

		<p class="text-foreground/80 text-base leading-relaxed">{description}</p>
	</a>
</div>
