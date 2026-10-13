<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();
</script>

<Explain
	title="6. Inline as base64 (server load)"
	firstLoad="Yes, the images are part of the HTML"
	navigation="Yes, the images are part of the page's data"
	files={['src/routes/inline-server/+page.server.ts']}
>
	<p>
		Same result as variant 5, but the base64 strings are built in a
		<code>+page.server.ts</code> that reads the files from <code>static/</code>. Handy when you
		want to keep your array of file names and not move the images into <code>src/</code>.
	</p>
	<p>
		On GitHub Pages there is no server, so this only works because the page is prerendered: the
		<code>load</code> runs once during <code>npm run build</code>. The list of images can't change
		after that.
	</p>
	<p>
		Cost: same size problem as variant 5. The data is in the <code>.html</code> file twice (once
		in the <code>&lt;img&gt;</code> tags, once as page data for hydration) and in a
		<code>__data.json</code> that is fetched on navigation. Here that is a 4.9 MB
		<code>.html</code> file and a 2.4 MB <code>__data.json</code>, for 1.8 MB of photos.
	</p>
</Explain>

<Gallery srcs={data.images} />
