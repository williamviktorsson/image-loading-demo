<script lang="ts">
	import Explain from '#lib/Explain.svelte';
	import Gallery from '#lib/Gallery.svelte';

	// Vite has to know the files at build time, so you can't import from an array of strings.
	// import.meta.glob imports a whole folder instead. The images must live in src/, not static/.
	// ?inline turns each file into a "data:image/jpeg;base64,..." string.
	const modules = import.meta.glob<string>('/src/lib/assets/gallery/*.jpg', {
		query: '?inline',
		import: 'default',
		eager: true
	});

	// Want your own order, or only some of the files? Look them up by name:
	const names = ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg', 'photo-4.jpg', 'photo-5.jpg', 'photo-6.jpg'];
	const images = names.map((name) => modules[`/src/lib/assets/gallery/${name}`]);
</script>

<Explain
	title="5. Inline as base64 (import.meta.glob)"
	firstLoad="Yes, the images are part of the HTML"
	navigation="Yes, the images are part of the page's JavaScript"
	files={['src/routes/inline-glob/+page.svelte', 'src/lib/assets/gallery/']}
>
	<p>
		The image data is written straight into the page as base64 text, so there are no separate
		image requests at all. When the page is there, the images are there.
	</p>
	<p>
		Cost: size. Base64 is about 33% bigger than the file, and the data ends up in both the
		<code>.html</code> file and the page's JavaScript chunk. These six photos are 1.8 MB as files,
		and here they become a 2.4 MB <code>.html</code> file plus a 2.3 MB JavaScript chunk. Nothing shows until all of it has
		downloaded, and the images aren't cached separately from the page. Great for icons and small
		thumbnails, heavy for photos.
	</p>
</Explain>

<Gallery srcs={images} />
