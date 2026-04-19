<script lang="ts">
  import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Projects - LJL Consultancy</title>
</svelte:head>

<main class="p-8 md:p-16 max-w-6xl mx-auto flex flex-col gap-12">
  <header class="border-b border-glass-border pb-8">
    <h1 class="text-3xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
      Project Database
    </h1>
    <p class="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">
      Engineering Portfolio
    </p>
  </header>

  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.projects as project}
      <DiffusedGlassPanel glowColor={project.glowColor} intensity="medium" class="flex flex-col min-h-[350px]">
        {#snippet children()}
          <div class="flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="font-mono text-xs text-{project.glowColor === 'amber' ? 'retro-amber' : project.glowColor === 'cyan' ? 'retro-cyan' : 'slate-400'} mb-1">
                  > {project.type}
                </p>
                <h2 class="text-xl font-bold text-white leading-tight">{project.title}</h2>
              </div>
              <div class="w-2 h-2 rounded-full {project.status === 'ONLINE' ? 'bg-retro-amber shadow-neon-amber animate-pulse' : 'bg-slate-600'}"></div>
            </div>
            
            <p class="text-slate-300 text-sm mb-8 flex-grow">
              {project.description}
            </p>

            <div class="mt-auto flex flex-col gap-4">
              <div class="flex flex-wrap gap-2">
                {#each project.technologies as tech}
                  <span class="px-2 py-1 bg-black/40 border border-white/5 text-slate-400 font-mono text-[0.65rem] uppercase tracking-wider">
                    {tech}
                  </span>
                {/each}
              </div>
              
              <button class="
                w-full py-2 bg-glass-highlight border border-glass-border text-white text-sm font-mono uppercase tracking-wider
                hover:bg-white/10 transition-colors duration-200
                active:translate-y-[1px]
              ">
                View Log
              </button>
            </div>
          </div>
        {/snippet}
      </DiffusedGlassPanel>
    {/each}
  </section>
</main>
