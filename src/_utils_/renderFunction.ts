import {
    createVNode as _createVNode,
    createBlock as _createBlock,
    createElementVNode as _createElementVNode,
    createTextVNode as _createTextVNode,
    createElementBlock as _createElementBlock,
    createCommentVNode as _createCommentVNode,
    openBlock as _openBlock,
    renderSlot as _renderSlot,
    Fragment,
    toDisplayString,
    normalizeProps,
    withCtx,
    renderList,
    withDirectives,
    createSlots,
    vShow
} from 'vue';
import { createKey } from './createKey';
import { PatchFlags, SlotFlags } from './tsutils';
import { kebabToCamel } from './kebabCaseEscape';
import { McBaseTransition } from '../_transition_';
import type { Component, RenderFunction, VNodeProps, VNode, VNodeChild, VNodeArrayChildren, HTMLAttributes, Slot, Slots, CSSProperties } from 'vue';
import type { IntrinsicElementAttributes, ElementClassSet, ElementStyleSet, SpecificVNode, Merge } from './tsutils';

type ComponentProps<T extends object> = (T & Record<string, unknown> & VNodeProps & Partial<{ class: ElementClassSet; style: ElementStyleSet }>) | null;
type ElementProps<T extends keyof IntrinsicElementAttributes> = (IntrinsicElementAttributes[T] & Record<string, unknown> & VNodeProps) | null;
type ComponentChildren<S extends string> = SlotChildren<S> | ArrayChildren | null;
type SlotChildren<S extends string> = Partial<Merge<Record<S, RenderFunction>, { _: SlotFlags }>>;
type ArrayChildren = unknown[];
type DirectivesType = 'v-if' | 'v-show' | 'v-for';
interface DirectivesConfig {
    condition?: boolean;
    node: VNodeChild | RenderFunction;
    commentText?: string;
}
interface DynamicSlotDescriptor {
    name: string;
    fn: RenderFunction;
}

function useWithCtx(child: RenderFunction) {
    return withCtx(() => (Array.isArray(child()) ? child() : [child()])) as RenderFunction;
}

function ctxlizeChildren<S extends string>(children: SlotChildren<string>) {
    Object.entries(children).forEach(([key, child]) => {
        if (key !== '_' && child) {
            // ！！！强制使用 withCtx
            children[key] = useWithCtx(child);
        }
    });
}

/**
 * 创建组件VNode
 * @param type 自定义组件
 * @param props 组件Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @param useBlock 使用createBlock
 * @returns VNode
 */
export function createComponentVNode<T extends object, S extends string = 'default'>(
    type: Component,
    props?: ComponentProps<T>,
    children?: ComponentChildren<S>,
    patchFlag?: PatchFlags,
    dynamicProps?: (keyof (T & HTMLAttributes & VNodeProps))[] | null,
    useBlock: boolean = false
) {
    if (children) {
        if (Array.isArray(children)) {
            const [staticSlots, maybeDynamicSlots] = children as [SlotChildren<S>, object | ArrayChildren];
            // ctx化
            ctxlizeChildren(staticSlots);

            // 动态插槽
            if (Array.isArray(maybeDynamicSlots)) {
                const slotDescriptor = (maybeDynamicSlots as DynamicSlotDescriptor[]).filter(Boolean).map(({ name, fn }, index) => {
                    return { name, fn: useWithCtx(fn) as Slot, index };
                });
                children = createSlots(staticSlots as Record<string, Slot>, slotDescriptor) as SlotChildren<S>;
                children._ = SlotFlags.DYNAMIC;
            }
        } else {
            ctxlizeChildren(children);

            if (!children._) {
                children._ = SlotFlags.STABLE;
            }
        }
    }

    if (useBlock) {
        return _openBlock(), _createBlock(type, normalizeProps(props as Record<string, unknown>), children, patchFlag, dynamicProps as string[]) as SpecificVNode<T>;
    }
    return _createVNode(type, normalizeProps(props as Record<string, unknown>), children, patchFlag, dynamicProps as string[], useBlock) as SpecificVNode<T>;
}

export function createComponentBlockVNode<T extends object, S extends string = 'default'>(
    type: Component,
    props?: ComponentProps<T>,
    children?: ComponentChildren<S>,
    patchFlag?: PatchFlags,
    dynamicProps?: (keyof (T & HTMLAttributes & VNodeProps))[] | null
) {
    return createComponentVNode(type, props, children, patchFlag, dynamicProps, true);
}

/**
 * 创建内置Dom元素VNode
 * @param type 元素类型
 * @param props 内置Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @param useBlock 使用createElementBlock
 * @returns VNode
 */
export function createElementVNode<T extends keyof IntrinsicElementAttributes>(
    type: T,
    props?: ElementProps<T>,
    children?: unknown,
    patchFlag?: PatchFlags,
    dynamicProps?: (keyof (IntrinsicElementAttributes[T] & VNodeProps))[] | null,
    useBlock: boolean = false
) {
    if (useBlock) {
        return _openBlock(), _createElementBlock(type, normalizeProps(props as Record<string, unknown>), Array.isArray(children) ? children : typeof children === 'string' ? toDisplayString(children) : [children], patchFlag, dynamicProps as string[]);
    }
    return _createElementVNode(type, normalizeProps(props as Record<string, unknown>), Array.isArray(children) ? children : typeof children === 'string' ? toDisplayString(children) : [children], patchFlag, dynamicProps as string[]);
}

export function createElementBlockVNode<T extends keyof IntrinsicElementAttributes>(type: T, props?: ElementProps<T>, children?: unknown, patchFlag?: PatchFlags, dynamicProps?: (keyof (IntrinsicElementAttributes[T] & VNodeProps))[] | null) {
    return createElementVNode(type, props, children, patchFlag, dynamicProps, true);
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
    return _openBlock(true), _createElementBlock(Fragment, null, children, patchFlag);
}

/**
 * 创建基础过渡效果
 * @param name
 * @param effect
 * @param slots
 * @returns
 */
export function createTransition(name: string, effect: CSSProperties, slots: SlotChildren<'default'>) {
    return createComponentVNode(
        McBaseTransition,
        {
            name,
            enterFrom: effect,
            leaveTo: effect
        },
        slots
    );
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
