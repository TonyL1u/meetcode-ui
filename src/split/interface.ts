import { Ref, InjectionKey } from 'vue';
import { UseEventBusReturn } from '@vueuse/core';

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
