# Svlider

An extremely simple, basic, lightweight image slider component for Svelte.

To demo, `npm run dev` or `npm run dev -- --open`

Note: If you need something fancier, check out [svelte-splide](https://splidejs.com/integration/svelte-splide/)

## Basic / INtended Use

@See /routes/+page.svelte for a demo

````
import { Svlider } from ...

let urls = [url1, url2, ...];   // a list of image or video urls
<Svlider {urls}>
````

You can also create your own images and videos and pass them in, but why bother?  :-)

## API

Svlider exports five arguments.  #1 and #2 are rarely used, prefer #3

 1. `selector`: (string) to select the slides from within the existing component
 2. `slides`  : (array)  to pass in _existing_ &lt;image&gt; or  &lt;video&gt; elements
 3. `urls`    : (array)  urls, from which &lt;image&gt; or  &lt;video&gt; elements will be created
   - **Note:** At least _one_ of 1,2, or 3 _must be set_.
 4. `options` : (object) options
 5. `mixin`   : (object) if you really want to mess around...

## Options

@See /src/lib/svlider.js

 - startIndex: Initial element ("slide") to show, default = 0
 - lazyThreshold: use lazy loading if more slides than this, default = 6
 - slideClasses: CSS classes for an individual slide, default = ['svlide']
 - svliderClasses: CSS classes for the svlider, default = ['svlider'],
 - buttonText: symbols on the buttons, default = { prev: "\u2039", next : "\u00a0\u203a"},
 - videoExtensions: Treat a url as a video if it ends in one of these.  default = [".mp4"]
