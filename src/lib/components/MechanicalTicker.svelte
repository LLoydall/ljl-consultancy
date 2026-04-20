<script lang="ts">
	interface Props {
		value: string | number;
		label?: string;
	}

	let { value, label }: Props = $props();

	// Format to string array for individual characters
	let chars = $derived(String(value).split(''));

	// We'll use CSS to create the tactile hardware feel
</script>

<div class="inline-flex flex-col items-center">
	{#if label}
		<span
			class="mb-1 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-retro-amber/70 uppercase"
		>
			{label}
		</span>
	{/if}

	<div class="flex gap-1 rounded-md border border-black/80 bg-retro-dark p-1 shadow-hardware-inset">
		{#each chars as char, i (i)}
			<div
				class="
        relative flex h-12 w-8 items-center
        justify-center overflow-hidden rounded-sm
        border-t
        border-b border-black border-glass-highlight bg-retro-panel
        shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]
      "
			>
				<!-- Mechanical center line split -->
				<div
					class="absolute top-1/2 right-0 left-0 z-10 h-[1px] bg-black/80 shadow-[0_1px_0_rgba(255,255,255,0.1)]"
				></div>

				<span class="z-0 font-mono text-xl font-bold tracking-tighter text-gray-200">
					{char}
				</span>
			</div>
		{/each}
	</div>
</div>
