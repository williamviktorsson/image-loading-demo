<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import { countVisit } from '#lib/images.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// DEMO ONLY: see imageSrcs in src/lib/images.ts
	afterNavigate(countVisit);

	const links = [
		{ id: '/', label: 'Overview' },
		{ id: '/baseline', label: '0. Baseline' },
		{ id: '/preload-load', label: '1. Preload in load' },
		{ id: '/ssr-off', label: '2. SSR off' },
		{ id: '/hide-until-loaded', label: '3. Hide until loaded' },
		{ id: '/window-load', label: '4. window load' },
		{ id: '/inline-glob', label: '5. Inline (glob)' },
		{ id: '/inline-server', label: '6. Inline (server)' }
	] as const;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	{#each links as { id, label } (id)}
		<a href={resolve(id)} aria-current={page.route.id === id ? 'page' : undefined}>{label}</a>
	{/each}
</nav>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		line-height: 1.5;
		color: #222;
	}

	:global(code) {
		font-size: 0.9em;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #ddd;
	}

	nav a[aria-current='page'] {
		font-weight: 700;
		text-decoration: none;
		color: inherit;
	}

	main {
		max-width: 60rem;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
