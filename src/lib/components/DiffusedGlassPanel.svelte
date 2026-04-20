<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		glowColor?: 'amber' | 'cyan' | 'none';
		intensity?: 'low' | 'medium' | 'high';
		class?: string;
	}

	let {
		children,
		glowColor = 'none',
		intensity = 'medium',
		class: className = ''
	}: Props = $props();
</script>

<div class="glass-panel group {className}">
	<!-- Diffused Glow Effect -->
	{#if glowColor !== 'none'}
		<div
			class="glass-panel__glow glass-panel__glow--{glowColor}-{intensity}"
			aria-hidden="true"
		></div>
	{/if}

	<!-- Glass Panel -->
	<div class="glass-panel__container">
		<!-- Inner hardware-like inset shadow layer -->
		<div class="glass-panel__inset"></div>

		<!-- Content -->
		<div class="glass-panel__content">
			{@render children()}
		</div>
	</div>
</div>

<style lang="postcss">
	@reference '@ljl-consultancy/style-ref';
	.glass-panel {
		@apply relative;

		&__glow {
			@apply absolute inset-0 -z-10 opacity-50 blur-xl transition-opacity duration-500 ease-in-out;

			.glass-panel:hover & {
				@apply opacity-100;
			}

			&--amber-low {
				@apply after:bg-retro-amber/5;
			}
			&--amber-medium {
				@apply after:bg-retro-amber/10;
			}
			&--amber-high {
				@apply after:bg-retro-amber/20;
			}

			&--cyan-low {
				@apply after:bg-retro-cyan/5;
			}
			&--cyan-medium {
				@apply after:bg-retro-cyan/10;
			}
			&--cyan-high {
				@apply after:bg-retro-cyan/20;
			}
		}

		&__container {
			@apply relative z-0 h-full w-full overflow-hidden rounded-lg border border-glass-border bg-glass-base shadow-lg backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:bg-glass-highlight;
		}

		&__inset {
			@apply pointer-events-none absolute inset-0 rounded-lg opacity-50 shadow-hardware-inset;
		}

		&__content {
			@apply relative z-10 h-full p-6;
		}
	}
</style>
