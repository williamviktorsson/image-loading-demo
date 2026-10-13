import { imageSrcs } from '#lib/images.ts';
import { preload } from '#lib/preload.ts';

// No HTML is prerendered for this page, only an empty shell.
// Nothing can show up before load has finished, on a refresh too.
export const ssr = false;

export async function load() {
	const images = imageSrcs('ssr-off');

	// No browser check needed: with ssr = false, load only ever runs in the browser.
	await Promise.all(images.map(preload));

	return { images };
}
