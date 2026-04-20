<script lang="ts">
	import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects - LJL Consultancy</title>
</svelte:head>

<main class="mx-auto flex max-w-6xl flex-col gap-12 p-8 md:p-16">
	<header class="border-b border-glass-border pb-8">
		<h1
			class="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] md:text-5xl"
		>
			Project Database
		</h1>
		<p class="mt-2 font-mono text-sm tracking-widest text-slate-400 uppercase">
			Engineering Portfolio
		</p>
	</header>

	<section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.projects as project, i (i)}
			<DiffusedGlassPanel
				glowColor={project.glowColor as 'amber' | 'cyan' | 'none'}
				intensity="medium"
				class="flex min-h-[350px] flex-col"
			>
				<div class="flex h-full flex-col">
					<div class="mb-6 flex items-start justify-between">
						<div>
							<p
								class="font-mono text-xs text-{project.glowColor === 'amber'
									? 'retro-amber'
									: project.glowColor === 'cyan'
										? 'retro-cyan'
										: 'slate-400'} mb-1"
							>
								> {project.type}
							</p>
							<h2 class="text-xl leading-tight font-bold text-white">{project.title}</h2>
						</div>
						<div
							class="h-2 w-2 rounded-full {project.status === 'ONLINE'
								? 'animate-pulse bg-retro-amber shadow-neon-amber'
								: 'bg-slate-600'}"
						></div>
					</div>

					<p class="mb-8 flex-grow text-sm text-slate-300">
						{project.description}
					</p>

					<div class="mt-auto flex flex-col gap-4">
						<div class="flex flex-wrap gap-2">
							{#each project.technologies as tech, j (j)}
								<span
									class="border border-white/5 bg-black/40 px-2 py-1 font-mono text-[0.65rem] tracking-wider text-slate-400 uppercase"
								>
									{tech}
								</span>
							{/each}
						</div>

						<a
							href="/projects/{project.slug}"
							class="
                block w-full border border-glass-border bg-glass-highlight py-2 text-center font-mono text-sm tracking-wider text-white uppercase
                transition-colors duration-200 hover:bg-white/10
                active:translate-y-[1px]
              "
						>
							View Log
						</a>
					</div>
				</div>
			</DiffusedGlassPanel>
		{/each}
	</section>
</main>
