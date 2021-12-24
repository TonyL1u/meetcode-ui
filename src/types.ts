import '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface VNodeCustomProperties {
        iKey?: Symbol;
    }

    export type CustomVNodeTypes = VNodeTypes & VNodeCustomProperties;
}
