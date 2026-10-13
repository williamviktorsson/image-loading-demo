<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();
</script>

<Explain
	title="4. Hide the page until window load"
	firstLoad="Yes, the whole page appears at once"
	navigation="No, images pop in"
	files={['src/app.html']}
>
	<p>
		Nothing special in this route. The trick is two lines in <code>src/app.html</code>: the
		<code>&lt;body&gt;</code> starts hidden and is shown on the window's <code>load</code> event,
		which the browser fires only after every image on the page has finished.
	</p>
	<p>
		Refresh this page to see it work. Then go to another page and click back here: the images pop
		in, because <code>app.html</code> is only loaded once and <code>load</code> never fires again.
		So pair it with variant 1 to cover navigation.
	</p>
	<p>
		Cost: a blank page until the slowest image is in, on every page of the site. Images with
		<code>loading="lazy"</code> don't hold back the <code>load</code> event, so don't mix the two.
	</p>
	<p>
		<strong>Demo note:</strong> here the script only runs when the URL ends in
		<code>/window-load</code>, so it doesn't mess with the other variants. On a real site you
		remove that <code>if</code>.
	</p>
</Explain>

<Gallery srcs={data.images} />
