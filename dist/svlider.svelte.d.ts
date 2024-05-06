/** @typedef {typeof __propDef.props}  SvliderProps */
/** @typedef {typeof __propDef.events}  SvliderEvents */
/** @typedef {typeof __propDef.slots}  SvliderSlots */
export default class Svlider extends SvelteComponent<{
    selector?: string;
    slides?: any[];
    urls?: any[];
    options?: {};
    mixin?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SvliderProps = typeof __propDef.props;
export type SvliderEvents = typeof __propDef.events;
export type SvliderSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        selector?: string;
        slides?: any[];
        urls?: any[];
        options?: {};
        mixin?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
