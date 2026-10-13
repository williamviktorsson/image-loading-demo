import { readFile } from 'node:fs/promises';
import { images } from '#lib/images.ts';

// With adapter-static there is no server when the site is live.
// This runs once, on your machine, during `npm run build` (prerendering),
// and the result is baked into the .html file. The images can stay in static/.
export async function load() {
	const inlined = await Promise.all(
		images.map(async (file) => {
			const buffer = await readFile(`static/${file}`);
			return `data:image/jpeg;base64,${buffer.toString('base64')}`;
		})
	);

	return { images: inlined };
}
