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

  const glowClasses = {
    amber: {
      low: 'after:bg-retro-amber/5',
      medium: 'after:bg-retro-amber/10',
      high: 'after:bg-retro-amber/20',
    },
    cyan: {
      low: 'after:bg-retro-cyan/5',
      medium: 'after:bg-retro-cyan/10',
      high: 'after:bg-retro-cyan/20',
    },
    none: {
      low: '',
      medium: '',
      high: '',
    }
  };

</script>

<div class="relative group {className}">
  <!-- Diffused Glow Effect -->
  {#if glowColor !== 'none'}
    <div 
      class="absolute inset-0 -z-10 blur-xl transition-opacity duration-500 ease-in-out opacity-50 group-hover:opacity-100 {glowClasses[glowColor][intensity]}"
      aria-hidden="true"
    ></div>
  {/if}

  <!-- Glass Panel -->
  <div class="
    relative z-0 h-full w-full overflow-hidden
    rounded-lg border border-glass-border bg-glass-base
    backdrop-blur-md backdrop-saturate-150
    shadow-lg
    transition-all duration-300
    hover:bg-glass-highlight
  ">
    <!-- Inner hardware-like inset shadow layer -->
    <div class="absolute inset-0 pointer-events-none rounded-lg shadow-hardware-inset opacity-50"></div>
    
    <!-- Content -->
    <div class="relative z-10 p-6 h-full">
      {@render children()}
    </div>
  </div>
</div>
