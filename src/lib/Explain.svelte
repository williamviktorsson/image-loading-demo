<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		/** Are the images there on a hard refresh / typed URL? */
		firstLoad: string;
		/** Are the images there when you click a link inside the site? */
		navigation: string;
		files: string[];
		children: Snippet;
	};

	let { title, firstLoad, navigation, files, children }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section>
	<h1>{title}</h1>
	{@render children()}
	<dl>
		<dt>First load (refresh)</dt>
		<dd>{firstLoad}</dd>
		<dt>Navigation (click a link)</dt>
		<dd>{navigation}</dd>
		<dt>Code to look at</dt>
		<dd>
			{#each files as file (file)}
				<code>{file}</code>
			{/each}
		</dd>
	</dl>
</section>

<style>
	section {
		margin-bottom: 1.5rem;
	}

	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 0.25rem 1rem;
		padding: 0.75rem 1rem;
		background: #f3f3f3;
		border-radius: 6px;
	}

	dt {
		font-weight: 600;
	}

	dd {
		margin: 0;
	}

	code {
		display: block;
	}
</style>
