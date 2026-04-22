<script lang="ts">
	import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
	import MechanicalTicker from '$lib/components/MechanicalTicker.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>LJL Consultancy - Portfolio</title>
</svelte:head>

<main class="dashboard">
	<header class="dashboard__header">
		<div class="dashboard__title-wrapper">
			<h1 class="dashboard__title">
				LJL <span class="dashboard__title-accent">Systems</span>
			</h1>
			<p class="dashboard__subtitle">Consultancy & Engineering</p>
		</div>

		<div class="dashboard__tickers">
			<MechanicalTicker label="Status" value={data.system.status} />
		</div>
	</header>

	<section id="experience" class="experience-section">
		<header class="experience-header">
			<h3 class="experience-title">
				{data.experience.title}
			</h3>
			<p class="experience-subtitle">
				Career Timeline & Specs
			</p>
		</header>

		<div class="experience-timeline">
			{#each data.experience.roles as role, i (i)}
				<div class="experience-node">
					<!-- Timeline node dot -->
					<div
						class="experience-dot {role.status === 'ACTIVE'
							? 'experience-dot--active'
							: 'experience-dot--inactive'}"
					></div>

					<DiffusedGlassPanel glowColor={role.status === 'ACTIVE' ? 'amber' : 'none'} intensity="low">
						<div class="experience-card">
							<div class="experience-content">
								<div class="experience-company-header">
									<h3 class="experience-company">{role.company}</h3>
									<span class="experience-status-badge">
										{role.status}
									</span>
								</div>

								<h4 class="experience-role">> {role.role}</h4>

								<p class="experience-description">
									{role.description}
								</p>

								<div class="experience-tech-stack">
									{#each role.technologies as tech, i (i)}
										<span class="experience-tech-badge">
											{tech}
										</span>
									{/each}
								</div>
							</div>

							<!-- Timeframe indicator -->
							<div class="experience-timeframe">
								<div class="experience-time-tickers">
									{#if role.status === 'ACTIVE'}
										<MechanicalTicker value="CURRENT" label="Period" />
									{:else}
										<MechanicalTicker value={role.period.split(' - ')[0]} label="From" />
										<span class="experience-time-separator">-</span>
										<MechanicalTicker value={role.period.split(' - ')[1] || 'PRESENT'} label="To" />
									{/if}
								</div>
							</div>
						</div>
					</DiffusedGlassPanel>
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="postcss">
	@reference '@ljl-consultancy/style-ref';
	
	.dashboard {
		@apply mx-auto flex max-w-6xl flex-col p-8 md:p-16;

		&__header {
			@apply flex flex-col items-start justify-between gap-6 border-b border-glass-border pb-8 md:flex-row md:items-end;
		}

		&__title {
			@apply text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] md:text-6xl;
		}

		&__title-accent {
			@apply text-retro-amber drop-shadow-[0_0_10px_rgba(255,157,0,0.4)];
		}

		&__subtitle {
			@apply mt-2 font-mono text-sm tracking-widest text-slate-400 uppercase;
		}

		&__tickers {
			@apply flex gap-4;
		}

		&__content {
			@apply flex flex-col gap-8;
		}

		:global(.dashboard__panel) {
			@apply min-h-[300px];
		}

		&__panel-inner {
			@apply flex h-full flex-col justify-between;
		}

		&__panel-header {
			@apply flex items-start justify-between;
		}

		&__panel-title {
			@apply mb-4 text-2xl font-bold text-white;
		}

		&__panel-status {
			@apply h-3 w-3 animate-pulse rounded-full bg-retro-amber shadow-neon-amber;
		}

		&__logs {
			@apply mb-8 space-y-2 font-mono text-sm text-slate-400;
		}

		&__log {
			&--active {
				@apply text-retro-amber;
			}
		}

		&__panel-actions {
			@apply mt-auto;
		}

		&__button {
			@apply rounded-sm border border-retro-amber/30 bg-black/40 px-6 py-2 font-mono text-sm tracking-wider text-retro-amber uppercase transition-all duration-300 hover:border-retro-amber hover:bg-retro-amber/10 hover:shadow-neon-amber active:translate-y-[1px];
		}
	}

	.experience-section {
		@apply flex flex-col gap-12 pt-8;
	}

	.experience-header {
	}

	.experience-title {
		@apply text-xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] md:text-3xl;
	}

	.experience-subtitle {
		@apply mt-2 font-mono text-sm tracking-widest text-slate-400 uppercase;
	}

	.experience-timeline {
		@apply flex flex-col gap-8;
	}

	.experience-node {
		@apply relative border-l border-glass-border pl-8 md:pl-12;
	}

	.experience-dot {
		@apply absolute top-4 -left-[5px] h-2.5 w-2.5 rounded-full;

		&--active {
			@apply animate-pulse bg-retro-amber shadow-neon-amber;
		}

		&--inactive {
			@apply bg-slate-600;
		}
	}

	.experience-card {
		@apply flex flex-col items-start justify-between gap-6 md:flex-row;
	}

	.experience-content {
		@apply flex-grow;
	}

	.experience-company-header {
		@apply mb-2 flex items-center gap-4;
	}

	.experience-company {
		@apply text-2xl font-bold tracking-tight text-white;
	}

	.experience-status-badge {
		@apply rounded-sm border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[0.65rem] tracking-widest text-slate-400 uppercase;
	}

	.experience-role {
		@apply mb-4 font-mono text-sm text-retro-amber;
	}

	.experience-description {
		@apply mb-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base;
	}

	.experience-tech-stack {
		@apply mt-auto flex flex-wrap gap-2;
	}

	.experience-tech-badge {
		@apply border border-glass-highlight bg-black/30 px-3 py-1 font-mono text-xs text-slate-300 shadow-hardware-inset;
	}

	.experience-timeframe {
		@apply shrink-0 pt-2;
	}

	.experience-time-tickers {
		@apply flex gap-2;
	}

	.experience-time-separator {
		@apply self-center pt-4 font-bold text-slate-600;
	}
</style>
