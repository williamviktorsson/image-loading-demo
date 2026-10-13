<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();
</script>

<Explain
	title="0. Baseline"
	firstLoad="No, images pop in"
	navigation="No, images pop in"
	files={['src/routes/baseline/+page.ts', 'src/lib/Gallery.svelte']}
>
	<p>
		This is what the site does today. The images sit in <code>static/</code> and plain
		<code>&lt;img src&gt;</code> tags point at them. The page shows up right away and each image
		appears whenever it has finished downloading.
	</p>
</Explain>

<Gallery srcs={data.images} />
