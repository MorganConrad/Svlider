

<script>

/* Attempt at Svelte Component */

  import { onMount } from 'svelte';

  import { SvliderJS } from './svlider.js';

  // One (or possibly more) of these should be set
  export let selector = "";
  export let slides = [];
  export let urls = [];

  export let options = {};
  export let mixin = {};

  let svliderEl;

  onMount(() => {

    if (!(slides || selector || urls))
      throw new Error('invalid data: must have slides, selector, or urls');;

    let svliderJS = new SvliderJS(svliderEl, options, mixin);

    if (selector) {
      let sSlides = Array.from(svliderEl.querySelectorAll(selector));
      svliderJS.addSlides(sSlides);
    }

    if (slides.length)  // we have elements as slides
      svliderJS.addSlides(slides);

    if (urls.length)
      svliderJS.addImageURLs(urls);

    svliderJS.addButtons(options.buttons);
  })

</script>


<style>
  @import './svlider.css';
</style>

<figure class="svlider" bind:this={svliderEl}></figure>

