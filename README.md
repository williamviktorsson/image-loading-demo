# Image loading demo

A small SvelteKit site (`adapter-static`, like on GitHub Pages) that shows different ways to make
images "be there" when the page shows up, instead of popping in afterwards.

Every variant is its own route and shows the same six photos. The start page has a comparison table.

## Run it

```sh
npm install
npm run build
npm run preview
```

Use the built version (`preview`) and not `npm run dev` when comparing. In dev there is no
prerendered HTML, so the "first load" behaviour is not the same as on GitHub Pages.

To build it the way GitHub Pages serves it, under `/<repo>/`:

```sh
BASE_PATH=/my-repo npm run build
```

## See the difference

On your own machine the images load too fast to notice anything.

1. Open DevTools, Network tab, set throttling to "Slow 4G".
2. Navigation: click around in the menu.
3. First load: go to a variant and hard refresh (Cmd/Ctrl + Shift + R).

## Where the code is

| Variant | Look at |
| --- | --- |
| 0. Baseline | `src/routes/baseline/` |
| 1. Preload in load | `src/routes/preload-load/+page.ts`, `src/lib/preload.ts` |
| 2. SSR off + preload | `src/routes/ssr-off/+page.ts` |
| 3. Hide until loaded | `src/routes/hide-until-loaded/+page.svelte` |
| 4. window load | `src/app.html` |
| 5. Inline (glob) | `src/routes/inline-glob/+page.svelte`, images in `src/lib/assets/gallery/` |
| 6. Inline (server) | `src/routes/inline-server/+page.server.ts` |

## Things that are only here for the demo

Marked with `DEMO ONLY` in the code. Don't copy these:

- `imageSrcs()` in `src/lib/images.ts` adds `?v=...` to every image URL so each variant, and each
  visit to it, downloads the photos again. Otherwise everything would be cached after the first
  variant. On a real site: `images.map((file) => asset(file))`.
- The `if` around the script in `src/app.html` limits variant 4 to its own route.

## Things you should copy

- `asset()` from `$app/paths` for anything in `static/`. A hardcoded `/img/a.jpg` breaks on GitHub
  Pages, where the site lives under `/<repo>/`.
- `width` and `height` on the `<img>` tags (`src/lib/Gallery.svelte`), so the layout never jumps.

Photos are from [picsum.photos](https://picsum.photos) (Unsplash license).
