<h1>Svlider Demo using selector</h1>


<script>
  import { Svlider } from '$lib';

  let urls = ["https://picsum.photos/id/12/367/267",
              "/aa.jpg",
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

<Svlider selector={"img"}>
  {#each urls as url}
  <img src={url} />
  {/each}
</Svlider>

</div>
