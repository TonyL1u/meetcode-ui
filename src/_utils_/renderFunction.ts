import {
    createVNode as _createVNode,
    createElementVNode as _createElementVNode,
    createTextVNode as _createTextVNode,
    createElementBlock as _createElementBlock,
    createCommentVNode as _createCommentVNode,
    renderSlot as _renderSlot,
    Fragment,
    toDisplayString,
    normalizeProps,
    withCtx,
    renderList,
    withDirectives,
    vShow
} from 'vue';
import { PatchFlags, SlotFlags } from './tsutils';
import { kebabToCamel } from './kebabCaseEscape';
import type { Component, VNodeProps, VNode, VNodeChild, VNodeArrayChildren, HTMLAttributes, Slots } from 'vue';
import type { IntrinsicElementAttributes, ElementClassSet, ElementStyleSet, SpecificVNode, Merge } from './tsutils';

type ComponentProps<T extends object> = (T & Record<string, unknown> & VNodeProps & Partial<{ class: ElementClassSet; style: ElementStyleSet }>) | null;
type ElementProps<T extends keyof IntrinsicElementAttributes> = (IntrinsicElementAttributes[T] & Record<string, unknown> & VNodeProps) | null;
type ComponentChildren<S extends string> = SlotChildren<S> | ArrayChildren | null;
type SlotChildren<S extends string> = Partial<Merge<Record<S, () => VNodeChild>, { _: SlotFlags }>>;
type ArrayChildren = unknown[];
type DirectivesType = 'v-if' | 'v-show' | 'v-for';
interface DirectivesConfig {
    condition?: boolean;
    node: VNodeChild | (() => VNodeChild);
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
export function createComponentVNode<T extends object, S extends string = 'default'>(type: Component, props?: ComponentProps<T>, children?: ComponentChildren<S>, patchFlag?: PatchFlags, dynamicProps?: (keyof (T & HTMLAttributes & VNodeProps))[] | null) {
    if (children && !Array.isArray(children)) {
        Object.entries(children as SlotChildren<string>).forEach(([key, child]) => {
            if (key !== '_' && child) {
                // ！！！强制使用 withCtx
                (children as SlotChildren<string>)[key] = withCtx(() => (Array.isArray(child()) ? child() : [child()])) as () => VNodeChild;
            }
        });

        if (!children._) {
            children._ = SlotFlags.STABLE;
        }
    }

    return _createVNode(type, normalizeProps(props as Record<string, unknown>), children, patchFlag, dynamicProps as string[]) as SpecificVNode<T>;
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
export function createElementVNode<T extends keyof IntrinsicElementAttributes>(type: T, props?: ElementProps<T>, children?: unknown, patchFlag?: PatchFlags, dynamicProps?: (keyof (IntrinsicElementAttributes[T] & VNodeProps))[] | null) {
    return _createElementVNode(type, normalizeProps(props as Record<string, unknown>), Array.isArray(children) ? children : typeof children === 'string' ? toDisplayString(children) : [children], patchFlag, dynamicProps as string[]);
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

export function renderSlot(slots: Slots, name: string, props?: Record<string, unknown>, fallback?: () => VNodeArrayChildren, noSlotted?: boolean) {
    const camelKey = kebabToCamel(name);
    return _renderSlot(slots, slots[camelKey] ? camelKey : name, props, fallback, noSlotted);
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
        const { condition, node, commentText = 'v-if' } = maybeSource as DirectivesConfig;
        return !!condition ? (typeof node === 'function' ? node() : node) : _createCommentVNode(commentText, true);
    } else if (type === 'v-show') {
        const { condition, node } = maybeSource as DirectivesConfig;
        return withDirectives(node as VNode, [[vShow, condition]]);
    }
}
