<script lang="ts">
	import DiffusedGlassPanel from '$lib/components/DiffusedGlassPanel.svelte';
	import { marked } from 'marked';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.project);
	let htmlContent = $derived(marked(project.content || ''));
</script>

<svelte:head>
	<title>{project.title} - Project Log</title>
</svelte:head>

<main class="mx-auto flex max-w-6xl flex-col gap-12 p-4 md:p-8 lg:p-16">
	<!-- Terminal Header Section -->
	<header class="border-b-2 border-retro-cyan pb-8">
		<div class="mb-4 flex items-center justify-between">
			<h1
				class="drop-shadow-neon-cyan font-mono text-4xl font-bold tracking-tighter text-retro-cyan uppercase md:text-6xl"
			>
				{project.title.replace(/ /g, '_')}
			</h1>
			<div class="flex items-center gap-3">
				<span class="animate-pulse font-mono text-sm text-retro-amber">SYS.{project.status}</span>
				<div class="h-3 w-3 animate-pulse rounded-sm bg-retro-amber shadow-neon-amber"></div>
			</div>
		</div>
		<div class="font-mono text-sm tracking-widest text-slate-400 uppercase">
			<p>> CLASSIFICATION: {project.type}</p>
			<p>> STATUS: {project.status}</p>
		</div>
	</header>

	<div class="grid grid-cols-1 gap-8">
		<DiffusedGlassPanel glowColor={project.glow_color || 'cyan'} intensity="high" class="h-full">
			<div class="markdown-content space-y-4 font-mono text-sm text-slate-300">
				{@html htmlContent}
			</div>
		</DiffusedGlassPanel>
	</div>
</main>

<style lang="postcss">
	@reference "../../layout.css";
	:global(.markdown-content h1) {
		@apply mt-8 mb-4 border-b border-white/10 pb-2 font-mono text-2xl font-bold tracking-wider text-retro-cyan uppercase;
	}
	:global(.markdown-content h1:first-child) {
		@apply mt-0;
	}
	:global(.markdown-content h2) {
		@apply mt-8 mb-4 flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xl font-bold tracking-wider text-white uppercase;
	}
	:global(.markdown-content p) {
		@apply mb-4 leading-relaxed;
	}
	:global(.markdown-content ul) {
		@apply mt-4 mb-6 list-inside list-disc space-y-4 pl-4;
	}
	:global(.markdown-content li) {
		@apply leading-relaxed;
	}
	:global(.markdown-content strong) {
		@apply font-bold text-white;
	}
	:global(.markdown-content code) {
		@apply mb-2 block font-bold tracking-wide text-retro-amber;
	}
	:global(.markdown-content hr) {
		@apply my-8 border-white/10;
	}
</style>
