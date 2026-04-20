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

	const colorVariants = {
		amber: {
			text: 'text-retro-amber',
			border: 'border-retro-amber/50',
			glow: 'shadow-neon-amber',
			bgActive: 'bg-retro-amber/10'
		},
		cyan: {
			text: 'text-retro-cyan',
			border: 'border-retro-cyan/50',
			glow: 'shadow-neon-cyan',
			bgActive: 'bg-retro-cyan/10'
		}
	};
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	{href}
	class="
    relative flex items-center justify-center rounded-sm border
    border-transparent px-4 py-2 font-mono
    text-sm tracking-wider uppercase
    transition-all duration-200 ease-out
    {isActive
		? `
      ${colorVariants[activeColor].text} 
      ${colorVariants[activeColor].border} 
      ${colorVariants[activeColor].glow}
      ${colorVariants[activeColor].bgActive}
      translate-y-[1px]
      bg-black/40
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
    `
		: 'border-white/5 bg-black/20 text-slate-400 shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-[1px] hover:border-white/20 hover:bg-black/30 hover:text-slate-200'}
  "
>
	{#if isActive}
		<div
			class="absolute -top-[1px] right-2 left-2 h-[1px] bg-gradient-to-r from-transparent via-{activeColor ===
			'amber'
				? 'retro-amber'
				: 'retro-cyan'}/50 to-transparent"
		></div>
	{/if}
	{label}
</a>
