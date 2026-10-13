import { browser } from '$app/env';
import { imageSrcs } from '#lib/images.ts';
import { preload } from '#lib/preload.ts';

export async function load() {
	const images = imageSrcs('preload-load');

	// SvelteKit doesn't show the new page until load is done,
	// so waiting here means the images are ready when the page appears.
	// Image() only exists in the browser, hence the check.
	if (browser) await Promise.all(images.map(preload));

	return { images };
}
