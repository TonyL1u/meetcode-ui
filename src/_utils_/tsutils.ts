import { VNode, RendererNode, RendererElement, Slots } from 'vue';

export type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

export type Pick<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type Readonly<T> = {
    readonly [key in keyof T]: T[key];
};
