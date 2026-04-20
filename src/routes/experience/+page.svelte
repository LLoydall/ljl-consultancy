<script lang="ts">
	import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
	import MechanicalTicker from '$lib/components/MechanicalTicker.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Experience - LJL Consultancy</title>
</svelte:head>

<main class="mx-auto flex max-w-6xl flex-col gap-12 p-8 md:p-16">
	<header class="border-b border-glass-border pb-8">
		<h1
			class="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] md:text-5xl"
		>
			{data.title}
		</h1>
		<p class="mt-2 font-mono text-sm tracking-widest text-slate-400 uppercase">
			Career Timeline & Specs
		</p>
	</header>

	<div class="flex flex-col gap-8">
		{#each data.roles as role, i (i)}
			<div class="relative border-l border-glass-border pl-8 md:pl-12">
				<!-- Timeline node dot -->
				<div
					class="absolute top-4 -left-[5px] h-2.5 w-2.5 rounded-full {role.status === 'ACTIVE'
						? 'animate-pulse bg-retro-amber shadow-neon-amber'
						: 'bg-slate-600'}"
				></div>

				<DiffusedGlassPanel glowColor={role.status === 'ACTIVE' ? 'amber' : 'none'} intensity="low">
					<div class="flex flex-col items-start justify-between gap-6 md:flex-row">
						<div class="flex-grow">
							<div class="mb-2 flex items-center gap-4">
								<h2 class="text-2xl font-bold tracking-tight text-white">{role.company}</h2>
								<span
									class="rounded-sm border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[0.65rem] tracking-widest text-slate-400 uppercase"
								>
									{role.status}
								</span>
							</div>

							<h3 class="mb-4 font-mono text-sm text-retro-amber">> {role.role}</h3>

							<p class="mb-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
								{role.description}
							</p>

							<div class="mt-auto flex flex-wrap gap-2">
								{#each role.technologies as tech, i (i)}
									<span
										class="border border-glass-highlight bg-black/30 px-3 py-1 font-mono text-xs text-slate-300 shadow-hardware-inset"
									>
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
									<span class="self-center pt-4 font-bold text-slate-600">-</span>
									<MechanicalTicker value={role.period.split(' - ')[1]} label="To" />
								{/if}
							</div>
						</div>
					</div>
				</DiffusedGlassPanel>
			</div>
		{/each}
	</div>
</main>
