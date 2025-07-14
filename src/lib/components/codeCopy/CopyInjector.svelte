<script lang="ts">
	import { onMount, mount } from 'svelte';
	import CopyButton from './CopyButton.svelte';
	let { children } = $props();

	onMount(() => {
		const preTags: HTMLCollectionOf<HTMLPreElement> = document.getElementsByTagName('pre');

		for (let preTag of preTags) {
			const classList = Array.from(preTag.classList);

			const isCodeBlock = classList.some((className) => className.startsWith('language-'));

			if (isCodeBlock) {
				const preTagParent = preTag.parentNode;

				const newCodeBlockWrapper = document.createElement('div');
				newCodeBlockWrapper.className = 'relative';

				// maybe add const =
				mount(CopyButton, { target: newCodeBlockWrapper });

				if (preTagParent) {
					preTagParent.replaceChild(newCodeBlockWrapper, preTag);
					newCodeBlockWrapper.appendChild(preTag);
				}
			}
		}
	});
</script>

{@render children()}
