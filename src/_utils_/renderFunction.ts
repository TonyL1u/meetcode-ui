import {
    createVNode as _createVNode,
    createElementVNode as _createElementVNode,
    createTextVNode as _createTextVNode,
    createElementBlock as _createElementBlock,
    createCommentVNode as _createCommentVNode,
    Fragment,
    toDisplayString,
    normalizeProps,
    withCtx,
    renderList,
    withDirectives,
    vShow
} from 'vue';
import { PatchFlags, SlotFlags } from './tsutils';
import type { Component, VNodeProps, VNode, VNodeChild } from 'vue';
import type { IntrinsicElementAttributes, ElementClassSet, ElementStyleSet, SpecificVNode, Merge } from './tsutils';

type ComponentProps<T extends object> = (T & Record<string, unknown> & VNodeProps & Partial<{ class: ElementClassSet; style: ElementStyleSet }>) | null;
type ElementProps<T extends keyof IntrinsicElementAttributes> = (IntrinsicElementAttributes[T] & Record<string, unknown> & VNodeProps) | null;
type ComponentChildren<S extends string> = SlotChildren<S> | ArrayChildren;
type SlotChildren<S extends string> = Partial<Merge<Record<S, Function | VNodeChild>, { _: SlotFlags }>>;
type ArrayChildren = unknown[];
type DirectivesType = 'v-if' | 'v-show' | 'v-for';
interface DirectivesConfig {
    condition: boolean;
    trueStatement: VNodeChild;
    falseStatement?: VNodeChild;
    commentText?: string;
}

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
    if (children && !Array.isArray(children)) {
        Object.entries(children as SlotChildren<string>).forEach(([key, child]) => {
            if (key !== '_') {
                // ！！！设置 SlotFlags 之后必须使用 withCtx
                (children as SlotChildren<string>)[key] = typeof child === 'object' ? withCtx(() => [child as VNodeChild]) : children._ ? withCtx(() => [(child as Function)()]) : child;
            }
        });
    }

    return _createVNode(type, props, children, patchFlag, dynamicProps as string[]) as SpecificVNode<T>;
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
export function createTextVNode(source: string | object | unknown, patch?: boolean) {
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

/**
 * 通过 `v-for` `v-if` `v-show` 指令创建VNode
 * @param type
 * @param config
 */
export function createDirectives(type: 'v-if' | 'v-show', config: DirectivesConfig): VNodeChild;
export function createDirectives<S extends unknown>(type: 'v-for', source: S[], cb: (value: S, index: number) => VNodeChild, keyed?: boolean): VNodeChild;
export function createDirectives<S extends unknown>(type: DirectivesType, maybeSource: S[] | DirectivesConfig, cb?: (value: S, index: number) => VNodeChild, keyed: boolean = false): VNodeChild {
    if (type === 'v-for' && cb) {
        return createFragment(renderList(maybeSource as S[], cb), keyed ? PatchFlags.KEYED_FRAGMENT : PatchFlags.UNKEYED_FRAGMENT);
    } else if (type === 'v-if') {
        const { condition, trueStatement, falseStatement, commentText = 'v-if' } = maybeSource as DirectivesConfig;
        return condition ? trueStatement : falseStatement ?? _createCommentVNode(commentText, true);
    } else if (type === 'v-show') {
        const { condition, trueStatement } = maybeSource as DirectivesConfig;
        return withDirectives(trueStatement as VNode, [[vShow, condition]]);
    }
}
