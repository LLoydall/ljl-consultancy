<script lang="ts">
	import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
	import MechanicalTicker from '$lib/components/MechanicalTicker.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>LJL Consultancy - Portfolio</title>
</svelte:head>

<main class="mx-auto flex max-w-6xl flex-col gap-12 p-8 md:p-16">
	<header
		class="flex flex-col items-start justify-between gap-6 border-b border-glass-border pb-8 md:flex-row md:items-end"
	>
		<div>
			<h1
				class="text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] md:text-6xl"
			>
				LJL <span class="text-retro-amber drop-shadow-[0_0_10px_rgba(255,157,0,0.4)]">Systems</span>
			</h1>
			<p class="mt-2 font-mono text-sm tracking-widest text-slate-400 uppercase">
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
			<div class="flex h-full flex-col justify-between">
				<div class="flex items-start justify-between">
					<h2 class="mb-4 text-2xl font-bold text-white">{data.latestProject.title}</h2>
					<div class="h-3 w-3 animate-pulse rounded-full bg-retro-amber shadow-neon-amber"></div>
				</div>

				<div class="mb-8 space-y-2 font-mono text-sm text-slate-400">
					{#each data.latestProject.logs as log, i (i)}
						<p>{log}</p>
					{/each}
					<p class="text-retro-amber">> {data.latestProject.status}</p>
				</div>

				<div class="mt-auto">
					<button
						class="
              rounded-sm border border-retro-amber/30 bg-black/40 px-6 py-2
              font-mono text-sm tracking-wider text-retro-amber uppercase
              transition-all duration-300 hover:border-retro-amber
              hover:bg-retro-amber/10 hover:shadow-neon-amber
              active:translate-y-[1px]
            "
					>
						{data.latestProject.actionText}
					</button>
				</div>
			</div>
		</DiffusedGlassPanel>
	</section>
</main>
