import { asset } from '$app/paths';

// The files in static/img. This is the "array of image srcs" from the real site.
export const images = [
	'img/photo-1.jpg',
	'img/photo-2.jpg',
	'img/photo-3.jpg',
	'img/photo-4.jpg',
	'img/photo-5.jpg',
	'img/photo-6.jpg'
] as const;

// DEMO ONLY: counts client-side navigations, see imageSrcs below.
let visit = 0;
export function countVisit() {
	visit++;
}

/**
 * The image URLs for one variant.
 *
 * asset() adds the base path, which you need on GitHub Pages
 * (the site lives under /<repo>/, so a hardcoded "/img/a.jpg" would 404).
 *
 * DEMO ONLY: the ?v=... part gives every variant, and every visit to it, its own URLs.
 * Without it the browser would cache the photos after the first variant you look at
 * and all the others would look instant. On a real site you return asset(file) and that's it.
 */
export function imageSrcs(variant: string) {
	const key = visit === 0 ? variant : `${variant}-${visit}`;
	return images.map((file) => `${asset(file)}?v=${key}`);
}
