import { createVNode as _createVNode, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, createElementBlock as _createElementBlock, Fragment, toDisplayString, normalizeProps, withCtx, createSlots } from 'vue';
import { PatchFlags, SlotFlags } from './tsutils';
import { omit } from 'lodash-es';
import type { Component, VNodeProps, VNodeChild } from 'vue';
import type { IntrinsicElementAttributes, ElementClassSet, ElementStyleSet, SpecificVNode } from './tsutils';

type ComponentProps<T extends object> = (T & Record<string, unknown> & VNodeProps & Partial<{ class: ElementClassSet; style: ElementStyleSet }>) | null;
type ElementProps<T extends keyof IntrinsicElementAttributes> = (IntrinsicElementAttributes[T] & Record<string, unknown> & VNodeProps) | null;
type ComponentChildren<S extends string> = SlotChildren<S> | ArrayChildren;
type SlotChildren<S extends string> = { [K in S & '_']: K extends '_' ? typeof SlotFlags : () => VNodeChild };
type ArrayChildren = unknown[];

/**
 * 创建组件VNode
 * @param type 自定义组件
 * @param props 组件Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @returns VNode
 */
export function createComponentVNode<T extends object, S extends string = 'default'>(type: Component, props?: ComponentProps<T>, children?: ComponentChildren<S>, patchFlag?: PatchFlags, dynamicProps?: (keyof T)[] | null) {
    let normalizeChildren: ComponentChildren<S> = [];
    if (Array.isArray(children)) {
        normalizeChildren = children;
    } else if (children) {
        normalizeChildren = {} as SlotChildren<string>;
        Object.entries(children as SlotChildren<string>).forEach(([key, child]) => {
            if (key === '_') {
                (normalizeChildren as SlotChildren<string>)[key] = child as SlotFlags;
            } else {
                (normalizeChildren as SlotChildren<string>)[key] = withCtx(child as Function) as () => VNodeChild;
            }
        });
    }

    return _createVNode(type, props, normalizeChildren, patchFlag, dynamicProps as string[]) as SpecificVNode<T>;
}

/**
 * 创建内置Dom元素VNode
 * @param type 元素类型
 * @param props 内置Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @returns VNode
 */
export function createElementVNode<T extends keyof IntrinsicElementAttributes>(type: T, props?: ElementProps<T>, children?: unknown, patchFlag?: PatchFlags, dynamicProps?: string[] | null) {
    return _createElementVNode(type, normalizeProps(props as Record<string, unknown>), children, patchFlag, dynamicProps);
}

/**
 * 创建文本VNode
 */
export function createTextVNode(source: string | object | unknown[], patch?: boolean) {
    return patch ? _createTextVNode(toDisplayString(source), PatchFlags.TEXT) : _createTextVNode(toDisplayString(source));
}

/**
 * 创建Fragment
 * @param children Array
 * @param patchFlag 64 | 128 | 256
 * @returns Fragment VNode
 * @example
 * ```html
 * <div v-for="item in data">{{ item.id }}</div>
 * ```
 *
 * ```ts
 * createFragment(
 *     renderList(data, item => createElementVNode('div', null, item.id, PatchFlags.TEXT)),
 *     PatchFlags.UNKEYED_FRAGMENT
 * )
 * ```
 */
export function createFragment(children?: unknown[], patchFlag?: PatchFlags.STABLE_FRAGMENT | PatchFlags.KEYED_FRAGMENT | PatchFlags.UNKEYED_FRAGMENT) {
    return _createElementBlock(Fragment, null, children, patchFlag);
}
