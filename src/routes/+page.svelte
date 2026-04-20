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
			<MechanicalTicker label="Uptime" value={data.system.uptime} />
		</div>
	</header>

	<section class="dashboard__content">
		<DiffusedGlassPanel glowColor="amber" intensity="high" class="dashboard__panel">
			<div class="dashboard__panel-inner">
				<div class="dashboard__panel-header">
					<h2 class="dashboard__panel-title">{data.latestProject.title}</h2>
					<div class="dashboard__panel-status"></div>
				</div>

				<div class="dashboard__logs">
					{#each data.latestProject.logs as log, i (i)}
						<p class="dashboard__log">{log}</p>
					{/each}
					<p class="dashboard__log dashboard__log--active">> {data.latestProject.status}</p>
				</div>

				<div class="dashboard__panel-actions">
					<button class="dashboard__button">
						{data.latestProject.actionText}
					</button>
				</div>
			</div>
		</DiffusedGlassPanel>
	</section>
</main>

<style lang="postcss">
	@reference '@ljl-consultancy/style-ref';
	.dashboard {
		@apply mx-auto flex max-w-6xl flex-col gap-12 p-8 md:p-16;

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

		&__panel {
			/* DiffusedGlassPanel passes class down, we can apply specific classes here using :global(.dashboard__panel) if necessary, but Svelte allows class application. DiffusedGlassPanel uses class directly. Wait, if DiffusedGlassPanel component has `class: className`, this class will be applied to the wrapper which is the outer node, so it's fine. Wait, min-h-[300px] needs to be passed. Svelte might isolate it unless we use :global. 
			Actually, the easiest way to make sure the style gets applied to the custom component's wrapper is using :global or making sure the utility classes exist. Wait, let's just make it a local class and :global() it. Svelte 4/5 allows targeting component root nodes sometimes, but :global is safer. */
		}

		/* Target the child element if needed, but in svelte `<DiffusedGlassPanel class="dashboard__panel">` applies the class to the component's root element. However, the styles in this file are scoped. To apply to the component root, we might need :global(.dashboard__panel). Let's do that to be safe. */
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
</style>
