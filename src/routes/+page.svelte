<script lang="ts">
  import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
  import MechanicalTicker from '$lib/components/MechanicalTicker.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>LJL Consultancy - Portfolio</title>
</svelte:head>

<main class="p-8 md:p-16 max-w-6xl mx-auto flex flex-col gap-12">
  
  <header class="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-glass-border pb-8 gap-6">
    <div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        LJL <span class="text-retro-amber drop-shadow-[0_0_10px_rgba(255,157,0,0.4)]">Systems</span>
      </h1>
      <p class="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
        Consultancy & Engineering
      </p>
    </div>
    
    <div class="flex gap-4">
      <MechanicalTicker label="Status" value={data.system.status} />
      <MechanicalTicker label="Uptime" value={data.system.uptime} />
    </div>
  </header>

  <section class="flex flex-col gap-8">
    
    <DiffusedGlassPanel glowColor="amber" intensity="high" class="min-h-[300px]">
      {#snippet children()}
        <div class="flex flex-col h-full justify-between">
          <div class="flex justify-between items-start">
            <h2 class="text-2xl font-bold text-white mb-4">{data.latestProject.title}</h2>
            <div class="w-3 h-3 rounded-full bg-retro-amber shadow-neon-amber animate-pulse"></div>
          </div>
          
          <div class="font-mono text-sm text-slate-400 space-y-2 mb-8">
            {#each data.latestProject.logs as log}
              <p>{log}</p>
            {/each}
            <p class="text-retro-amber">> {data.latestProject.status}</p>
          </div>
          
          <div class="mt-auto">
            <button class="
              px-6 py-2 bg-black/40 border border-retro-amber/30 text-retro-amber
              font-mono text-sm uppercase tracking-wider rounded-sm
              hover:bg-retro-amber/10 hover:border-retro-amber hover:shadow-neon-amber
              transition-all duration-300
              active:translate-y-[1px]
            ">
              {data.latestProject.actionText}
            </button>
          </div>
        </div>
      {/snippet}
    </DiffusedGlassPanel>
    
  </section>

</main>
