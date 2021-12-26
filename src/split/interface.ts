import { Ref, InjectionKey } from 'vue';
import { UseEventBusReturn } from '@vueuse/core';
import * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--split-pane-initial-width'?: string;
    }
}

export interface SplitInjection {
    parentWidth: Ref<number>;
    BusResize: UseEventBusReturn<number>;
}
export const splitInjectionKey: InjectionKey<SplitInjection> = Symbol();
export const SplitIKey = Symbol('Split');
export const SplitPaneIKey = Symbol('SplitPane');

export interface SplitProps {}
export interface SplitPaneProps {}
export interface SplitterProps {}
