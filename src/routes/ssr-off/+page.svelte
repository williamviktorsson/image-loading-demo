<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();
</script>

<Explain
	title="2. SSR off + preload"
	firstLoad="Yes, but the page is blank while waiting"
	navigation="Yes"
	files={['src/routes/ssr-off/+page.ts', 'src/lib/preload.ts']}
>
	<p>
		Same as variant 1, plus <code>export const ssr = false</code>. The built
		<code>.html</code> file for this page is an empty shell, so there is nothing to show until the
		JavaScript has loaded and <code>load</code> has finished preloading.
	</p>
	<p>
		Cost: on a refresh the visitor stares at a white page (the nav too, not just the gallery) until
		everything is in. Search engines and link previews get no content from this page.
	</p>
</Explain>

<Gallery srcs={data.images} />
