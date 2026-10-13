<svelte:head>
	<title>Image loading variants</title>
</svelte:head>

<h1>Images that are "there" instead of popping in</h1>

<p>
	A SvelteKit site built with <code>adapter-static</code> (like on GitHub Pages) with images in
	<code>static/</code> shows the page first and the images a bit later. Each route in the menu is
	one way to change that. They all show the same six photos.
</p>

<p>
	Browsers have no built-in "wait with rendering until the images are in". So every variant does
	one of two things: it <strong>holds back the page</strong> (or part of it) until the images are
	ready, or it <strong>ships the images inside the page</strong>.
</p>

<h2>How to test</h2>

<p>There are two different situations, and most variants only fix one of them:</p>

<ul>
	<li>
		<strong>First load:</strong> you type the URL or refresh. The browser gets a ready-made
		<code>.html</code> file and paints it as it arrives.
	</li>
	<li>
		<strong>Navigation:</strong> you click a link inside the site. SvelteKit runs the page's
		<code>load</code> function and then swaps the page.
	</li>
</ul>

<ol>
	<li>
		Open DevTools, go to the Network tab and set throttling to "Slow 4G". On your own machine the
		images load too fast to see any difference.
	</li>
	<li>For navigation: click around in the menu.</li>
	<li>For first load: go to a variant and do a hard refresh (Cmd/Ctrl + Shift + R).</li>
</ol>

<h2>The variants</h2>

<table>
	<thead>
		<tr>
			<th>Variant</th>
			<th>First load</th>
			<th>Navigation</th>
			<th>What it costs</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>0. Baseline</td>
			<td>Pop in</td>
			<td>Pop in</td>
			<td>Nothing</td>
		</tr>
		<tr>
			<td>1. Preload in load</td>
			<td>Pop in</td>
			<td>There</td>
			<td>Clicks feel slower</td>
		</tr>
		<tr>
			<td>2. SSR off + preload</td>
			<td>There</td>
			<td>There</td>
			<td>Blank page while waiting, no HTML for search engines</td>
		</tr>
		<tr>
			<td>3. Hide until loaded</td>
			<td>There</td>
			<td>There</td>
			<td>Empty area while waiting, needs JavaScript</td>
		</tr>
		<tr>
			<td>4. window load</td>
			<td>There</td>
			<td>Pop in</td>
			<td>Blank page while waiting, applies to the whole site</td>
		</tr>
		<tr>
			<td>5. Inline (glob)</td>
			<td>There</td>
			<td>There</td>
			<td>Huge pages, images must move to <code>src/</code></td>
		</tr>
		<tr>
			<td>6. Inline (server)</td>
			<td>There</td>
			<td>There</td>
			<td>Even bigger pages</td>
		</tr>
	</tbody>
</table>

<p>
	If you want "nothing shows until everything is there" with the least fuss, combine 4 (first
	load) with 1 (navigation). If only the gallery needs to wait, 3 does both on its own.
</p>

<h2>Not built here, but worth knowing</h2>

<p>These don't make the images wait for the page. They make the wait shorter or nicer to look at:</p>

<ul>
	<li>
		<strong><code>@sveltejs/enhanced-img</code>:</strong> converts to AVIF/WebP and generates
		smaller sizes at build time. Smaller files arrive sooner. Probably the best first step for any
		site with photos.
	</li>
	<li>
		<strong><code>&lt;link rel="preload" as="image"&gt;</code></strong> in
		<code>&lt;svelte:head&gt;</code>, or <code>fetchpriority="high"</code> on the important images:
		the browser starts fetching them earlier.
	</li>
	<li>
		<strong>Blur placeholders:</strong> each image starts as a tiny inlined blurry version and fades
		into the real one. Nothing is hidden and nothing looks broken. This is what most big sites do.
	</li>
	<li>
		<strong>Service worker:</strong> precache the images in <code>src/service-worker.ts</code>.
		Doesn't help the first visit, but every later visit loads them from disk.
	</li>
</ul>

<p>
	Whatever you pick: set <code>width</code> and <code>height</code> on the images (or use CSS
	<code>aspect-ratio</code>) so the layout doesn't jump. See <code>src/lib/Gallery.svelte</code>.
</p>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		text-align: left;
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid #ddd;
	}
</style>
