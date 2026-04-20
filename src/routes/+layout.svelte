<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import HardwareNavButton from '$lib/components/HardwareNavButton.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<nav
		class="sticky top-0 z-50 border-b border-glass-border bg-retro-dark/80 shadow-lg shadow-black/50 backdrop-blur-md backdrop-saturate-150"
	>
		<div
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-4 md:justify-start"
		>
			<div
				class="text-xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] md:mr-8"
			>
				LJL<span class="text-retro-amber drop-shadow-[0_0_5px_rgba(255,157,0,0.5)]">SYS</span>
			</div>

			<div class="flex flex-wrap gap-3">
				<HardwareNavButton href="/" label="Dashboard" />
				<HardwareNavButton href="/experience" label="Experience" />
				<HardwareNavButton href="/projects" label="Projects" activeColor="cyan" />
			</div>
		</div>
	</nav>

	<div class="flex-grow">
		{@render children()}
	</div>
</div>
