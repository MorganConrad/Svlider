# Svlider

An extremely simple, basic, lightweight image _and video_ slider component for Svelte.
It doesn't try to do "everything", but you can extend or add mixins to change the behavior.

To demo, `npm run dev` or `npm run dev -- --open`

Note: If you need something fancier, check out [svelte-splide](https://splidejs.com/integration/svelte-splide/) which is far more complete and complex.

## What is Svlider good for?

 1. The primary feature / advantage of Svlider is that you can just pass in a list of urls.  It will build the HTML.
 2. The second feature is that you can mix images and videos, and it willtry to figure things out.
 3. It's tiny.

@See /routes/+page.svelte for a demo.

````
import { Svlider } from ...

let urls = [url1, url2, ...];   // a list of image or video urls (strings)

<div class="containingDiv">  // Optional, but so you can control size here with css
<Svlider class="svlider" {urls}/>
</div>
````

You can also create your own images and videos and pass them in, or use existing HTML then hook them up using a selector.

@See /routes/selector/+page.svelte for a demo of the latter.

## API

Svlider exports five arguments.  #1 and #2 are rarely used, prefer #3

 1. `selector`: (string) to select the slides from within the existing component
 2. `slides`  : (array)  to pass in _existing_ &lt;image&gt; or  &lt;video&gt; elements
 3. `urls`    : (array)  urls, from which &lt;image&gt; or  &lt;video&gt; elements will be created
   - **Note:** At least _one_ of 1,2, or 3 _must be set_.
 4. `options` : (object) options
 5. `mixin`   : (object) if you really want to mess around...

## Options

@See /src/lib/svlider.js.DEFAULTS

 - startIndex: Initial element ("slide") to show, default = 0
 - lazyThreshold: use lazy loading if more slides than this, default = 6
 - slideClasses: CSS classes for an individual slide, default = ['svlide']
 - @deprecated  // svliderClasses: CSS classes for the svlider, default = ['svlider'],
 - buttonSVGs: SVGs for the previous and next buttons.
 - videoExtensions: Treat a url as a video if it ends in one of these.  default = [".mp4"]

## TODOs and Changelog

 - v0.0.2  Buttons changed from text to SVGs.  Cleanup.
