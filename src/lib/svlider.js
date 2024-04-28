const DEFAULTS = {
  startIndex: 0,
  lazyThreshold: 6,
  slideClasses: ['svlide'],
  buttonSVGs: { prev: "./prev-arrow100.svg", next: "./next-arrow100.svg"},
  videoExtensions: [".mp4"]
};


export class SvliderJS {

  constructor(elOrSelector, options = {}, mixins = {}) {
    this.opts = Object.assign({}, DEFAULTS, options);
    this.el = findElement(elOrSelector);

    this.items = [];
    this.index = this.opts.startIndex;

    this.el._svlider = this;

    Object.entries(mixins).forEach(([k, fn]) => this.k = fn.bind(this));
  }

  /**
   * Adds HTML elements
   * @param {Array<{HTMLElement}>} slides  to be added
   * @param {Array<{string}>} [classlist]  add these classes to the slides
   * @returns this
   */
  addSlides(slides, classlist = this.opts.slideClasses) {
    slides.forEach((slide) => {
      slide.classList.add(...classlist);
      this.el.appendChild(slide);
    });

    this.items.push(...slides);
    this.updateButtonVisibility();
    this.step(0, true); // update slide visibility
    return this;
  }


  /**
   * Adds URLs
   * @param {Array<{string}>} urls  to be added
   * @returns this
   */
  addImageURLs(urls) {
    let slides = urls.map((url, idx) =>
      this.createSlide(url, idx > this.opts.lazyThreshold)
    );
    this.addSlides(slides, []);  // classList was already added
    return this;
  }

  /**
   * Add previous and next buttons.
   * User can provide custom buttons, otherwise, uses thie.newButton()
   * @param {HTMLElement} [customNext]
   * @param {HTMLElement} [customPrev]
   * @returns this
   */
  addButtons(customNext, customPrev) {

    let next = customNext || this.newButton(this.opts.buttonSVGs.next, "next");
    let prev = customPrev || this.newButton(this.opts.buttonSVGs.prev, "prev");

    let stepfn = this.step.bind(this);
    next.addEventListener('click', () => stepfn(+1));
    prev.addEventListener('click', () => stepfn(-1));

    this.el.appendChild(next);
    this.el.appendChild(prev);

    this.next = next;
    this.prev = prev;

    this.updateButtonVisibility();

    return this;
  }


  /**
   * Move to this slide.  Uses modulo to constrain range.
   * Refresh only if index changes or forceRefresh
   * @param {integer} newIndex
   * @param {boolean} [forceRefresh]
   */
  setIndex(newIndex, forceRefresh) {
    let count = this.items.length;
    newIndex = ((newIndex + count) % count) || 0;

    if (forceRefresh || (newIndex !== this.index)) {
      this.items.forEach((item, idx) => {
        setVisibility(item, (idx === newIndex));
      })
    }

    this.index = newIndex;
  }


  /**
   * Change Index.  Usually number = +1 or -1
   * @param {number} delta
   * @param {boolean} [forceRefresh]
   */
  step(delta, forceRefresh) {
    this.setIndex(this.index + delta, forceRefresh);
  }


  /**
   * Create an image or video from a url
   * @param {string} url
   * @param {boolean} lazy
   * @returns {(HTMLImageElement|HTMLVideoElement)}
   */
  createSlide(url, lazy) {
    let videoExt = url.videoExt
    let title = url.title;
    url = url.url || url;
    videoExt = videoExt || this.opts.videoExtensions.find((x) => url.endsWith(x));

    if (videoExt)
      return this.createVideo(url, title, videoExt.substring(1), lazy);
    else
      return this.createImage(url, title, lazy);
  }


  /*
    The following are internal implementations
    Use as "public" mathods at your own risk
    Feel free to override with a subclass or mixins
  */

  /**
   * Create an Image (<img>) from a url
   * @param {string} url
   * @param {string} [title]
   * @param {boolean} [lazy]
   * @param {boolean} [dontPrepare]
   * @returns {Image}
   */
  createImage(url, title, lazy, dontPrepare = false) {
    let image = new Image();
    if (!dontPrepare)
      this.prepareSlide(image, title, lazy);
    image.src = url;
    return image;
  }

  // never worked, TODO
  createFigure(url, caption, lazy) {  // didn't work, CSS is off
    let figure = document.createElement("figure");
    this.prepareSlide(figure, false);
    let image = this.createImage(url, lazy, true);
    let figcaption = document.createElement("figcaption");
    figcaption.innerText = caption;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    return figure;
  }

  /**
   * Create a video from a url
   * @param {string} url
   * @param {string} title
   * @param {string} type    used for source.type, e.g. "mp4"
   * @param {boolean} [lazy]
   * @returns <video>
   */
  createVideo(url, title, type, lazy) {
    let video = document.createElement("video");
    this.prepareSlide(video, title, lazy);
    video.controls = true;
    let source = document.createElement("source");
    source.type = `video/${type}`;
    source.src = url;

    video.appendChild(source);
    return video;
  }


  newButton(svg, title) {
    let button = new Image();
    button.src = svg;
    button.className = `svlider-arrow svlider-arrow-${title}`;
    button.title = title;
    return button;
  }


  updateButtonVisibility() {
    let visible = this.items.length > 1;
    setVisibility(this.prev, visible);
    setVisibility(this.next, visible);
  }

  // common setup for images and videos
  prepareSlide(slide, title, lazy) {
    slide.classList.add(...this.opts.slideClasses);
    if (lazy)
      slide.loading = "lazy";
    if (title)
      slide.title = title;
    // do something with options???
    return slide;
  }

}

function findElement(selector) {
  return isString(selector) ? document.querySelector(selector) : selector;
}

function isString(s) { return (typeof s === 'string'); }

function setVisibility(el, isVisible) {
  if (el)
    el.style.display = isVisible ? 'flex' : 'none';
}
