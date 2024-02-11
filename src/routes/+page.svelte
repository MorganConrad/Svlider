<h1>Svlider Demo</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<script>
  import { Svlider } from '$lib';

  let urls = ["https://picsum.photos/id/12/367/267",
              "/aa.jpg",
              "https://v2.cdnpk.net/videvo_files/video/premium/partners1143/small_watermarked/BB_c2160b22-3dfb-4d82-b5fc-909408a05187_preview.mp4",
              "https://picsum.photos/id/18/367/267"];

  // let data = { urls };

</script>


<Svlider {urls}/>


