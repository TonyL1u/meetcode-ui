import type { VNode, RendererNode, RendererElement, CSSProperties } from 'vue';
import * as CSS from 'csstype';

/**
 * Ts Utils
 */
export type UnionPick<T extends string | number | symbol, K extends T> = keyof Pick<Record<T, unknown>, K>;

export type UnionOmit<T extends string | number | symbol, K extends T> = keyof Omit<Record<T, unknown>, K>;

export type Key = string | number | symbol;

export type TypeOf<T, U> = T extends U ? true : false;

export type IsNumber<T> = TypeOf<T, number>;

export type IsString<T> = TypeOf<T, string>;

export type IsBoolean<T> = TypeOf<T, boolean>;

export type IsArray<T> = TypeOf<T, Array<unknown>>;

export type IsSymbol<T> = TypeOf<T, Symbol>;

export type IsNull<T> = TypeOf<T, null>;

export type IsUndefined<T> = TypeOf<T, undefined>;

export type IsObject<T> = TypeOf<T, object>;

export type CreateArray<L, E, A extends E[] = []> = A['length'] extends L ? A : CreateArray<L, E, [...A, E]>;

export type Add<X extends number, Y extends number> = [...CreateArray<X, 1>, ...CreateArray<Y, 1>]['length'];

/**
 * VNode Utils
 */
export type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

export declare const enum PatchFlags {
    /**
     * Indicates an element with dynamic textContent (children fast path)
     */
    TEXT = 1,
    /**
     * Indicates an element with dynamic class binding.
     */
    CLASS = 2,
    /**
     * Indicates an element with dynamic style
     * The compiler pre-compiles static string styles into static objects
     * + detects and hoists inline static objects
     * e.g. `style="color: red"` and `:style="{ color: 'red' }"` both get hoisted
     * as:
     * ```js
     * const style = { color: 'red' }
     * render() { return e('div', { style }) }
     * ```
     */
    STYLE = 4,
    /**
     * Indicates an element that has non-class/style dynamic props.
     * Can also be on a component that has any dynamic props (includes
     * class/style). when this flag is present, the vnode also has a dynamicProps
     * array that contains the keys of the props that may change so the runtime
     * can diff them faster (without having to worry about removed props)
     */
    PROPS = 8,
    /**
     * Indicates an element with props with dynamic keys. When keys change, a full
     * diff is always needed to remove the old key. This flag is mutually
     * exclusive with CLASS, STYLE and PROPS.
     */
    FULL_PROPS = 16,
    /**
     * Indicates an element with event listeners (which need to be attached
     * during hydration)
     */
    HYDRATE_EVENTS = 32,
    /**
     * Indicates a fragment whose children order doesn't change.
     */
    STABLE_FRAGMENT = 64,
    /**
     * Indicates a fragment with keyed or partially keyed children
     */
    KEYED_FRAGMENT = 128,
    /**
     * Indicates a fragment with unkeyed children.
     */
    UNKEYED_FRAGMENT = 256,
    /**
     * Indicates an element that only needs non-props patching, e.g. ref or
     * directives (onVnodeXXX hooks). since every patched vnode checks for refs
     * and onVnodeXXX hooks, it simply marks the vnode so that a parent block
     * will track it.
     */
    NEED_PATCH = 512,
    /**
     * Indicates a component with dynamic slots (e.g. slot that references a v-for
     * iterated value, or dynamic slot names).
     * Components with this flag are always force updated.
     */
    DYNAMIC_SLOTS = 1024,
    /**
     * Indicates a fragment that was created only because the user has placed
     * comments at the root level of a template. This is a dev-only flag since
     * comments are stripped in production.
     */
    DEV_ROOT_FRAGMENT = 2048,
    /**
     * SPECIAL FLAGS -------------------------------------------------------------
     * Special flags are negative integers. They are never matched against using
     * bitwise operators (bitwise matching should only happen in branches where
     * patchFlag > 0), and are mutually exclusive. When checking for a special
     * flag, simply check patchFlag === FLAG.
     */
    /**
     * Indicates a hoisted static vnode. This is a hint for hydration to skip
     * the entire sub tree since static content never needs to be updated.
     */
    HOISTED = -1,
    /**
     * A special flag that indicates that the diffing algorithm should bail out
     * of optimized mode. For example, on block fragments created by renderSlot()
     * when encountering non-compiler generated slots (i.e. manually written
     * render functions, which should always be fully diffed)
     * OR manually cloneVNodes
     */
    BAIL = -2
}

/**
 * UI Utils
 */
export type UIStatus = 'default' | 'hover' | 'active' | 'disabled';

export type UISize = 'mini' | 'small' | 'medium' | 'large';

export interface UIColorAttrs extends Record<string, string> {
    color: string;
    borderColor: string;
    backgroundColor: string;
}

export type ElementClassSet = string | Record<string, boolean> | (string | Record<string, boolean>)[];
export type ElementStyleSet = CSSProperties | string;

/**
 * Jest Utils
 */
export type JestComputedStyle = CSSStyleDeclaration & Array<keyof (CSSStyleDeclaration & CSS.Properties)> & { _values: CSS.Properties; _importants: CSS.Properties };
