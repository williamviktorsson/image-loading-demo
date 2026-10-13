<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	let { data } = $props();

	let ready = $state(false);

	// Runs once when the wrapper is in the page. Flips `ready` when every image inside it
	// has either loaded or failed.
	function waitForImages(wrapper: HTMLElement) {
		const imgs = [...wrapper.querySelectorAll('img')];
		let left = imgs.length;

		function done() {
			left--;
			if (left <= 0) ready = true;
		}

		for (const img of imgs) {
			// Images in the prerendered HTML may have finished before this script even started.
			if (img.complete) done();
			else {
				img.addEventListener('load', done, { once: true });
				// Without this, one broken image would keep the gallery hidden forever.
				img.addEventListener('error', done, { once: true });
			}
		}

		if (imgs.length === 0) ready = true;
	}
</script>

<Explain
	title="3. Hide until loaded"
	firstLoad="Yes, the gallery appears all at once"
	navigation="Yes, the gallery appears all at once"
	files={['src/routes/hide-until-loaded/+page.svelte']}
>
	<p>
		The page renders normally, but the gallery has <code>visibility: hidden</code> until every
		image in it has fired <code>load</code> (or <code>error</code>). The rest of the page, like
		this text, is there from the start. The hidden gallery still takes up its space, so nothing
		jumps when it shows.
	</p>
	<p>
		Cost: it depends on JavaScript. If the script fails to load, the gallery stays hidden. And the
		visitor looks at an empty area while waiting, so it is worth combining with a spinner or a
		fade-in.
	</p>
</Explain>

<div style:visibility={ready ? 'visible' : 'hidden'} {@attach waitForImages}>
	<Gallery srcs={data.images} />
</div>
