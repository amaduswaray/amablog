<script lang="ts">
	import { CheckIcon, CopyIcon } from '@lucide/svelte';
	let copyButton: HTMLButtonElement;
	let showCheckmark = false;

	function handleClick() {
		const preTagSibling = copyButton.nextElementSibling as HTMLPreElement;

		navigator.clipboard.writeText(preTagSibling.innerText);

		showCheckmark = true;

		setTimeout(() => (showCheckmark = false), 1000);
	}
</script>

<button
	bind:this={copyButton}
	on:click={handleClick}
	class={`absolute top-2 right-2 cursor-pointer rounded-md bg-inherit p-1
  ${showCheckmark ? 'text-green-500' : 'hover:text-primary text-white'}`}
>
	{#if showCheckmark}
		<CheckIcon class="h-6 w-6" />
	{:else}
		<CopyIcon class="h-6 w-6" />
	{/if}
</button>
