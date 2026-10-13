import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter(),

			paths: {
				// On GitHub Pages the site lives at https://<user>.github.io/<repo>/,
				// so build with BASE_PATH=/<repo>. Locally it's just empty.
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`
			}
		})
	]
});
