const DEFAULTS = {
  startIndex: 0,
  lazyThreshold: 6,
  slideClasses: ['svlide'],
  svliderClasses: ['svlider'],
  buttonText: { prev: "\u2039", next : "\u00a0\u203a"},
  videoExtensions: [".mp4"]
};


export class SvliderJS {

  constructor(elOrSelector, options, mixin) {
    this.opts = Object.assign({}, DEFAULTS, options);
    this.el = findElement(elOrSelector);
    this.el.classList.add(...this.opts.svliderClasses);

    this.items = [];
    this.index = this.opts.startIndex;

    this.el._svlider = this;
    Object.assign(this, mixin);
  }


  addSlides(slides, classlist = this.opts.slideClasses) {
    slides.forEach((slide) => {
      if (classlist.length)
        slide.classList.add(...classlist);
      this.el.appendChild(slide);
    });

    this.items.push(...slides);
    this.updateButtonVisibility();
    this.step(0, true); // update slide visibility
    return this;
  }


  addImageURLs(urls) {
    let slides = urls.map((url, idx) =>
      this.createSlide(url, idx > this.opts.lazyThreshold)
    );
    this.addSlides(slides, []);  // classList was already added
    return this;
  }


  addButtons(custom = {}) {
    let { next, prev } = custom;

    next = next || this.newButton("next");
    prev = prev || this.newButton("prev");

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


  newButton(prevOrNext) {
    let button = document.createElement('button');
    button.textContent = this.opts.buttonText[prevOrNext];
    button.className = `svlider-arrow svlider-arrow-${prevOrNext}`;
    button.title = prevOrNext;
    return button;
  }


  updateButtonVisibility() {
    let visible = this.items.length > 1;
    setVisibility(this.prev, visible);
    setVisibility(this.next, visible);
  }


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


  step(delta, forceRefresh) {
    this.setIndex(this.index + delta, forceRefresh);
  }


  createSlide(url, lazy) {
    let videoExt = this.opts.videoExtensions.find((x) => url.endsWith(x));
    let slide = (videoExt) ?
      this.createVideo(url, videoExt.substring(1), lazy) :
      this.createImage(url, lazy);

    return slide;
  }

  createImage(url, lazy) {
    let image = new Image();
    this.prepareSlide(image, lazy);
    image.src = url;
    return image;
  }

  createVideo(url, type, lazy) {
    let video = document.createElement("video");
    this.prepareSlide(video, lazy);
    video.controls = true;
    let source = document.createElement("source");
    source.type = `video/${type}`;
    source.src = url;

    video.appendChild(source);
    return video;
  }

  prepareSlide(slide, lazy) {
    slide.classList.add(...this.opts.slideClasses);
    if (lazy)
      slide.loading = "lazy";
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
