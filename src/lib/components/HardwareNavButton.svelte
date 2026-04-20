<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		href: string;
		label: string;
		activeColor?: 'amber' | 'cyan';
	}

	let { href, label, activeColor = 'amber' }: Props = $props();

	let isActive = $derived(
		$page.url.pathname === href || ($page.url.pathname.startsWith(href) && href !== '/')
	);
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	{href}
	class="nav-button"
	class:nav-button--active={isActive}
	class:nav-button--amber={activeColor === 'amber'}
	class:nav-button--cyan={activeColor === 'cyan'}
>
	{#if isActive}
		<div class="nav-button__highlight nav-button__highlight--{activeColor}"></div>
	{/if}
	{label}
</a>

<style lang="postcss">
	@reference '../../routes/theme.css';
	.nav-button {
		@apply relative flex items-center justify-center rounded-sm border border-transparent px-4 py-2 font-mono text-sm tracking-wider uppercase transition-all duration-200 ease-out;

		&:not(.nav-button--active) {
			@apply border-white/5 bg-black/20 text-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-[1px] hover:border-white/20 hover:bg-black/30 hover:text-slate-200;
		}

		&--active {
			@apply translate-y-[1px] bg-black/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)];
		}

		&--active.nav-button--amber {
			@apply border-retro-amber/50 bg-retro-amber/10 text-retro-amber shadow-neon-amber;
		}

		&--active.nav-button--cyan {
			@apply border-retro-cyan/50 bg-retro-cyan/10 text-retro-cyan shadow-neon-cyan;
		}

		&__highlight {
			@apply absolute -top-[1px] right-2 left-2 h-[1px] bg-gradient-to-r from-transparent to-transparent;

			&--amber {
				@apply via-retro-amber/50;
			}

			&--cyan {
				@apply via-retro-cyan/50;
			}
		}
	}
</style>
