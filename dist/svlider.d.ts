export class SvliderJS {
    constructor(elOrSelector: any, options?: {}, mixins?: {});
    opts: {
        startIndex: number;
        lazyThreshold: number;
        slideClasses: string[];
        buttonSVGs: {
            prev: string;
            next: string;
        };
        videoExtensions: string[];
    };
    el: any;
    items: any[];
    index: number;
    k: any;
    /**
     * Adds HTML elements
     * @param {Array<{HTMLElement}>} slides  to be added
     * @param {Array<{string}>} [classlist]  add these classes to the slides
     * @returns this
     */
    addSlides(slides: Array<{
        HTMLElement;
    }>, classlist?: Array<{
        string;
    }>): this;
    /**
     * Adds URLs
     * @param {Array<{string}>} urls  to be added
     * @returns this
     */
    addImageURLs(urls: Array<{
        string;
    }>): this;
    /**
     * Add previous and next buttons.
     * User can provide custom buttons, otherwise, uses thie.newButton()
     * @param {HTMLElement} [customNext]
     * @param {HTMLElement} [customPrev]
     * @returns this
     */
    addButtons(customNext?: HTMLElement, customPrev?: HTMLElement): this;
    next: HTMLElement | (new (width?: number, height?: number) => HTMLImageElement);
    prev: HTMLElement | (new (width?: number, height?: number) => HTMLImageElement);
    /**
     * Move to this slide.  Uses modulo to constrain range.
     * Refresh only if index changes or forceRefresh
     * @param {integer} newIndex
     * @param {boolean} [forceRefresh]
     */
    setIndex(newIndex: integer, forceRefresh?: boolean): void;
    /**
     * Change Index.  Usually number = +1 or -1
     * @param {number} delta
     * @param {boolean} [forceRefresh]
     */
    step(delta: number, forceRefresh?: boolean): void;
    /**
     * Create an image or video from a url
     * @param {string} url, string or a {}, see code
     * @param {boolean} lazy
     * @returns {(HTMLImageElement|HTMLVideoElement)}
     */
    createSlide(url: string, lazy: boolean): (HTMLImageElement | HTMLVideoElement);
    /**
     * Create an Image (<img>) from a url
     * @param {string} url
     * @param {string} [title]
     * @param {boolean} [lazy]
     * @param {boolean} [dontPrepare]
     * @returns {Image}
     */
    createImage(url: string, title?: string, lazy?: boolean, dontPrepare?: boolean): new (width?: number, height?: number) => HTMLImageElement;
    /**
     * Create a video from a url
     * @param {string} url
     * @param {string} title
     * @param {string} type    used for source.type, e.g. "mp4"
     * @param {boolean} [lazy]
     * @returns <video>
     */
    createVideo(url: string, title: string, type: string, lazy?: boolean): HTMLVideoElement;
    /**
     * Create a control button
     * @param {*} svg
     * @param {*} title (usually "prev" or "next")
     * @returns {Image}
     */
    newButton(svg: any, title: any): new (width?: number, height?: number) => HTMLImageElement;
    updateButtonVisibility(): void;
    prepareSlide(slide: any, title: any, lazy: any): any;
}
