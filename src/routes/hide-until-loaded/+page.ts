import { imageSrcs } from '#lib/images.ts';

export function load() {
	return { images: imageSrcs('hide-until-loaded') };
}
