<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import HardwareNavButton from '$lib/components/HardwareNavButton.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="layout">
	<nav class="layout__nav">
		<div class="layout__nav-container">
			<div class="layout__logo">
				LJL<span class="layout__logo-accent">SYS</span>
			</div>

			<div class="layout__nav-items">
				<HardwareNavButton href="/" label="Experience" />
				<HardwareNavButton href="/projects" label="Projects" activeColor="cyan" />
			</div>
		</div>
	</nav>

	<div class="layout__main">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	@reference '@ljl-consultancy/style-ref';
	.layout {
		@apply flex min-h-screen flex-col;

		&__nav {
			@apply sticky top-0 z-50 border-b border-glass-border bg-retro-dark/80 shadow-lg shadow-black/50 backdrop-blur-md backdrop-saturate-150;
		}

		&__nav-container {
			@apply mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-4 md:justify-start;
		}

		&__logo {
			@apply text-xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] md:mr-8;
		}

		&__logo-accent {
			@apply text-retro-amber drop-shadow-[0_0_5px_rgba(255,157,0,0.5)];
		}

		&__nav-items {
			@apply flex flex-wrap gap-3;
		}

		&__main {
			@apply flex-grow;
		}
	}
</style>
