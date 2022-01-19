import { VNode, RendererNode, RendererElement } from 'vue';

/**
 * Ts Bridge
 */
export type Pick<T, K extends keyof T> = {
    [key in K]: T[key];
};

export type Readonly<T> = {
    readonly [key in keyof T]: T[key];
};

export type UnionPick<T extends string | number | symbol, K extends T> = keyof Pick<Record<T, unknown>, K>;

export type UnionOmit<T extends string | number | symbol, K extends T> = keyof Omit<Record<T, unknown>, K>;

export type Key = string | number | symbol;

/**
 * VNode Util
 */
export type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

/**
 * UI
 */
export type UIStatus = 'default' | 'hover' | 'active' | 'disabled';

export type UISize = 'mini' | 'small' | 'medium' | 'large';

export interface UIColorAttrs extends Record<string, string> {
    color: string;
    borderColor: string;
    backgroundColor: string;
}
