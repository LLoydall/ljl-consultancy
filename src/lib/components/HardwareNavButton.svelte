<script lang="ts">
  import { page } from '$app/stores';
  
  interface Props {
    href: string;
    label: string;
    activeColor?: 'amber' | 'cyan';
  }

  let { href, label, activeColor = 'amber' }: Props = $props();

  let isActive = $derived($page.url.pathname === href || ($page.url.pathname.startsWith(href) && href !== '/'));

  const colorVariants = {
    amber: {
      text: 'text-retro-amber',
      border: 'border-retro-amber/50',
      glow: 'shadow-neon-amber',
      bgActive: 'bg-retro-amber/10',
    },
    cyan: {
      text: 'text-retro-cyan',
      border: 'border-retro-cyan/50',
      glow: 'shadow-neon-cyan',
      bgActive: 'bg-retro-cyan/10',
    }
  };
</script>

<a 
  {href}
  class="
    relative px-4 py-2 flex items-center justify-center
    font-mono text-sm tracking-wider uppercase
    transition-all duration-200 ease-out
    border border-transparent rounded-sm
    {isActive ? `
      ${colorVariants[activeColor].text} 
      ${colorVariants[activeColor].border} 
      ${colorVariants[activeColor].glow}
      ${colorVariants[activeColor].bgActive}
      bg-black/40
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]
      translate-y-[1px]
    ` : 'text-slate-400 hover:text-slate-200 bg-black/20 border-white/5 hover:border-white/20 hover:bg-black/30 shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-[1px]'}
  "
>
  {#if isActive}
    <div class="absolute -top-[1px] left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-{activeColor === 'amber' ? 'retro-amber' : 'retro-cyan'}/50 to-transparent"></div>
  {/if}
  {label}
</a>
