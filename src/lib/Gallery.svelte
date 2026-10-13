<script lang="ts">
	let { srcs }: { srcs: string[] } = $props();
</script>

<div class="gallery">
	{#each srcs as src (src)}
		<!-- width/height reserve the space, so the layout never jumps. Only the pixels are late. -->
		<img {src} alt="" width="1600" height="1200" />
	{/each}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 6px;
		/* The grey you see while an image is still loading. */
		background: #d8d8d8;
	}
</style>
