<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();
</script>

<Explain
	title="1. Preload in load"
	firstLoad="No, the HTML is already on screen before load runs"
	navigation="Yes"
	files={['src/routes/preload-load/+page.ts', 'src/lib/preload.ts']}
>
	<p>
		The <code>load</code> function downloads and decodes every image before it returns. When you
		click a link, SvelteKit stays on the old page until <code>load</code> is done, then swaps in the
		new page with the images already there.
	</p>
	<p>
		Bonus: links preload on hover (<code>data-sveltekit-preload-data="hover"</code> in
		<code>app.html</code>), so the download usually starts before you even click.
	</p>
	<p>
		Cost: the click feels slower, since nothing happens until the slowest image is in. And it does
		nothing for a refresh, because the prerendered HTML is shown before any JavaScript runs.
	</p>
</Explain>

<Gallery srcs={data.images} />
