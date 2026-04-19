<script lang="ts">
  import { onMount } from 'svelte';

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
    <span class="text-[0.65rem] uppercase tracking-[0.2em] text-retro-amber/70 mb-1 font-mono font-bold">
      {label}
    </span>
  {/if}
  
  <div class="flex gap-1 bg-retro-dark p-1 rounded-md border border-black/80 shadow-hardware-inset">
    {#each chars as char, i (i)}
      <div class="
        relative w-8 h-12 bg-retro-panel rounded-sm 
        flex items-center justify-center
        overflow-hidden
        border-t border-glass-highlight border-b border-black
        shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]
      ">
        <!-- Mechanical center line split -->
        <div class="absolute top-1/2 left-0 right-0 h-[1px] bg-black/80 shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10"></div>
        
        <span class="font-mono text-xl font-bold text-gray-200 z-0 tracking-tighter">
          {char}
        </span>
      </div>
    {/each}
  </div>
</div>
