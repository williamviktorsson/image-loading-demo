/** Downloads and decodes an image. Resolves when it's ready to be painted. */
export function preload(src: string) {
	const img = new Image();
	img.src = src;
	// A broken image shouldn't block the page forever, so swallow the error.
	return img.decode().catch(() => {});
}
