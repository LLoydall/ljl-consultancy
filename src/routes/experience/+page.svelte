<script lang="ts">
  import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
  import MechanicalTicker from '$lib/components/MechanicalTicker.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Experience - LJL Consultancy</title>
</svelte:head>

<main class="p-8 md:p-16 max-w-6xl mx-auto flex flex-col gap-12">
  <header class="border-b border-glass-border pb-8">
    <h1 class="text-3xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
      {data.title}
    </h1>
    <p class="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
      Career Timeline & Specs
    </p>
  </header>

  <div class="flex flex-col gap-8">
    {#each data.roles as role}
      <div class="relative pl-8 md:pl-12 border-l border-glass-border">
        <!-- Timeline node dot -->
        <div class="absolute -left-[5px] top-4 w-2.5 h-2.5 rounded-full {role.status === 'ACTIVE' ? 'bg-retro-amber shadow-neon-amber animate-pulse' : 'bg-slate-600'}"></div>
        
        <DiffusedGlassPanel glowColor={role.status === 'ACTIVE' ? 'amber' : 'none'} intensity="low">
          {#snippet children()}
            <div class="flex flex-col md:flex-row gap-6 justify-between items-start">
              
              <div class="flex-grow">
                <div class="flex items-center gap-4 mb-2">
                  <h2 class="text-2xl font-bold text-white tracking-tight">{role.company}</h2>
                  <span class="px-2 py-0.5 bg-black/50 border border-white/10 rounded-sm font-mono text-[0.65rem] text-slate-400 uppercase tracking-widest">
                    {role.status}
                  </span>
                </div>
                
                <h3 class="text-retro-amber font-mono text-sm mb-4">> {role.role}</h3>
                
                <p class="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                  {role.description}
                </p>

                <div class="flex flex-wrap gap-2 mt-auto">
                  {#each role.technologies as tech}
                    <span class="px-3 py-1 bg-black/30 border border-glass-highlight text-slate-300 font-mono text-xs shadow-hardware-inset">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>

              <!-- Timeframe indicator -->
              <div class="shrink-0 pt-2">
                <div class="flex gap-2">
                  {#if role.status === 'ACTIVE'}
                    <MechanicalTicker value="CURRENT" label="Period" />
                  {:else}
                    <MechanicalTicker value={role.period.split(' - ')[0]} label="From" />
                    <span class="text-slate-600 font-bold self-center pt-4">-</span>
                    <MechanicalTicker value={role.period.split(' - ')[1]} label="To" />
                  {/if}
                </div>
              </div>

            </div>
          {/snippet}
        </DiffusedGlassPanel>
      </div>
    {/each}
  </div>
</main>
