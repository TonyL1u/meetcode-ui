import '@vue/runtime-core';
import { ComputedRef } from 'vue';

declare module '@vue/runtime-core' {
    interface VNodeCustomProperties {
        iKey?: Symbol;
    }

    export type CustomVNodeTypes = VNodeTypes & VNodeCustomProperties;
    export type MaybeComputedRef<T> = ComputedRef<T> | T;
    export interface VueDefaultExposeInstance {
        $el: HTMLElement;
    }
}
