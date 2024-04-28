<h1>Svlider Demo</h1>

<script>
  import { Svlider } from '$lib';

  let urls = ["https://picsum.photos/id/12/367/267",
              {url: "/aa.jpg", title:"My Boat"},
              {url: "https://v2.cdnpk.net/videvo_files/video/premium/partners1143/small_watermarked/BB_c2160b22-3dfb-4d82-b5fc-909408a05187_preview.mp4",
              title: "Car in Snow"},
              "https://picsum.photos/id/18/367/267"];

  // let data = { urls };

</script>

<style>
  .containingDiv {
    height: 450px;
    width: 600px;
  }
</style>

<div class="containingDiv">
<Svlider class="svlider" {urls}/>
</div>


