import { imageSrcs } from '#lib/images.ts';

export function load() {
	return { images: imageSrcs('window-load') };
}
